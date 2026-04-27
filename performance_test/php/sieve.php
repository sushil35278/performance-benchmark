<?php
ini_set('memory_limit', '2G');

function sieve($limit) {
    // SplFixedArray is more memory efficient than standard arrays
    $primes = new SplFixedArray($limit + 1);
    for ($i = 0; $i <= $limit; $i++) {
        $primes[$i] = true;
    }
    $primes[0] = $primes[1] = false;

    for ($p = 2; $p * $p <= $limit; $p++) {
        if ($primes[$p]) {
            for ($i = $p * $p; $i <= $limit; $i += $p) {
                $primes[$i] = false;
            }
        }
    }

    $count = 0;
    foreach ($primes as $isPrime) {
        if ($isPrime) $count++;
    }
    return $count;
}

$limit = 100000000;
echo "PHP: Starting sieve up to " . number_format($limit) . "...\n";
$start = microtime(true);
$count = sieve($limit);
$end = microtime(true);
echo "PHP: Found $count primes.\n";
echo "PHP: Time taken: " . number_format($end - $start, 4) . " seconds\n";
