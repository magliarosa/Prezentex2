# Dokument wymagań produktu (PRD) - Prezentex

## 1. Przegląd produktu
Prezentex to centralne narzędzie dla osób, które chcą ograniczyć stres związany z zakupem prezentów. Aplikacja umożliwia dodawanie pomysłów na prezenty oraz zarządzanie danymi odbiorców. W MVP zostaną zaimplementowane podstawowe funkcjonalności, takie jak:
- Dodawanie osób z możliwością wprowadzenia nazwy i opisu,
- Dodawanie pomysłów na prezenty z atrybutami: nazwa, cena, link i opis,
- Przypisywanie prezentów do konkretnych osób,
- System rejestracji, logowania oraz autoryzacji użytkowników (integracja z kontem Google).

Dodatkowo, aplikacja cechować się będzie intuicyjnym interfejsem oraz jednolitym stylem modalnych okien.

## 2. Problem użytkownika
Wielu użytkowników doświadcza stresu przy zakupie prezentów, zwłaszcza gdy decyzja podejmowana jest w ostatniej chwili. Brak scentralizowanego miejsca do zbierania i organizacji pomysłów na prezenty skutkuje:
- Ryzykiem nietrafionego wyboru prezentu,
- Trudnościami w szybkiej organizacji pomysłów,
- Brakiem możliwości przypisania konkretnego prezentu do osoby, która ma go otrzymać.

Aby rozwiązać te problemy, użytkownicy potrzebują narzędzia, które umożliwi im łatwe zapisywanie, organizację i przypisywanie pomysłów na prezenty.

## 3. Wymagania funkcjonalne
Aplikacja Prezentex musi umożliwiać:
- Dodawanie nowych osób (odbiorców) z możliwością wprowadzenia nazwy i opisu;
- Dodawanie pomysłów na prezenty z polami: nazwa, cena, link oraz opis;
- Przypisywanie pomysłów na prezenty do konkretnych osób (zarówno podczas dodawania, jak i edycji wpisów);
- Przeglądanie, edycję i usuwanie danych (osób, prezentów, przypisań);
- Utrzymanie jednolitego stylu modalnych okien (spójna kolorystyka, układ przycisków);
- Implementację systemu kont użytkowników z funkcjami rejestracji, logowania i autoryzacji, w tym logowania przez konto Google.

## 4. Granice produktu
W ramach MVP nie będą implementowane:
- Systemy przypomnień ani notyfikacji wewnątrz aplikacji;
- Zaawansowane funkcje filtrowania danych lub mechanizmy zbierania feedbacku od użytkowników;
- Udostępnianie pomysłów na prezenty pomiędzy użytkownikami;
- Aplikacje mobilne – produkt będzie dostępny wyłącznie jako aplikacja webowa;
- Rozbudowane opcje dodatkowe, takie jak zapisywanie dat urodzin lub imienin, które mogłyby wiązać się z systemem przypomnień.

## 5. Historyjki użytkowników
US-001
Tytuł: Dodanie pomysłu na prezent
Opis: Jako użytkownik chcę dodać nowy pomysł na prezent, aby móc zapisać inspirację i w przyszłości dokonać zakupu.
Kryteria akceptacji:
- Użytkownik widzi modal umożliwiający wprowadzenie szczegółów: nazwy, ceny, linku oraz opisu;
- Po zatwierdzeniu, pomysł pojawia się na liście prezentów;
- Walidacja danych (np. wymóg niepustej nazwy) działa poprawnie.

US-002
Tytuł: Dodanie osoby do systemu
Opis: Jako użytkownik chcę dodać osobę, dla której zamierzam kupić prezent, aby móc przypisać do niej konkretny pomysł.
Kryteria akceptacji:
- Modal umożliwia wprowadzenie wymaganych danych: nazwy i opisu dla osoby;
- Dodana osoba pojawia się na liście odbiorców;
- Funkcja przypisania prezentu do osoby jest dostępna po dodaniu osoby.

US-003
Tytuł: Przypisanie prezentu do osoby
Opis: Jako użytkownik chcę przypisać dostępny pomysł na prezent do konkretnej osoby, aby móc śledzić, kto ma otrzymać dany prezent.
Kryteria akceptacji:
- Użytkownik może przypisać prezent zarówno podczas dodawania, jak i edycji osoby;
- Po przypisaniu, prezent wyświetla się w szczegółach danej osoby;
- Po przypisaniu, osoba wyświetla się w szczegółach danego prezentu;
- System aktualizuje stan przypisania w czasie rzeczywistym bez konieczności odświeżania strony.

US-004
Tytuł: Edycja i usuwanie wpisów
Opis: Jako użytkownik chcę mieć możliwość edytowania i usuwania danych (osób, prezentów, przypisań), aby utrzymać bazę aktualnych informacji.
Kryteria akceptacji:
- Istnieje opcja edycji danych poprzez dedykowany modal;
- Usunięcie wpisu powoduje natychmiastową aktualizację listy bez błędów;
- Użytkownik otrzymuje potwierdzenie zakończenia operacji (np. komunikat sukcesu - popup).

US-005
Tytuł: Uwierzytelnianie i rejestracja użytkownika
Opis: Jako użytkownik chcę mieć możliwość logowania i rejestracji poprzez konto Google, aby zapewnić bezpieczny dostęp do aplikacji.
Kryteria akceptacji:
- System umożliwia logowanie za pomocą mechanizmu autoryzacji Google;
- Sesja użytkownika jest bezpiecznie zarządzana;
- Dostęp do funkcjonalności aplikacji wymaga zalogowania;
- Po wylogowaniu, dostęp do chronionych danych jest zablokowany.

## 6. Metryki sukcesu
- Procent użytkowników, którzy przypisali przynajmniej jeden pomysł na prezent do osoby (docelowo minimum 75%).
- Stosunek liczby dodanych pomysłów na prezenty oraz osób do liczby aktywnych użytkowników.
- Pozytywne wyniki testów integracji z systemem logowania przez konto Google. 