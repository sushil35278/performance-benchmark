FROM golang:1.22-alpine
WORKDIR /app
COPY sieve.go .
RUN go build -o sieve sieve.go
CMD ["./sieve"]
