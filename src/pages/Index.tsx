import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [teethCount, setTeethCount] = useState("10");
  const [currentOffset, setCurrentOffset] = useState("0");

  const [results, setResults] = useState<{
    a: number;
    b: number;
    offset: number;
  } | null>(null);

  const calculate = () => {
    const teeth = parseFloat(teethCount) || 0;
    const inputOffset = parseFloat(currentOffset) || 0;

    if (teeth === 0) {
      setResults({ a: 0, b: 0, offset: 0 });
      return;
    }

    const a = 360 / teeth;
    const b = a / 2;
    const aRad = (a * Math.PI) / 180;
    const bRad = (b * Math.PI) / 180;
    const r = Math.cos(bRad) / Math.sin(aRad);
    const offset = 1 - r + inputOffset;

    setResults({ a, b, offset });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* subtle glow accents */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />

      <main className="flex-1 px-8 py-12 max-w-5xl mx-auto w-full relative z-10">
        <h1 className="text-4xl font-bold tracking-tight mb-10">Gear calc</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <Label htmlFor="teeth" className="text-xs uppercase tracking-widest text-muted-foreground">Teeth</Label>
              <Input
                id="teeth"
                type="number"
                value={teethCount}
                onChange={(e) => setTeethCount(e.target.value)}
                className="bg-secondary/60 border-border h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offset" className="text-xs uppercase tracking-widest text-muted-foreground">Current Offset</Label>
              <Input
                id="offset"
                type="number"
                step="0.1"
                value={currentOffset}
                onChange={(e) => setCurrentOffset(e.target.value)}
                className="bg-secondary/60 border-border h-11"
              />
            </div>

            <Button onClick={calculate} className="w-full h-11 font-semibold">
              Calculate
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 shadow-2xl">
            {results ? (
              <div className="space-y-5 font-mono">
                <Row label="Angle per tooth" value={results.a.toFixed(4)} />
                <Row label="Half angle" value={results.b.toFixed(4)} />
                <Row label="Compressor offset" value={results.offset.toFixed(6)} highlight />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                Press Calculate to see results
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative border-t border-border py-6 px-6">
        <div className="absolute left-6 bottom-6 text-xs text-muted-foreground">
          Solution made by Vlad
        </div>
        <div className="text-center text-sm text-muted-foreground">
          Discord: <span className="text-foreground">6tel</span>
          <span className="mx-2">•</span>
          YouTube:{" "}
          <a
            href="https://www.youtube.com/@6tel0"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:underline"
          >
            @6tel0
          </a>
        </div>
      </footer>
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center border-b border-border pb-3 last:border-0">
    <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className={highlight ? "text-xl font-semibold" : "text-sm"}>{value}</span>
  </div>
);

export default Index;
