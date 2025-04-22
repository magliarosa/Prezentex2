import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../db/database.types';
import type { CreatePresentCommand, PresentDto } from '../../types';

/**
 * Creates a new present in the database
 * @param supabase SupabaseClient instance
 * @param userId The ID of the authenticated user
 * @param presentData The present data to insert
 * @param personId Optional ID of the person to assign the present to
 * @returns The newly created present
 */
export async function createPresent(
  supabase: SupabaseClient<Database>,
  userId: string,
  presentData: Omit<CreatePresentCommand, 'person_id'>,
  personId?: number
): Promise<PresentDto> {
  // Start a transaction to ensure data consistency
  const { data, error } = await supabase
    .from('presents')
    .insert({
      ...presentData,
      user_id: userId
    })
    .select()
    .single();

  if (error) {
    console.error('Error inserting present:', error);
    throw new Error(`Failed to create present: ${error.message}`);
  }

  // If a person ID was provided, create the relationship
  if (personId !== undefined && data) {
    const { error: relationError } = await supabase
      .from('persons_presents')
      .insert({
        person_id: personId,
        present_id: data.id
      });

    if (relationError) {
      console.error('Error creating person-present relationship:', relationError);
      // Consider whether to roll back or just log the error
      throw new Error(`Failed to associate present with person: ${relationError.message}`);
    }
  }

  return data as PresentDto;
} 