<?php
header('Content-Type: application/json');

function sieve($limit) {
    $primes = new SplFixedArray($limit + 1);
    for ($i = 0; $i <= $limit; $i++) $primes[$i] = true;
    $primes[0] = $primes[1] = false;

    for ($p = 2; $p * $p <= $limit; $p++) {
        if ($primes[$p]) {
            for ($i = $p * $p; $i <= $limit; $i += $p) {
                $primes[$i] = false;
            }
        }
    }

    $count = 0;
    foreach ($primes as $isPrime) if ($isPrime) $count++;
    return $count;
}

$limit = 10000000;
$start = microtime(true);
$count = sieve($limit);
$end = microtime(true);

echo json_encode([
    "language" => "PHP",
    "time" => $end - $start,
    "count" => $count,
    "limit" => $limit
]);
