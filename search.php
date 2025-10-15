<?php
// Set header agar response dikenali sebagai JSON
header('Content-Type: application/json');

// Data statis (fake database)
$games = [
    ["name" => "Space Adventure", "category" => "petualangan"],
    ["name" => "Catch the Fruit", "category" => "puzzle"],
    ["name" => "Speed Racer", "category" => "balapan"],
    ["name" => "Puzzle Master", "category" => "puzzle"],
    ["name" => "Soccer Stars", "category" => "olahraga"],
    ["name" => "Archery Challenge", "category" => "olahraga"],
    ["name" => "Castle Defense", "category" => "strategi"],
    ["name" => "Pizza Chef", "category" => "aksi"],
    ["name" => "Dino Run", "category" => "tembak-tembakan"],
];

// Ambil parameter GET
$category = isset($_GET['category']) ? strtolower(trim($_GET['category'])) : '';
$name = isset($_GET['name']) ? strtolower(trim($_GET['name'])) : '';

// Filter data
$filtered = array_filter($games, function($game) use ($category, $name) {
    $matchCategory = ($category === '' || $category === 'semua') ? true : strtolower($game['category']) === $category;
    $matchName = $name === '' ? true : strpos(strtolower($game['name']), $name) !== false;
    return $matchCategory && $matchName;
});

// Urutkan hasil secara alfabetis berdasarkan nama
usort($filtered, function($a, $b) {
    return strcmp(strtolower($a['name']), strtolower($b['name']));
});

// Output JSON
// array_values agar index berurutan (bukan associative)
echo json_encode(array_values($filtered));
?>
