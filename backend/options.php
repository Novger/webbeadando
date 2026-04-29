<?php

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");

require_once "db.php";

$processors = $pdo->query("
    SELECT id, gyarto, tipus
    FROM processzor
    ORDER BY gyarto, tipus
")->fetchAll(PDO::FETCH_ASSOC);

$systems = $pdo->query("
    SELECT id, nev
    FROM oprendszer
    ORDER BY nev
")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "processzorok" => $processors,
    "oprendszerek" => $systems
]);