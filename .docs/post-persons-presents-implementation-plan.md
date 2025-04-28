# API Endpoint Implementation Plan: POST /persons/{personId}/presents

## 1. Przegląd punktu końcowego
- Cel: Przypisanie istniejącego prezentu do konkretnej osoby w imieniu uwierzytelnionego użytkownika.

## 2. Szczegóły żądania
- Metoda HTTP: POST
- URL: `/persons/{personId}/presents`
- Parametry:
  - `personId` (path, number, wymagane) – identyfikator osoby.
- Request Body:
```json
{
  "presentId": number
}
```
- Związane typy (DTO / Command Models):
  - `AssignPresentCommand` (lub lokalny Request DTO): `{ presentId: number }`
  - Shared types: `PersonDto`, `PresentDto`

## 3. Szczegóły odpowiedzi
- Kod 201 Created – brak treści lub opcjonalnie zwraca obiekt asocjacji:
```json
{
  "personId": number,
  "presentId": number,
  "created_at": string
}
```
- Kody błędów:
  - 400 Bad Request – nieprawidłowy format danych.
  - 401 Unauthorized – brak uwierzytelnienia lub nieważny token.
  - 404 Not Found – osoba lub prezent nie istnieją lub nie należą do użytkownika.
  - 409 Conflict – przypisanie już istnieje.
  - 500 Internal Server Error – nieoczekiwany błąd serwera.

## 4. Przepływ danych
1. Handler API (`src/pages/api/persons/[personId]/presents.ts`) odbiera request.
2. Uwierzytelnianie: pobranie `userId` z `context.locals.supabase.auth`.
3. Walidacja:
   - `personId` z path (konwersja do number + Zod).
   - `presentId` z body (Zod schema).
4. Weryfikacja właściciela:
   - Pobranie rekordu `persons` WHERE `id = personId` AND `user_id = userId`.
   - Pobranie rekordu `presents` WHERE `id = presentId` AND `user_id = userId`.
5. Sprawdzenie istnienia istniejącej asocjacji w `persons_presents` (PK).
6. Wstawienie nowego rekordu do `persons_presents` z `person_id` i `present_id`.
7. Zwrot 201 Created.

## 5. Względy bezpieczeństwa
- Autoryzacja: upewnić się, że `person.user_id` i `present.user_id` odpowiadają `userId`.
- Uwierzytelnianie: Supabase Auth (JWT cookie lub header).
- Walidacja wejścia: Zod – ochrona przed SQL injection i nieprawidłowymi danymi.
- Polityka CORS i CSRF – zgodnie z ogólnymi ustawieniami aplikacji.

## 6. Obsługa błędów
- 400 Bad Request: ZodError – zwrócić komunikat i szczegóły walidacji.
- 401 Unauthorized: brak `userId` – zwrócić komunikat "Unauthorized".
- 404 Not Found:
  - brak rekordu w `persons` – "Person not found".
  - brak rekordu w `presents` – "Present not found".
- 409 Conflict: istnienie rekordu w `persons_presents` – "Assignment already exists".
- 500 Internal Server Error: catch-all – zalogować i zwrócić generyczny komunikat.

## 7. Wydajność
- Wykorzystanie indeksów i klucza głównego (`PRIMARY KEY(person_id, present_id)`).
- Jedna transakcja na operację.
- Minimalna liczba zapytań SELECT.
- Ewentualne cache zapytań (opcjonalnie).

## 8. Kroki implementacji
1. Utworzyć plik `src/pages/api/persons/[personId]/presents.ts` z handlerem `export const POST` i `export const prerender = false`.
2. Zdefiniować Zod schema dla `personId` w path oraz `presentId` w body.
3. Uzyskać `supabase` i `user` z `context.locals`.
4. Walidować `personId` i `presentId`, obsługiwać ZodError.
5. Wyodrębnić logikę przypisania prezentu do serwisu `src/lib/services/personPresentService.ts`:
```ts
export async function assignPresentToPerson(
  userId: number,
  personId: number,
  presentId: number
): Promise<void> {
  // ...existing logic: check existence and ownership, conflict, insert...
}
```
6. W serwisie:
   - Sprawdzić istnienie i własność `person` i `present`.
   - Sprawdzić konflikt w `persons_presents`.
   - Wstawić rekord.
   - Rzucić dedykowane błędy (NotFoundError, ConflictError).
7. W endpoint:
   - Wywołać serwis,
   - Złapać błędy i zmapować je na odpowiednie statusy (404,409, etc.).
8. Zaktualizować dokumentację API (`.docs/api-spec.md`).