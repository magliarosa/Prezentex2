import type { supabaseClient } from '../../db/supabase.client';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export async function assignPresentToPerson(
  supabase: typeof supabaseClient,
  userId: string,
  personId: number,
  presentId: number
): Promise<void> {
  // Step 1: Check if person exists and belongs to user
  const { data: person, error: personError } = await supabase
    .from('persons')
    .select('id')
    .eq('id', personId)
    .eq('user_id', userId)
    .single();

  if (personError || !person) {
    throw new NotFoundError('Person not found or does not belong to user');
  }

  // Step 2: Check if present exists and belongs to user
  const { data: present, error: presentError } = await supabase
    .from('presents')
    .select('id')
    .eq('id', presentId)
    .eq('user_id', userId)
    .single();

  if (presentError || !present) {
    throw new NotFoundError('Present not found or does not belong to user');
  }

  // Step 3: Check if assignment already exists
  const { data: existing } = await supabase
    .from('persons_presents')
    .select('person_id')
    .eq('person_id', personId)
    .eq('present_id', presentId)
    .single();

  if (existing) {
    throw new ConflictError('Present is already assigned to this person');
  }

  // Step 4: Create assignment
  const { error: insertError } = await supabase
    .from('persons_presents')
    .insert({
      person_id: personId,
      present_id: presentId
    });

  if (insertError) {
    throw new Error('Failed to assign present to person');
  }
} 