# Schemat bazy danych PostgreSQL dla Prezentex

## 1. Lista tabel
### Tabela: users

This table is managed by SupabaseAuth

- id: SERIAL PRIMARY KEY
- email: VARCHAR NOT NULL UNIQUE
- password: VARCHAR  
- google_id: VARCHAR
- created_at: TIMESTAMP NOT NULL DEFAULT NOW()
- updated_at: TIMESTAMP NOT NULL DEFAULT NOW()

### Tabela: persons
- id: SERIAL PRIMARY KEY
- name: VARCHAR NOT NULL
- user_id: INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
- created_at: TIMESTAMP NOT NULL DEFAULT NOW()
- updated_at: TIMESTAMP NOT NULL DEFAULT NOW()

### Tabela: presents
- id: SERIAL PRIMARY KEY
- name: VARCHAR NOT NULL
- price: NUMERIC(10,2) CHECK (price >= 0)
- link: VARCHAR
- description: VARCHAR
- tag: VARCHAR
- user_id: INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
- created_at: TIMESTAMP NOT NULL DEFAULT NOW()
- updated_at: TIMESTAMP NOT NULL DEFAULT NOW()

### Tabela: persons_presents
- person_id: INTEGER NOT NULL REFERENCES persons(id) ON DELETE CASCADE
- present_id: INTEGER NOT NULL REFERENCES presents(id) ON DELETE CASCADE
- created_at: TIMESTAMP NOT NULL DEFAULT NOW()
- updated_at: TIMESTAMP NOT NULL DEFAULT NOW()
- PRIMARY KEY (person_id, present_id)

## 2. Relacje między tabelami
- Użytkownik (users) może mieć wiele rekordów w tabelach persons oraz presents (relacja jeden-do-wielu poprzez kolumnę user_id).
- Relacja wiele-do-wielu między persons i presents jest realizowana przez tabelę persons_presents.

## 3. Indeksy
- Indeks na kolumnie `user_id` w tabelach persons i presents.
- Indeks na kolumnie `name` w tabelach persons i presents.
- Dodatkowy indeks na kolumnie `tag` w tabeli presents.

## 4. Zasady PostgreSQL (RLS)
- Włączone RLS w tabelach posiadających kolumnę user_id (persons, presents).
- Polityki RLS ograniczają dostęp do rekordów do tych, dla których kolumna user_id odpowiada identyfikatorowi użytkownika z sesji.
- Przykładowa implementacja:
  ```sql
  ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
  CREATE POLICY persons_policy ON persons
    USING (user_id = current_setting('app.user_id')::INTEGER);

  ALTER TABLE presents ENABLE ROW LEVEL SECURITY;
  CREATE POLICY presents_policy ON presents
    USING (user_id = current_setting('app.user_id')::INTEGER);
  ```

## 5. Dodatkowe uwagi
- Wszystkie tabele zawierają kolumny audytowe `created_at` i `updated_at`, gdzie `updated_at` jest aktualizowany przez dedykowane triggery.
- Schemat jest zgodny z zasadami 3NF i przygotowany do implementacji mechanizmu RLS dla poprawy bezpieczeństwa danych.
- W przyszłości, w przypadku rozszerzenia funkcjonalności (np. kopiowanie encji przy udostępnianiu prezentów), schemat może zostać odpowiednio zmodyfikowany. 