<?php

$host = "localhost";
$dbname = "webbeadando";
$username = "webbeadando";
$password = "Ge13Ka22neT";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Adatbázis kapcsolódási hiba: " . $e->getMessage()
    ]);
    exit;
}