FROM rust:1.77-slim
WORKDIR /app
COPY . .
RUN cargo build --release
CMD ["./target/release/rust_sieve"]
