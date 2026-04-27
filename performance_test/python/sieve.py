import time

def sieve(limit):
    # Using bytearray for efficiency in Python
    primes = bytearray([1]) * (limit + 1)
    primes[0] = primes[1] = 0
    
    for p in range(2, int(limit**0.5) + 1):
        if primes[p]:
            for i in range(p * p, limit + 1, p):
                primes[i] = 0
    
    return sum(primes)

if __name__ == "__main__":
    limit = 100_000_000
    print(f"Python: Starting sieve up to {limit:,}...")
    start = time.time()
    count = sieve(limit)
    end = time.time()
    print(f"Python: Found {count} primes.")
    print(f"Python: Time taken: {end - start:.4f} seconds")
