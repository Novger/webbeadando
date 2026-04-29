<?php

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once "db.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    $stmt = $pdo->query("
        SELECT 
            gep.id,
            gep.gyarto,
            gep.tipus,
            gep.kijelzo,
            gep.memoria,
            gep.merevlemez,
            gep.videovezerlo,
            gep.ar,
            gep.processzorid,
            gep.oprendszerid,
            gep.db,
            processzor.gyarto AS processzor_gyarto,
            processzor.tipus AS processzor_tipus,
            oprendszer.nev AS oprendszer_nev
        FROM gep
        INNER JOIN processzor ON gep.processzorid = processzor.id
        INNER JOIN oprendszer ON gep.oprendszerid = oprendszer.id
        ORDER BY gep.id DESC
    ");

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("
        INSERT INTO gep
        (gyarto, tipus, kijelzo, memoria, merevlemez, videovezerlo, ar, processzorid, oprendszerid, db)
        VALUES
        (:gyarto, :tipus, :kijelzo, :memoria, :merevlemez, :videovezerlo, :ar, :processzorid, :oprendszerid, :db)
    ");

    $stmt->execute([
        ":gyarto" => $data["gyarto"],
        ":tipus" => $data["tipus"],
        ":kijelzo" => $data["kijelzo"],
        ":memoria" => $data["memoria"],
        ":merevlemez" => $data["merevlemez"],
        ":videovezerlo" => $data["videovezerlo"],
        ":ar" => $data["ar"],
        ":processzorid" => $data["processzorid"],
        ":oprendszerid" => $data["oprendszerid"],
        ":db" => $data["db"]
    ]);

    echo json_encode(["message" => "Sikeres hozzáadás"]);
    exit;
}

if ($method === "PUT") {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("
        UPDATE gep SET
            gyarto = :gyarto,
            tipus = :tipus,
            kijelzo = :kijelzo,
            memoria = :memoria,
            merevlemez = :merevlemez,
            videovezerlo = :videovezerlo,
            ar = :ar,
            processzorid = :processzorid,
            oprendszerid = :oprendszerid,
            db = :db
        WHERE id = :id
    ");

    $stmt->execute([
        ":id" => $data["id"],
        ":gyarto" => $data["gyarto"],
        ":tipus" => $data["tipus"],
        ":kijelzo" => $data["kijelzo"],
        ":memoria" => $data["memoria"],
        ":merevlemez" => $data["merevlemez"],
        ":videovezerlo" => $data["videovezerlo"],
        ":ar" => $data["ar"],
        ":processzorid" => $data["processzorid"],
        ":oprendszerid" => $data["oprendszerid"],
        ":db" => $data["db"]
    ]);

    echo json_encode(["message" => "Sikeres módosítás"]);
    exit;
}

if ($method === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);

    $stmt = $pdo->prepare("DELETE FROM gep WHERE id = :id");
    $stmt->execute([
        ":id" => $data["id"]
    ]);

    echo json_encode(["message" => "Sikeres törlés"]);
    exit;
}
