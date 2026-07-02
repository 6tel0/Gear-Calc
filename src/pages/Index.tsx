import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type Result = {
  a: number;
  b: number;
  offset: number;
};

type SavedResult = Result & {
  id: number;
  teeth: number;
  input: number;
};

const Index = () => {
  const [teethCount, setTeethCount] = useState("10");
  const [currentOffset, setCurrentOffset] = useState("0");
  const [results, setResults] = useState<Result | null>(null);
  const [saved, setSaved] = useState<SavedResult[]>([]);

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

  const saveResult = () => {
    if (!results) return;
    setSaved((s) => [
      {
        id: Date.now(),
        teeth: parseFloat(teethCount) || 0,
        input: parseFloat(currentOffset) || 0,
        ...results,
      },
      ...s,
    ]);
  };

  const remove = (id: number) => setSaved((s) => s.filter((x) => x.id !== id));
  const clearAll = () => setSaved([]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />


      <main className="flex-1 px-8 py-12 max-w-6xl mx-auto w-full relative z-10">
        <h1 className="text-4xl font-bold tracking-tight mb-10 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
          Gear Calculator
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <Label htmlFor="teeth" className="text-xs uppercase tracking-widest text-muted-foreground">
                Teeth
              </Label>
              <Input
                id="teeth"
                type="number"
                value={teethCount}
                onChange={(e) => setTeethCount(e.target.value)}
                className="bg-secondary/60 border-border h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offset" className="text-xs uppercase tracking-widest text-muted-foreground">
                Current Offset
              </Label>
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

          <div className="rounded-2xl border border-border bg-card/70 backdrop-blur p-8 shadow-2xl flex flex-col">
            {results ? (
              <>
                <div className="space-y-5 font-mono flex-1">
                  <Row label="Angle per tooth" value={results.a.toFixed(4)} />
                  <Row label="Half angle" value={results.b.toFixed(4)} />
                  <Row label="Compressor offset" value={results.offset.toFixed(6)} highlight />
                </div>
                <Button
                  onClick={saveResult}
                  variant="secondary"
                  className="mt-6 w-full"
                >
                  Save result
                </Button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                Press Calculate to see results
              </div>
            )}
          </div>
        </div>

        {/* Saved results */}
        <section className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold tracking-wide">Saved results</h2>
            {saved.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition"
              >
                Clear all
              </button>
            )}
          </div>

          {saved.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center text-sm text-muted-foreground">
              No saved results yet — press Save on a calculation.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {saved.map((s) => (
                <div
                  key={s.id}
                  className="group rounded-2xl border border-border bg-card/70 backdrop-blur p-5 shadow-lg hover:border-primary/60 transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {s.teeth} teeth · offset {s.input}
                    </div>
                    <button
                      onClick={() => remove(s.id)}
                      className="text-muted-foreground hover:text-destructive transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="font-mono text-sm space-y-1.5">
                    <MiniRow label="Angle" value={s.a.toFixed(4)} />
                    <MiniRow label="Half" value={s.b.toFixed(4)} />
                    <div className="pt-2 mt-2 border-t border-border">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        Compressor offset
                      </div>
                      <div className="text-primary text-lg font-semibold">
                        {s.offset.toFixed(6)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="relative border-t border-border py-6 z-10">
        <div className="text-center text-sm text-muted-foreground">
          Discord: <span className="text-foreground font-semibold">6tel</span>
          <span className="mx-2">•</span>
          YouTube:{" "}
          <a
            href="https://www.youtube.com/@6tel0"
            target="_blank"
            rel="noreferrer"
            className="text-foreground font-semibold underline underline-offset-4"
          >
            @6tel0
          </a>
        </div>
        <div className="text-center text-xs tracking-[0.3em] text-muted-foreground mt-2">
          MADE BY INIMENE
        </div>
      </footer>
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center border-b border-border pb-3 last:border-0">
    <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
    <span className={highlight ? "text-xl font-semibold text-primary" : "text-sm"}>{value}</span>
  </div>
);

const MiniRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span>{value}</span>
  </div>
);

export default Index;
