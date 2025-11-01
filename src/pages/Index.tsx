import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Calculator } from "lucide-react";

const Index = () => {
  const [teethCount, setTeethCount] = useState("20");
  const [currentOffset, setCurrentOffset] = useState("0");
  
  const [anglePerTooth, setAnglePerTooth] = useState(0);
  const [halfAngle, setHalfAngle] = useState(0);
  const [gearRadius, setGearRadius] = useState(0);
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
      setGearRadius(0);
      setCompressorOffset(0);
      return;
    }

    // Angle per tooth = 360° / number of teeth
    const anglePerToothCalc = 360 / teeth;
    
    // Half angle = angle per tooth / 2
    const halfAngleCalc = anglePerToothCalc / 2;
    
    // Convert to radians for trigonometry
    const aRad = (anglePerToothCalc * Math.PI) / 180;
    const bRad = (halfAngleCalc * Math.PI) / 180;
    
    // Gear radius using trigonometry: r = cos(b) / sin(a)
    const gearRadiusCalc = Math.cos(bRad) / Math.sin(aRad);
    
    // Compressor offset: Offset = 1 - r + current offset
    const compressorOffsetCalc = 1 - gearRadiusCalc + offset;

    setAnglePerTooth(anglePerToothCalc);
    setHalfAngle(halfAngleCalc);
    setGearRadius(gearRadiusCalc);
    setCompressorOffset(compressorOffsetCalc);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Plane Crazy Gear Alignment
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate gear alignment parameters including angle per tooth, gear radius, and compressor offset for perfect gear meshing in Plane Crazy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Gear Parameters
              </CardTitle>
              <CardDescription>
                Enter your gear specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="teeth-count">Number of Teeth</Label>
                <Input
                  id="teeth-count"
                  type="number"
                  min="1"
                  value={teethCount}
                  onChange={(e) => setTeethCount(e.target.value)}
                  placeholder="20"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Total teeth on the gear
                </p>
              </div>
              <div>
                <Label htmlFor="current-offset">Current Offset (degrees)</Label>
                <Input
                  id="current-offset"
                  type="number"
                  step="0.1"
                  value={currentOffset}
                  onChange={(e) => setCurrentOffset(e.target.value)}
                  placeholder="0"
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Current misalignment angle (optional)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculated Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Angle Per Tooth</div>
                <div className="text-2xl font-bold text-primary">
                  {anglePerTooth.toFixed(2)}°
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Rotation angle for each tooth
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Half Angle</div>
                <div className="text-2xl font-bold text-accent">
                  {halfAngle.toFixed(2)}°
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Half of the angle per tooth
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-sm text-muted-foreground mb-1">Compressor Offset</div>
                <div className="text-2xl font-bold text-accent">
                  {compressorOffset.toFixed(6)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Required compressor adjustment
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Explanation Card */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div>
              <span className="font-semibold text-foreground">Angle Per Tooth:</span> Calculated as 360° divided by the number of teeth (a = 360 / n).
            </div>
            <div>
              <span className="font-semibold text-foreground">Half Angle:</span> Half of the angle per tooth (b = a / 2).
            </div>
            <div>
              <span className="font-semibold text-foreground">Compressor Offset:</span> The adjustment needed via compressors, calculated using trigonometry: r = cos(b) / sin(a), then Offset = 1 - r + current offset.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
