import { z } from 'zod';
import type { APIRoute } from 'astro';
import type { supabaseClient } from '../../../../../db/supabase.client';
import { assignPresentToPerson, NotFoundError, ConflictError } from '../../../../../lib/services/personPresentService';

export const prerender = false;

// Schema validation for present assignment
const assignPresentSchema = z.object({
  personId: z.number().positive('Person ID must be positive'),
  presentId: z.number().positive('Present ID must be positive')
});

// TODO: Remove this after development
const DEV_USER_ID = '2e26a498-b5f9-48af-b79c-95e193c3b453';

export const POST: APIRoute = async ({ request, params, locals }) => {
  try {
    // Step 1: Get supabase client from locals
    const supabase = locals.supabase as typeof supabaseClient;
    const userId = DEV_USER_ID;

    // Step 2: Parse and validate input
    const requestData = await request.json();
    const validationResult = assignPresentSchema.safeParse({
      personId: parseInt(params.personId as string, 10),
      presentId: requestData.presentId
    });

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          message: 'Invalid input data',
          errors: validationResult.error.format()
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { personId, presentId } = validationResult.data;

    // Step 3: Call service to assign present
    await assignPresentToPerson(supabase, userId, personId, presentId);

    // Step 4: Return success response
    return new Response(null, { status: 201 });

  } catch (error) {
    console.error('Error assigning present:', error);

    if (error instanceof NotFoundError) {
      return new Response(
        JSON.stringify({ message: error.message }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (error instanceof ConflictError) {
      return new Response(
        JSON.stringify({ message: error.message }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}; 