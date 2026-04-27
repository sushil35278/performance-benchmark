use std::time::Instant;

fn sieve(limit: usize) -> usize {
    let mut primes = vec![true; limit + 1];
    primes[0] = false;
    primes[1] = false;

    let mut p = 2;
    while p * p <= limit {
        if primes[p] {
            let mut i = p * p;
            while i <= limit {
                primes[i] = false;
                i += p;
            }
        }
        p += 1;
    }

    primes.iter().filter(|&&is_prime| is_prime).count()
}

fn main() {
    let limit = 100_000_000;
    println!("Rust: Starting sieve up to {}...", limit);
    let start = Instant::now();
    let count = sieve(limit);
    let duration = start.elapsed();
    println!("Rust: Found {} primes.", count);
    println!("Rust: Time taken: {:.4f} seconds", duration.as_secs_f64());
}
