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
    calculateAlignment();
  }, [teethCount, currentOffset]);

  const calculateAlignment = () => {
    const teeth = parseFloat(teethCount) || 0;
    const offset = parseFloat(currentOffset) || 0;

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
    const offset = 1 - r + offset;

    setAnglePerTooth(a);
    setHalfAngle(b);
    setCompressorOffset(offset);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Plane Crazy Alignment</h1>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="teeth" className="text-sm text-muted-foreground">Teeth</Label>
            <Input
              id="teeth"
              type="number"
              value={teethCount}
              onChange={(e) => setTeethCount(e.target.value)}
              className="mt-1 bg-secondary border-border text-foreground"
            />
          </div>

          <div>
            <Label htmlFor="offset" className="text-sm text-muted-foreground">Current Offset</Label>
            <Input
              id="offset"
              type="number"
              step="0.1"
              value={currentOffset}
              onChange={(e) => setCurrentOffset(e.target.value)}
              className="mt-1 bg-secondary border-border text-foreground"
            />
          </div>
        </div>

        <div className="space-y-3 text-sm font-mono">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Angle per tooth</span>
            <span>{anglePerTooth.toFixed(4)}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Half angle</span>
            <span>{halfAngle.toFixed(4)}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-muted-foreground">Compressor offset</span>
            <span>{compressorOffset.toFixed(6)}</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground pt-8">
          Made by "Inimene"
        </div>
      </div>
    </div>
  );
};

export default Index;
