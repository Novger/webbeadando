<?php

// Adatbázis kapcsolat beállítások
$host = "localhost";
$dbname = "webbeadando";
$username = "webbeadando";
$password = "Ge13Ka22neT";

try {
    // PDO kapcsolat létrehozása UTF-8 karakterkódolással
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    // Hibakezelés: kivétel dobása hiba esetén
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Alapértelmezett lekérdezési mód (asszociatív tömb)
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Hiba esetén JSON válasz küldése
    echo json_encode([
        "error" => "Adatbázis kapcsolódási hiba"
    ]);
    exit;
}