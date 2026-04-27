"use client";

import { useState } from "react";
import { Play, RotateCcw, Zap, Timer, Trophy } from "lucide-react";

type Result = {
  language: string;
  time: number;
  count: number;
  limit: number;
  status: "idle" | "running" | "completed" | "error";
};

const initialLanguages = [
  { name: "Go", endpoint: "/api/go", color: "bg-cyan-500" },
  { name: "Rust", endpoint: "/api/rust", color: "bg-orange-600" },
  { name: "Python", endpoint: "/api/python", color: "bg-blue-500" },
  { name: "PHP", endpoint: "/api/php", color: "bg-indigo-500" },
];

export default function Home() {
  const [results, setResults] = useState<Record<string, Result>>(
    Object.fromEntries(
      initialLanguages.map((l) => [
        l.name,
        { language: l.name, time: 0, count: 0, limit: 10000000, status: "idle" },
      ])
    )
  );
  const [isRacing, setIsRacing] = useState(false);

  const runBenchmark = async (lang: typeof initialLanguages[0]) => {
    setResults((prev) => ({
      ...prev,
      [lang.name]: { ...prev[lang.name], status: "running" },
    }));

    try {
      const start = Date.now();
      const res = await fetch(lang.endpoint);
      const data = await res.json();
      
      setResults((prev) => ({
        ...prev,
        [lang.name]: { ...data, status: "completed" },
      }));
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [lang.name]: { ...prev[lang.name], status: "error" },
      }));
    }
  };

  const startRace = async () => {
    setIsRacing(true);
    // Reset results
    setResults(
      Object.fromEntries(
        initialLanguages.map((l) => [
          l.name,
          { language: l.name, time: 0, count: 0, limit: 10000000, status: "idle" },
        ])
      )
    );

    // Run all benchmarks in parallel
    await Promise.all(initialLanguages.map((lang) => runBenchmark(lang)));
    setIsRacing(false);
  };

  const sortedResults = Object.values(results)
    .filter((r) => r.status === "completed")
    .sort((a, b) => a.time - b.time);

  const fastestTime = sortedResults[0]?.time || 1;

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-black mb-4 tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
          EPIC SPEED RACE
        </h1>
        <p className="text-slate-400 text-lg">
          Sieve of Eratosthenes (10,000,000 Primes) Benchmark
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <button
          onClick={startRace}
          disabled={isRacing}
          className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold text-xl transition-all ${
            isRacing
              ? "bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-white text-black hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          }`}
        >
          {isRacing ? (
            <>
              <RotateCcw className="animate-spin" /> Racing...
            </>
          ) : (
            <>
              <Play fill="black" /> Start the Race!
            </>
          )}
        </button>
      </div>

      <div className="space-y-6 mb-16">
        {initialLanguages.map((lang) => {
          const result = results[lang.name];
          const isCompleted = result.status === "completed";
          const isRunning = result.status === "running";
          
          // Calculate progress for the race track
          // If completed, position is based on relative speed
          // If running, just animate it
          const progress = isCompleted 
            ? Math.max(10, (fastestTime / result.time) * 100)
            : isRunning ? 40 : 0;

          return (
            <div key={lang.name} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${lang.color}`} />
                  <span className="font-bold text-xl">{lang.name}</span>
                </div>
                {isCompleted && (
                  <div className="text-right">
                    <span className="text-slate-400 text-sm block">Time Taken</span>
                    <span className="font-mono text-2xl text-cyan-400">{result.time.toFixed(4)}s</span>
                  </div>
                )}
              </div>
              
              <div className="h-12 bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden relative">
                <div 
                  className={`absolute top-0 left-0 h-full ${lang.color} transition-all duration-1000 ease-out flex items-center justify-end px-4 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
                  style={{ width: `${isCompleted ? progress : isRunning ? '100%' : '0%'}` }}
                >
                  {isRunning && <Zap className="animate-pulse text-white" />}
                  {isCompleted && result.time === fastestTime && <Trophy className="text-white" />}
                </div>
                
                {isRunning && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {sortedResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Trophy size={20} />
              <span className="font-semibold uppercase tracking-wider text-sm">Winner</span>
            </div>
            <div className="text-3xl font-black text-white">
              {sortedResults[0].language}
            </div>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Timer size={20} />
              <span className="font-semibold uppercase tracking-wider text-sm">Fastest Time</span>
            </div>
            <div className="text-3xl font-black text-cyan-400 font-mono">
              {sortedResults[0].time.toFixed(4)}s
            </div>
          </div>

          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Zap size={20} />
              <span className="font-semibold uppercase tracking-wider text-sm">Slowest</span>
            </div>
            <div className="text-3xl font-black text-orange-500">
              {sortedResults[sortedResults.length - 1].language}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
