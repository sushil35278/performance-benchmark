#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <time.h>

long sieve(long limit) {
    bool *primes = malloc((limit + 1) * sizeof(bool));
    if (!primes) return -1;
    for (long i = 0; i <= limit; i++) primes[i] = true;
    primes[0] = primes[1] = false;

    for (long p = 2; p * p <= limit; p++) {
        if (primes[p]) {
            for (long i = p * p; i <= limit; i += p) {
                primes[i] = false;
            }
        }
    }

    long count = 0;
    for (long i = 0; i <= limit; i++) {
        if (primes[i]) count++;
    }
    free(primes);
    return count;
}

int main() {
    long limit = 100000000;
    printf("C: Starting sieve up to %ld...\n", limit);
    
    struct timespec start, end;
    clock_gettime(CLOCK_MONOTONIC, &start);
    
    long count = sieve(limit);
    
    clock_gettime(CLOCK_MONOTONIC, &end);
    double time_taken = (end.tv_sec - start.tv_sec) + (end.tv_nsec - start.tv_nsec) / 1e9;
    
    printf("C: Found %ld primes.\n", count);
    printf("C: Time taken: %.4f seconds\n", time_taken);
    
    return 0;
}
