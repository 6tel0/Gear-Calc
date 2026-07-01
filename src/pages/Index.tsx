import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [teethCount, setTeethCount] = useState("10");
  const [currentOffset, setCurrentOffset] = useState("0");

  const [anglePerTooth, setAnglePerTooth] = useState(0);
  const [halfAngle, setHalfAngle] = useState(0);
  const [compressorOffset, setCompressorOffset] = useState(0);

  useEffect(() => {
    const teeth = parseFloat(teethCount) || 0;
    const inputOffset = parseFloat(currentOffset) || 0;

    if (teeth === 0) {
      setAnglePerTooth(0);
      setHalfAngle(0);
      setCompressorOffset(0);
      return;
    }

    const a = 360 / teeth;
    const b = a / 2;
    const aRad = (a * Math.PI) / 180;
    const bRad = (b * Math.PI) / 180;
    const r = Math.cos(bRad) / Math.sin(aRad);
    const result = 1 - r + inputOffset;

    setAnglePerTooth(a);
    setHalfAngle(b);
    setCompressorOffset(result);
  }, [teethCount, currentOffset]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold tracking-tight mb-10">Gear calc</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teeth" className="text-xs uppercase tracking-wider text-muted-foreground">Teeth</Label>
              <Input
                id="teeth"
                type="number"
                value={teethCount}
                onChange={(e) => setTeethCount(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offset" className="text-xs uppercase tracking-wider text-muted-foreground">Current Offset</Label>
              <Input
                id="offset"
                type="number"
                step="0.1"
                value={currentOffset}
                onChange={(e) => setCurrentOffset(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-8 space-y-5 font-mono">
            <Row label="Angle per tooth" value={anglePerTooth.toFixed(4)} />
            <Row label="Half angle" value={halfAngle.toFixed(4)} />
            <Row label="Compressor offset" value={compressorOffset.toFixed(6)} highlight />
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        YouTube:{" "}
        <a
          href="https://www.youtube.com/@6tel0"
          target="_blank"
          rel="noreferrer"
          className="text-foreground hover:underline"
        >
          @6tel0
        </a>
        {" • Made by "}
        <span className="text-foreground">Inimene</span>
      </footer>
    </div>
  );
};

const Row = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center border-b border-border pb-3 last:border-0">
    <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    <span className={highlight ? "text-lg" : "text-sm"}>{value}</span>
  </div>
);

export default Index;
