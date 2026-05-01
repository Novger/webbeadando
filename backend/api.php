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


// ✅ ÚJ: egységes válasz
function sendResponse($success, $data = null, $error = null, $statusCode = 200)
{
    http_response_code($statusCode);

    echo json_encode([
        "success" => $success,
        "data" => $data,
        "error" => $error
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


// JSON beolvasás
function getJsonInput()
{
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        sendResponse(false, null, "Érvénytelen JSON adat", 400);
    }

    return $data;
}


// Kötelező mezők
function validateRequiredFields($data, $fields)
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || trim((string)$data[$field]) === "") {
            sendResponse(false, null, "Hiányzó mező: " . $field, 400);
        }
    }
}


// Szám mezők
function validateNumericFields($data, $fields)
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || !is_numeric($data[$field])) {
            sendResponse(false, null, "Hibás szám mező: " . $field, 400);
        }
    }
}


try {

    // GET
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

        sendResponse(true, $stmt->fetchAll(PDO::FETCH_ASSOC));
    }

        // POST
    if ($method === "POST") {
        $data = getJsonInput();

        validateRequiredFields($data, [
            "gyarto", "tipus", "kijelzo", "memoria",
            "merevlemez", "videovezerlo", "ar",
            "processzorid", "oprendszerid", "db"
        ]);

        validateNumericFields($data, [
            "ar", "processzorid", "oprendszerid", "db"
        ]);

        $stmt = $pdo->prepare("
            INSERT INTO gep
            (gyarto, tipus, kijelzo, memoria, merevlemez, videovezerlo, ar, processzorid, oprendszerid, db)
            VALUES
            (:gyarto, :tipus, :kijelzo, :memoria, :merevlemez, :videovezerlo, :ar, :processzorid, :oprendszerid, :db)
        ");

        $stmt->execute([
            ":gyarto" => trim($data["gyarto"]),
            ":tipus" => trim($data["tipus"]),
            ":kijelzo" => trim($data["kijelzo"]),
            ":memoria" => trim($data["memoria"]),
            ":merevlemez" => trim($data["merevlemez"]),
            ":videovezerlo" => trim($data["videovezerlo"]),
            ":ar" => (int)$data["ar"],
            ":processzorid" => (int)$data["processzorid"],
            ":oprendszerid" => (int)$data["oprendszerid"],
            ":db" => (int)$data["db"]
        ]);

        sendResponse(true, ["message" => "Sikeres hozzáadás"], null, 201);
    }

    // PUT
    if ($method === "PUT") {
        $data = getJsonInput();

        validateRequiredFields($data, [
            "id", "gyarto", "tipus", "kijelzo", "memoria",
            "merevlemez", "videovezerlo", "ar",
            "processzorid", "oprendszerid", "db"
        ]);

        validateNumericFields($data, [
            "id", "ar", "processzorid", "oprendszerid", "db"
        ]);

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
            ":id" => (int)$data["id"],
            ":gyarto" => trim($data["gyarto"]),
            ":tipus" => trim($data["tipus"]),
            ":kijelzo" => trim($data["kijelzo"]),
            ":memoria" => trim($data["memoria"]),
            ":merevlemez" => trim($data["merevlemez"]),
            ":videovezerlo" => trim($data["videovezerlo"]),
            ":ar" => (int)$data["ar"],
            ":processzorid" => (int)$data["processzorid"],
            ":oprendszerid" => (int)$data["oprendszerid"],
            ":db" => (int)$data["db"]
        ]);

        sendResponse(true, ["message" => "Sikeres módosítás"]);
    }

    // DELETE
    if ($method === "DELETE") {
        $data = getJsonInput();

        validateRequiredFields($data, ["id"]);
        validateNumericFields($data, ["id"]);

        $stmt = $pdo->prepare("DELETE FROM gep WHERE id = :id");
        $stmt->execute([
            ":id" => (int)$data["id"]
        ]);

        sendResponse(true, ["message" => "Sikeres törlés"]);
    }

    sendResponse(false, null, "Nem támogatott HTTP metódus", 405);

} catch (PDOException $e) {
    sendResponse(false, null, "Adatbázis hiba történt", 500);
}