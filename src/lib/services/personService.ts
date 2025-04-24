import type { supabaseClient } from '../../db/supabase.client';
import type { CreatePersonCommand, PersonDto } from '../../types';

export async function createPerson(
  supabase: typeof supabaseClient,
  userId: string,
  personData: CreatePersonCommand
): Promise<PersonDto> {
  const { data, error } = await supabase
    .from('persons')
    .insert([
      {
        ...personData,
        user_id: userId
      }
    ])
    .select('id, name, created_at, updated_at')
    .single();

  if (error) {
    throw new Error(`Failed to create person: ${error.message}`);
  }

  if (!data) {
    throw new Error('No data returned after creating person');
  }

  return {
    ...data,
    description: personData.description ?? ''
  } as PersonDto;
} 