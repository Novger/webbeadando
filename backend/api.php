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


// JSON beolvasás ellenőrzéssel
function getJsonInput()
{
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode(["error" => "Érvénytelen JSON adat"]);
        exit;
    }

    return $data;
}


// Kötelező mezők ellenőrzése
function validateRequiredFields($data, $fields)
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || trim((string)$data[$field]) === "") {
            http_response_code(400);
            echo json_encode(["error" => "Hiányzó mező: " . $field]);
            exit;
        }
    }
}


// Szám mezők ellenőrzése
function validateNumericFields($data, $fields)
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || !is_numeric($data[$field])) {
            http_response_code(400);
            echo json_encode(["error" => "Hibás szám mező: " . $field]);
            exit;
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

        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit;
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

        echo json_encode(["message" => "Sikeres hozzáadás"]);
        exit;
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

        echo json_encode(["message" => "Sikeres módosítás"]);
        exit;
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

        echo json_encode(["message" => "Sikeres törlés"]);
        exit;
    }

    http_response_code(405);
    echo json_encode(["error" => "Nem támogatott HTTP metódus"]);
    exit;

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Adatbázis hiba történt"]);
    exit;
}