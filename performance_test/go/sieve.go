package main

import (
	"fmt"
	"time"
)

func sieve(limit int) int {
	primes := make([]bool, limit+1)
	for i := 2; i <= limit; i++ {
		primes[i] = true
	}

	for p := 2; p*p <= limit; p++ {
		if primes[p] {
			for i := p * p; i <= limit; i += p {
				primes[i] = false
			}
		}
	}

	count := 0
	for i := 2; i <= limit; i++ {
		if primes[i] {
			count++
		}
	}
	return count
}

func main() {
	limit := 100000000
	fmt.Printf("Go: Starting sieve up to %d...\n", limit)
	start := time.Now()
	count := sieve(limit)
	elapsed := time.Since(start)
	fmt.Printf("Go: Found %d primes.\n", count)
	fmt.Printf("Go: Time taken: %.4f seconds\n", elapsed.Seconds())
}
