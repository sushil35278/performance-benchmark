import subprocess
import re
import os

def run_command(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    return stdout.decode('utf-8'), stderr.decode('utf-8'), process.returncode

def main():
    benchmarks = {
        "C (Compiled)": {
            "setup": "gcc -O3 performance_test/c/sieve.c -o performance_test/c/sieve",
            "run": "./performance_test/c/sieve"
        },
        "Python": {
            "run": "python3 performance_test/python/sieve.py"
        },
        "PHP": {
            "run": "php performance_test/php/sieve.php"
        }
    }
    
    results = {}
    
    print("🚀 Starting Epic Performance Benchmark (Sieve of Eratosthenes up to 100M)")
    print("=" * 70)
    
    for lang, config in benchmarks.items():
        if "setup" in config:
            print(f"🔨 Compiling {lang}...")
            stdout, stderr, code = run_command(config["setup"])
            if code != 0:
                print(f"❌ Failed to compile {lang}: {stderr}")
                continue
            
        print(f"🏃 Running {lang} benchmark...")
        stdout, stderr, code = run_command(config["run"])
        
        if code != 0:
            print(f"❌ Failed to run {lang}: {stderr}")
            continue
            
        print(stdout.strip())
        
        # Extract time using regex
        match = re.search(r"Time taken: ([\d.]+) seconds", stdout)
        if match:
            results[lang] = float(match.group(1))
        else:
            print(f"⚠️ Could not find timing info in {lang} output")

    print("\n" + "📊 BENCHMARK RESULTS" )
    print("=" * 70)
    print(f"{'Language':<20} | {'Time (s)':<15} | {'Speed Comparison'}")
    print("-" * 70)
    
    if not results:
        print("No results to display.")
    else:
        # Sort results by time (fastest first)
        sorted_results = sorted(results.items(), key=lambda x: x[1])
        fastest_time = sorted_results[0][1]
        
        for lang, duration in sorted_results:
            ratio = duration / fastest_time
            if ratio == 1.0:
                comparison = "🚀 FASTEST"
            else:
                comparison = f"{ratio:.2f}x slower"
            print(f"{lang:<20} | {duration:<15.4f} | {comparison}")

    print("=" * 70)
    print("\n📝 NOTE: Go and Rust are not installed in this environment, but their implementation")
    print("code is provided in the performance_test/ directory for your reference.")
    print("C (Compiled) is used as a proxy for the performance you would expect from Go/Rust.")

if __name__ == "__main__":
    main()
