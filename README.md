# Aplikacja Biblioteki

Aplikacja biblioteki umożliwia przeglądanie dostępnych książek i autorów. Projekt wykorzystuje **Google Books API**, które zapewnia dostęp do największej na świecie biblioteki cyfrowej. 

## Funkcje aplikacji

- **Rejestracja i logowanie użytkowników**:
  - Użytkownicy niezarejestrowani mogą przeglądać dostępne książki.
  - Zalogowani użytkownicy mogą:
    - Dodawać książki do ulubionych.
    - Oznaczać książki w kategorii „Do przeczytania”.
    - Zarządzać listą ulubionych książek na swoim profilu użytkownika.

- **Wyszukiwanie pełnotekstowe**:
  - Możliwość wyszukiwania książek za pomocą Google Books API.

---

## Diagram przypadków użycia

(Tutaj należy wstawić diagram przypadków użycia, np. obrazek przedstawiający przepływ działań użytkowników w aplikacji.)

---

## Wykorzystane technologie

Aplikacja została stworzona z użyciem nowoczesnych technologii zapewniających szybkość, skalowalność oraz łatwość obsługi.

### **Frontend**
- **ReactJS**:
  - Stworzenie intuicyjnego i nowoczesnego interfejsu użytkownika.
  - Komponentowa struktura ułatwiająca rozbudowę i utrzymanie aplikacji.
  - Płynne działanie nawet przy dużej liczbie danych.

### **Backend**
- **NodeJS**:
  - Obsługa zapytań z frontendu oraz komunikacja z bazą danych.
  - Asynchroniczność, zapewniająca wydajność przy dużej liczbie równoczesnych użytkowników.

### **Baza danych**
- **MongoDB**:
  - Przechowywanie danych o użytkownikach, książkach i historii wypożyczeń.
  - Elastyczny model dokumentów umożliwiający łatwe zarządzanie danymi.
  - Skalowalność i wysoka wydajność.

### **Integracja z API**
- **Google Books API**:
  - Dostęp do globalnej bazy książek.
  - Pobieranie szczegółowych informacji o książkach, takich jak opisy, autorzy i recenzje.

---

## Wybór bazy danych

Do projektu wybrano **MongoDB** ze względu na:
- Prostotę użycia i elastyczność w zarządzaniu danymi.
- Wysoką wydajność w przechowywaniu i przetwarzaniu informacji o użytkownikach, książkach oraz hasłach.

---

## Instalacja i uruchomienie

1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/Bazal525/ProjektBiblioteka.git
   cd ProjektBiblioteka

## Uruchamianie projektu
W projekcie prze uruchomieniem trzeba zrobić nastepujące rzeczy

### W pliku library-backend `node server.js`

Uruchamia serwer

### W pliku library-frontend `npm start`

Uruchamia aplikacje

Otwórz [http://localhost:3000](http://localhost:3000) żeby zobaczyć aplikacje w twojej przegladarce.


