use vercel_runtime::{run, Body, Error, Request, Response, StatusCode};
use serde_json::json;
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

#[tokio::main]
async fn main() -> Result<(), Error> {
    run(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let limit = 10_000_000;
    let start = Instant::now();
    let count = sieve(limit);
    let duration = start.elapsed();

    let response_body = json!({
        "language": "Rust",
        "time": duration.as_secs_f64(),
        "count": count,
        "limit": limit
    });

    Ok(Response::builder()
        .status(StatusCode::OK)
        .header("Content-Type", "application/json")
        .body(Body::Text(response_body.to_string()))?)
}
