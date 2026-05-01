# Webes CRUD alkalmazás

Ez a projekt egy React + PHP alapú CRUD alkalmazás, amely egy számítógép adatbázist kezel.

## Technológiák

- Frontend: React (Vite)
- Backend: PHP (REST API)
- Adatbázis: MySQL

## Funkciók

- Új gép hozzáadása
- Gépek listázása
- Módosítás
- Törlés

## API

- GET /api.php → lista
- POST /api.php → új rekord (201)
- PUT /api.php → módosítás
- DELETE /api.php → törlés

A rendszer REST elvek szerint működik, megfelelő HTTP státuszkódokkal.

## Telepítés

1. Backend futtatása (XAMPP)
2. Frontend build:
   npm install
   npm run build
3. dist mappa feltöltése

## Készítők

- Palszabo16
- Novger
