import { z } from 'zod';
import type { APIRoute } from 'astro';
import type { supabaseClient } from '../../../db/supabase.client';
import type { CreatePersonCommand } from '../../../types';
import { createPerson } from '../../../lib/services/personService';

export const prerender = false;

// Schema validation for person creation
const createPersonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

// TODO: Remove this after development
const DEV_USER_ID = '2e26a498-b5f9-48af-b79c-95e193c3b453';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Step 1: Get supabase client from locals
    const supabase = locals.supabase as typeof supabaseClient;
    
    // Step 2: Use development user ID
    // TODO: Remove development bypass and restore original auth check
    const userId = DEV_USER_ID;
    
    // Step 3: Validate input data
    const requestData = await request.json();
    const validationResult = createPersonSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          message: 'Invalid input data', 
          errors: validationResult.error.format() 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const personData: CreatePersonCommand = validationResult.data;
    
    // Step 4: Create the person using the service
    const person = await createPerson(
      supabase,
      userId,
      personData
    );
    
    // Step 5: Return the created person with 201 status
    return new Response(
      JSON.stringify(person),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error creating person:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 