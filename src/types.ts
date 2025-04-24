// DTO and Command Model definitions for Prezentex API

// -----------------------
// Persons
// -----------------------
// PersonDto represents the data structure returned by GET /persons and GET /persons/{id} endpoints.
export interface PersonDto {
  id: number;
  name: string;
  description: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

// CreatePersonCommand is used with POST /persons to create a new person.
export type CreatePersonCommand = {
  name: string;
  description?: string;
};

// UpdatePersonCommand is used with PUT /persons/{id} to update an existing person. It is equivalent to the create command.
export type UpdatePersonCommand = CreatePersonCommand;

// -----------------------
// Presents
// -----------------------
// PresentDto represents the data structure returned by GET /presents and GET /presents/{id} endpoints.
export interface PresentDto {
  id: number;
  name: string;
  price: number;
  link: string;
  description: string;
  tag: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

// CreatePresentCommand is used with POST /presents to create a new present. The person_id is optional for immediate assignment.
export interface CreatePresentCommand extends Pick<PresentDto, 'name' | 'price' | 'link' | 'description' | 'tag'> {
  person_id?: number;
}

// UpdatePresentCommand is used with PUT /presents/{id} to update an existing present.
export type UpdatePresentCommand = Pick<PresentDto, 'name' | 'price' | 'link' | 'description' | 'tag'>;

// -----------------------
// Person-Present Assignment
// -----------------------
// AssignPresentCommand is used with POST /persons/{personId}/presents/{presentId} to assign a present to a person.
export interface AssignPresentCommand {
  personId: number;
  presentId: number;
} 