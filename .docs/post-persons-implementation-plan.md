# API Endpoint Implementation Plan: POST /persons

## 1. Przegląd punktu końcowego
Endpoint POST /persons służy do dodawania nowej osoby do systemu. Umożliwia to użytkownikowi wprowadzenie danych osoby (imię, opis) oraz przypisanie jej do aktualnie zalogowanego konta użytkownika. Endpoint zwraca utworzoną osobę wraz z metadanymi (id, daty utworzenia/aktualizacji).

## 2. Szczegóły żądania
- **Metoda HTTP**: POST
- **Struktura URL**: /persons
- **Parametry**:
  - **Wymagane**: 
    - `name` (string) - Nazwa osoby
    - `description` (string) - Opis osoby
  - **Opcjonalne**: Żadne
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "description": "My brother"
  }
  ```

## 3. Wykorzystywane typy
- **DTO**: `PersonDto` (zawiera: id, name, description, created_at, updated_at)
- **Command Model**: `CreatePersonCommand` (obejmuje: name, description)

## 4. Szczegóły odpowiedzi
- **Kod sukcesu**: 201 Created
- **Response Body** (przykład):
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "description": "My brother",
    "created_at": "2023-06-15T10:30:00Z",
    "updated_at": "2023-06-15T10:30:00Z"
  }
  ```
- **Kody błędów**:
  - 400 Bad Request - Przy błędach walidacji danych wejściowych
  - 401 Unauthorized - Gdy użytkownik nie jest zalogowany lub nie ma uprawnień
  - 500 Internal Server Error - W przypadku wystąpienia nieoczekiwanych błędów po stronie serwera

## 5. Przepływ danych
1. Klient wysyła żądanie POST /persons z danymi osoby.
2. Po stronie serwera:
   - Walidacja danych wejściowych przy użyciu biblioteki Zod.
   - Sprawdzenie autentykacji i pobranie `user_id` z kontekstu (np. SupabaseAuth).
   - Wywołanie logiki biznesowej w warstwie serwisowej (np. `src/lib/services/personService.ts`), która wstawia rekord do tabeli `persons` (przypisując `user_id`).
   - W przypadku powodzenia zwrócenie utworzonego rekordu z odpowiednimi metadanymi.

## 6. Względy bezpieczeństwa
- **Uwierzytelnianie**: Endpoint musi być chroniony; dostęp mają tylko zalogowani użytkownicy.
- **Walidacja danych**: Wykorzystanie Zod do walidacji parametrów wejściowych (name, description) zgodnie z wymaganiami.
- **Autoryzacja**: Upewnienie się, że tworzenie osoby jest wykonywane w kontekście odpowiedniego użytkownika (poprzez `user_id`).
- **Sanityzacja danych**: Opcjonalne mechanizmy dodatkowej filtracji wejścia, aby zapobiec SQL Injection lub innym atakom.

## 7. Obsługa błędów
- **400 Bad Request**: Zwracane gdy walidacja danych wejściowych nie przejdzie.
- **401 Unauthorized**: Zwracane gdy użytkownik nie jest zalogowany lub brakuje odpowiednich uprawnień.
- **500 Internal Server Error**: Zwracane w przypadku błędów przy komunikacji z bazą danych lub innych nieoczekiwanych problemów.
- Dodatkowe logowanie błędów dla wsparcia diagnostycznego i monitorowania.

## 8. Rozważania dotyczące wydajności
- **Optymalizacja zapytań**: Korzystanie z natywnych mechanizmów Supabase dla wstawiania rekordów.
- **Minimalizacja obciążenia serwera**: Walidacja i wstępna obróbka danych przed wykonaniem operacji na bazie danych.
- **Skalowalność**: Projektowanie endpointu, aby łatwo można było rozszerzyć logikę przetwarzania w przyszłości.

## 9. Etapy wdrożenia
1. Utworzenie nowego endpointu w ramach struktury Astro (np. `src/pages/api/persons/index.ts`).
2. Implementacja walidacji danych wejściowych z użyciem Zod.
3. Pobranie `user_id` z kontekstu autoryzacji (SupabaseAuth) i zabezpieczenie endpointu.
4. Wyodrębnienie logiki biznesowej do nowego serwisu (np. `src/lib/services/personService.ts`).
5. Implementacja operacji wstawiania rekordu do tabeli `persons` zgodnie z relacjami bazy danych.
6. Implementacja mechanizmu logowania błędów oraz monitorowania endpointu.
7. Dokumentacja oraz przegląd kodu w celu zapewnienia zgodności z zasadami implementacji. 