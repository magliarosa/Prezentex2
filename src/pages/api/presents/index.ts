import { z } from 'zod';
import type { APIRoute } from 'astro';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../../db/database.types';
import type { CreatePresentCommand } from '../../../types';
import { createPresent } from '../../../lib/services/presentService';

export const prerender = false;

// Schema validation for present creation
const createPresentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  link: z.string(),
  description: z.string(),
  tag: z.string(),
  person_id: z.number().optional()
});

// TODO: Remove this after development
const DEV_USER_ID = '2e26a498-b5f9-48af-b79c-95e193c3b453';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Step 1: Get supabase client from locals
    const supabase = locals.supabase as SupabaseClient<Database>;
    
    // Step 2: Check if user is authenticated
    // TODO: Remove development bypass and restore original auth check
    let userId = DEV_USER_ID;
    if (import.meta.env.PROD) {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        return new Response(
          JSON.stringify({ message: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      userId = user.id;
    }
    
    // Step 3: Validate input data
    const requestData = await request.json();
    const validationResult = createPresentSchema.safeParse(requestData);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          message: 'Invalid input data', 
          errors: validationResult.error.format() 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const presentData: CreatePresentCommand = validationResult.data;
    const { person_id, ...presentFields } = presentData;
    
    // Step 4: If person_id is provided, check if person exists and belongs to the user
    if (person_id !== undefined) {
      const { data: personData, error: personError } = await supabase
        .from('persons')
        .select('id')
        .eq('id', person_id)
        .eq('user_id', userId)
        .single();
      
      if (personError || !personData) {
        return new Response(
          JSON.stringify({ message: 'Person not found or does not belong to the user' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // Step 5: Create the present using the service
    const present = await createPresent(
      supabase,
      userId,
      presentFields,
      person_id
    );
    
    // Step 6: Return the created present with 201 status
    return new Response(
      JSON.stringify(present),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error creating present:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 