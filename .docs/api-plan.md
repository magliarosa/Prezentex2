# REST API Plan for Prezentex

## 1. Resources
- **Users** - Maps to `users` table (managed by Supabase Auth)
- **Persons** - Maps to `persons` table 
- **Presents** - Maps to `presents` table
- **Person-Present Assignments** - Maps to `persons_presents` junction table

## 2. Endpoints

### Authentication
Supabase Auth will handle authentication endpoints directly.

### Persons

#### GET /persons
- **Description**: Retrieve a list of all persons (recipients) for the authenticated user
- **Query Parameters**:
  - `limit` (optional): Number of results per page (default: 20)
  - `offset` (optional): Pagination offset
  - `sort` (optional): Field to sort by (e.g., `name`, `created_at`)
  - `order` (optional): Sort order (`asc` or `desc`, default: `asc`)
  - `search` (optional): Search term to filter results by name
- **Response Payload**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "description": "My brother",
        "created_at": "2023-06-15T10:30:00Z",
        "updated_at": "2023-06-15T10:30:00Z"
      }
    ],
    "count": 1,
    "total": 1
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 500 Internal Server Error

#### GET /persons/{id}
- **Description**: Retrieve a specific person by ID
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "description": "My brother",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T10:30:00Z"
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 404 Not Found, 500 Internal Server Error

#### POST /persons
- **Description**: Create a new person
- **Request Payload**:
  ```json
  {
    "name": "John Doe",
    "description": "My brother"
  }
  ```
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "description": "My brother",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T10:30:00Z"
  }
  ```
- **Success Codes**: 201 Created
- **Error Codes**: 400 Bad Request, 401 Unauthorized, 500 Internal Server Error

#### PUT /persons/{id}
- **Description**: Update an existing person
- **Request Payload**:
  ```json
  {
    "name": "John Doe",
    "description": "My younger brother"
  }
  ```
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "description": "My younger brother",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T11:15:00Z"
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error

#### DELETE /persons/{id}
- **Description**: Delete a person
- **Success Codes**: 204 No Content
- **Error Codes**: 401 Unauthorized, 404 Not Found, 500 Internal Server Error

### Presents

#### GET /presents
- **Description**: Retrieve a list of all presents for the authenticated user
- **Query Parameters**:
  - `limit` (optional): Number of results per page (default: 20)
  - `offset` (optional): Pagination offset
  - `sort` (optional): Field to sort by (e.g., `name`, `price`, `created_at`)
  - `order` (optional): Sort order (`asc` or `desc`, default: `asc`)
  - `search` (optional): Search term to filter results by name
  - `tag` (optional): Filter by tag
  - `min_price` (optional): Filter by minimum price
  - `max_price` (optional): Filter by maximum price
- **Response Payload**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Smart Watch",
        "price": 199.99,
        "link": "https://example.com/smart-watch",
        "description": "Latest model with health tracking",
        "tag": "electronics",
        "created_at": "2023-06-15T10:30:00Z",
        "updated_at": "2023-06-15T10:30:00Z"
      }
    ],
    "count": 1,
    "total": 1
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 500 Internal Server Error

#### GET /presents/{id}
- **Description**: Retrieve a specific present by ID
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "Smart Watch",
    "price": 199.99,
    "link": "https://example.com/smart-watch",
    "description": "Latest model with health tracking",
    "tag": "electronics",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T10:30:00Z"
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 404 Not Found, 500 Internal Server Error

#### POST /presents
- **Description**: Create a new present
- **Request Payload**:
  ```json
  {
    "name": "Smart Watch",
    "price": 199.99,
    "link": "https://example.com/smart-watch",
    "description": "Latest model with health tracking",
    "tag": "electronics",
    "person_id": 1  // Optional: immediately assign to a person
  }
  ```
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "Smart Watch",
    "price": 199.99,
    "link": "https://example.com/smart-watch",
    "description": "Latest model with health tracking",
    "tag": "electronics",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T10:30:00Z"
  }
  ```
- **Success Codes**: 201 Created
- **Error Codes**: 400 Bad Request, 401 Unauthorized, 404 Not Found (if person_id is invalid), 500 Internal Server Error

#### PUT /presents/{id}
- **Description**: Update an existing present
- **Request Payload**:
  ```json
  {
    "name": "Smart Watch",
    "price": 179.99,
    "link": "https://example.com/smart-watch-sale",
    "description": "Latest model with health tracking - on sale!",
    "tag": "electronics"
  }
  ```
- **Response Payload**:
  ```json
  {
    "id": 1,
    "name": "Smart Watch",
    "price": 179.99,
    "link": "https://example.com/smart-watch-sale",
    "description": "Latest model with health tracking - on sale!",
    "tag": "electronics",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T11:15:00Z"
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error

#### DELETE /presents/{id}
- **Description**: Delete a present
- **Success Codes**: 204 No Content
- **Error Codes**: 401 Unauthorized, 404 Not Found, 500 Internal Server Error

### Person-Present Assignments

#### GET /persons/{personId}/presents
- **Description**: Retrieve all presents assigned to a specific person
- **Query Parameters**:
  - `limit` (optional): Number of results per page (default: 20)
  - `offset` (optional): Pagination offset
  - `sort` (optional): Field to sort by (e.g., `name`, `price`, `created_at`)
  - `order` (optional): Sort order (`asc` or `desc`, default: `asc`)
- **Response Payload**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Smart Watch",
        "price": 199.99,
        "link": "https://example.com/smart-watch",
        "description": "Latest model with health tracking",
        "tag": "electronics",
        "created_at": "2023-06-15T10:30:00Z",
        "updated_at": "2023-06-15T10:30:00Z"
      }
    ],
    "count": 1,
    "total": 1
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 404 Not Found (if person doesn't exist), 500 Internal Server Error

#### GET /presents/{presentId}/persons
- **Description**: Retrieve all persons assigned to a specific present
- **Query Parameters**:
  - `limit` (optional): Number of results per page (default: 20)
  - `offset` (optional): Pagination offset
  - `sort` (optional): Field to sort by (e.g., `name`, `created_at`)
  - `order` (optional): Sort order (`asc` or `desc`, default: `asc`)
- **Response Payload**:
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "description": "My brother",
        "created_at": "2023-06-15T10:30:00Z",
        "updated_at": "2023-06-15T10:30:00Z"
      }
    ],
    "count": 1,
    "total": 1
  }
  ```
- **Success Codes**: 200 OK
- **Error Codes**: 401 Unauthorized, 404 Not Found (if present doesn't exist), 500 Internal Server Error

#### POST /persons/{personId}/presents/{presentId}
- **Description**: Assign a present to a person
- **Success Codes**: 201 Created
- **Error Codes**: 401 Unauthorized, 404 Not Found (if person or present doesn't exist), 409 Conflict (if assignment already exists), 500 Internal Server Error

#### DELETE /persons/{personId}/presents/{presentId}
- **Description**: Remove a present assignment from a person
- **Success Codes**: 204 No Content
- **Error Codes**: 401 Unauthorized, 404 Not Found (if person, present, or assignment doesn't exist), 500 Internal Server Error

## 3. Authentication and Authorization

### Authentication
- Authentication will be handled by Supabase Auth, which includes built-in support for:
  - Email/password authentication
  - Social providers (Google)
  - Session management
  - Token-based authentication

### Authorization
- Row Level Security (RLS) will be implemented in Supabase for all tables with user_id column (persons, presents)
- RLS policies will be set to ensure users can only access their own data
- Example RLS policy for persons table:
  ```sql
  ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
  CREATE POLICY persons_policy ON persons
    USING (user_id = auth.uid());
  ```
- Example RLS policy for presents table:
  ```sql
  ALTER TABLE presents ENABLE ROW LEVEL SECURITY;
  CREATE POLICY presents_policy ON presents
    USING (user_id = auth.uid());
  ```
- Example RLS policy for persons_presents table (more complex to ensure users can only assign presents they own to persons they own):
  ```sql
  ALTER TABLE persons_presents ENABLE ROW LEVEL SECURITY;
  CREATE POLICY persons_presents_policy ON persons_presents
    USING (
      EXISTS (SELECT 1 FROM persons WHERE id = person_id AND user_id = auth.uid()) AND
      EXISTS (SELECT 1 FROM presents WHERE id = present_id AND user_id = auth.uid())
    );
  ```

## 4. Validation and Business Logic

### Validation Rules

#### Persons
- `name` must be provided and non-empty
- `user_id` will be automatically set to the authenticated user's ID

#### Presents
- `name` must be provided and non-empty
- `price` must be a non-negative decimal number
- `user_id` will be automatically set to the authenticated user's ID

#### Person-Present Assignments
- Both `person_id` and `present_id` must reference existing records
- Combination of `person_id` and `present_id` must be unique
- User can only assign presents that they own to persons that they own

### Business Logic Implementation
- **Adding Persons**: Simple CRUD operation with user_id automatically set to the authenticated user's ID
- **Adding Presents**: Simple CRUD operation with user_id automatically set to the authenticated user's ID
- **Assigning Presents to Persons**: 
  - Can be done during present creation by including `person_id` in the request
  - Can be done after creation using the dedicated assignment endpoint
  - Multiple persons can be assigned the same present, and multiple presents can be assigned to the same person
- **Data Management**: 
  - Standard CRUD operations for all resources
  - Automatic application of RLS to ensure users can only access their own data
  - Cascading deletes for data consistency (when a person or present is deleted, associated assignments are also deleted) 