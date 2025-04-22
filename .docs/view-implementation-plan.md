# API Endpoint Implementation Plan: POST /presents

## 1. Przegląd punktu końcowego
Cel: Utworzenie nowego rekordu prezentu oraz opcjonalne przypisanie go do osoby. Endpoint umożliwia autoryzowanym użytkownikom dodawanie prezentów, które są powiązane z ich kontem, co pozwala na łatwe zarządzanie listą prezentów.

## 2. Szczegóły żądania
- **Metoda HTTP**: POST
- **Struktura URL**: /presents
- **Parametry**:
  - **Wymagane**:
    - `name` (string): Nazwa prezentu
    - `price` (number): Cena prezentu (wartość >= 0)
    - `link` (string): URL do prezentu
    - `description` (string): Opis prezentu
    - `tag` (string): Kategoria lub tag prezentu
  - **Opcjonalne**:
    - `person_id` (number): Identyfikator osoby, do której ma być przypisany prezent
- **Request Body**:
```json
{
  "name": "Smart Watch",
  "price": 199.99,
  "link": "https://example.com/smart-watch",
  "description": "Latest model with health tracking",
  "tag": "electronics",
  "person_id": 1
}
```

## 3. Wykorzystywane typy
- **CreatePresentCommand**: Zawiera pola `name`, `price`, `link`, `description`, `tag` oraz opcjonalnie `person_id`.
- **PresentDto**: Zawiera pola `id`, `name`, `price`, `link`, `description`, `tag`, `created_at` i `updated_at` zwracane w odpowiedzi.

## 4. Szczegóły odpowiedzi
- **Status sukcesu**: 201 Created
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
- **Kody Błędów:**
  - 400 Bad Request: Nieprawidłowe lub niekompletne dane wejściowe
  - 401 Unauthorized: Użytkownik nie jest autoryzowany
  - 404 Not Found: Podany `person_id` nie odpowiada istniejącej osobie
  - 500 Internal Server Error: Błędy serwera lub bazy danych

## 5. Przepływ danych
1. **Autentykacja**: Weryfikacja tokenu lub sesji, aby potwierdzić, że żądanie pochodzi od autoryzowanego użytkownika.
2. **Walidacja Wejścia**: Użycie narzędzia walidacyjnego (np. zod) do sprawdzenia struktury danych zgodnej z `CreatePresentCommand`.
3. **Sprawdzenie Relacji**: Jeśli `person_id` jest przekazany, dodatkowa walidacja sprawdza, czy osoba istnieje oraz czy należy do autoryzowanego użytkownika.
4. **Operacja na Bazie Danych**:
   - Wstawienie rekordu do tabeli `presents` z odpowiednim `user_id`.
   - Jeżeli `person_id` jest dostarczony, wstawienie rekordu do tabeli `persons_presents` w celu utworzenia relacji między osobą a prezentem.
5. **Zwrócenie Wyniku**: Odpowiedź zawiera nowo utworzony rekord prezentu ze wszystkimi polami, w tym `created_at` oraz `updated_at`.

## 6. Względy bezpieczeństwa
- **Autoryzacja**: Endpoint wymaga autoryzacji (np. za pomocą middleware Supabase), aby operacja mogła być wykonana tylko przez zalogowanych użytkowników.
- **Walidacja Danych**: Użycie zod lub podobnego narzędzia do walidacji danych wejściowych aby zapobiec atakom typu injection.
- **Sprawdzenie Uprawnień**: Jeżeli `person_id` jest przekazany, upewnienie się, że osoba ta należy do aktualnie zalogowanego użytkownika.
- **Przygotowane Zapytania**: Używanie parametrów zapytań SQL aby zabezpieczyć operacje bazodanowe przed SQL Injection.

## 7. Obsługa błędów
- **400 Bad Request**: W przypadku błędów walidacji danych wejściowych.
- **401 Unauthorized**: Gdy użytkownik nie jest autoryzowany.
- **404 Not Found**: Gdy podany `person_id` nie odpowiada istniejącej osobie.
- **500 Internal Server Error**: W przypadku nieoczekiwanych błędów serwera lub bazy danych.

## 8. Rozważania dotyczące wydajności
- **Transakcje**: Użycie transakcji przy operacjach, które wymagają spójności (wstawienie prezentu i opcjonalne przypisanie do osoby).
- **Indeksowanie**: Upewnienie się, że kolumny takie jak `user_id` i `person_id` są odpowiednio indeksowane.
- **Minimalizacja Zapytan**: Optymalizacja liczby zapytań bazodanowych poprzez łączenie operacji w ramach jednej transakcji.

## 9. Kroki implementacji
1. **Utworzenie Endpointu**: Dodanie nowego pliku w `src/pages/api/presents` obsługującego metodę POST.
2. **Walidacja Wejścia**: Implementacja walidacji danych wejściowych za pomocą zod przy wykorzystaniu schematu odpowiadającego `CreatePresentCommand`.
3. **Autoryzacja**: Weryfikacja autoryzacji użytkownika na podstawie tokenu lub sesji (np. przez middleware Supabase).
4. **Logika Biznesowa**:
   - Utworzenie lub aktualizacja logiki w serwisie, np. `src/lib/services/presentService.ts` do zarządzania operacjami na danych prezentów.
   - Weryfikacja `person_id` (jeśli podany) i potwierdzenie relacji między użytkownikiem a osobą.
5. **Operacje Bazodanowe**: Wykonanie operacji insert w tabeli `presents` oraz warunkowe dodanie rekordu do `persons_presents` wewnątrz transakcji.
6. **Obsługa Błędów**: Implementacja mechanizmu try/catch do wychwytywania błędów i zwracania odpowiednich kodów statusu.
7. **Zwrócenie Odpowiedzi**: Zwrócenie utworzonego rekordu prezentu z kodem 201 Created, lub odpowiedni komunikat błędu w razie niepowodzenia.