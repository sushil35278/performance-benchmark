package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
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

func Handler(w http.ResponseWriter, r *http.Request) {
	limit := 10000000
	start := time.Now()
	count := sieve(limit)
	elapsed := time.Since(start)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"language": "Go",
		"time":     elapsed.Seconds(),
		"count":    count,
		"limit":    limit,
	})
}
