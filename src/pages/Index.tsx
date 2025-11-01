import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GearStageInput } from "@/components/GearStageInput";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { Plus, Settings2 } from "lucide-react";
import { toast } from "sonner";

interface GearStage {
  driver: string;
  driven: string;
}

const Index = () => {
  const [inputSpeed, setInputSpeed] = useState("100");
  const [inputTorque, setInputTorque] = useState("10");
  const [gearStages, setGearStages] = useState<GearStage[]>([
    { driver: "10", driven: "20" },
  ]);
  const [compressionMultiplier, setCompressionMultiplier] = useState("1");
  
  const [totalRatio, setTotalRatio] = useState(1);
  const [outputSpeed, setOutputSpeed] = useState(0);
  const [outputTorque, setOutputTorque] = useState(0);
  const [direction, setDirection] = useState<"clockwise" | "counterclockwise">("clockwise");
  const [ratioBreakdown, setRatioBreakdown] = useState<string[]>([]);

  useEffect(() => {
    calculateGearRatio();
  }, [inputSpeed, inputTorque, gearStages, compressionMultiplier]);

  const calculateGearRatio = () => {
    try {
      const speed = parseFloat(inputSpeed) || 0;
      const torque = parseFloat(inputTorque) || 0;
      const compression = parseFloat(compressionMultiplier) || 1;

      let ratio = 1;
      const breakdown: string[] = [];
      let meshCount = 0;

      // Calculate gear ratios
      for (let i = 0; i < gearStages.length; i++) {
        const driver = parseFloat(gearStages[i].driver) || 1;
        const driven = parseFloat(gearStages[i].driven) || 1;
        
        if (driver === 0) continue;
        
        const stageRatio = driven / driver;
        ratio *= stageRatio;
        meshCount++;
        
        breakdown.push(
          `Stage ${i + 1}: G${i * 2 + 2}/G${i * 2 + 1} = ${driven}/${driver} = ${stageRatio.toFixed(4)}`
        );
      }

      // Apply compression multiplier
      if (compression !== 1) {
        ratio *= compression;
        breakdown.push(`Compression: ×${compression}`);
      }

      // Calculate output
      const finalSpeed = ratio !== 0 ? speed / ratio : 0;
      const finalTorque = torque * ratio;
      
      // Determine direction (each mesh flips direction)
      const finalDirection = meshCount % 2 === 0 ? "clockwise" : "counterclockwise";

      setTotalRatio(ratio);
      setOutputSpeed(finalSpeed);
      setOutputTorque(finalTorque);
      setDirection(finalDirection);
      setRatioBreakdown(breakdown);
    } catch (error) {
      toast.error("Calculation error. Please check your inputs.");
    }
  };

  const addGearStage = () => {
    setGearStages([...gearStages, { driver: "", driven: "" }]);
    toast.success("Gear stage added");
  };

  const removeGearStage = (index: number) => {
    const newStages = gearStages.filter((_, i) => i !== index);
    setGearStages(newStages);
    toast.success("Gear stage removed");
  };

  const updateGearStage = (index: number, field: "driver" | "driven", value: string) => {
    const newStages = [...gearStages];
    newStages[index][field] = value;
    setGearStages(newStages);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
            Plane Crazy Gear Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate gear ratios, torque, and rotational speed for your Plane Crazy builds.
            Add gear stages, compression multipliers, and see real-time results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Initial Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Input Parameters
                </CardTitle>
                <CardDescription>
                  Set the initial speed and torque values
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="input-speed">Input Speed (RPM)</Label>
                  <Input
                    id="input-speed"
                    type="number"
                    value={inputSpeed}
                    onChange={(e) => setInputSpeed(e.target.value)}
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="input-torque">Input Torque (N⋅m)</Label>
                  <Input
                    id="input-torque"
                    type="number"
                    value={inputTorque}
                    onChange={(e) => setInputTorque(e.target.value)}
                    placeholder="10"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Gear Stages */}
            <Card>
              <CardHeader>
                <CardTitle>Gear Stages</CardTitle>
                <CardDescription>
                  Configure each gear mesh in your system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {gearStages.map((stage, index) => (
                  <GearStageInput
                    key={index}
                    index={index}
                    driver={stage.driver}
                    driven={stage.driven}
                    onDriverChange={(value) => updateGearStage(index, "driver", value)}
                    onDrivenChange={(value) => updateGearStage(index, "driven", value)}
                    onRemove={() => removeGearStage(index)}
                    canRemove={gearStages.length > 1}
                  />
                ))}
                <Button
                  onClick={addGearStage}
                  variant="outline"
                  className="w-full border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Gear Stage
                </Button>
              </CardContent>
            </Card>

            {/* Compression */}
            <Card>
              <CardHeader>
                <CardTitle>Compression Multiplier</CardTitle>
                <CardDescription>
                  Enter compression factor (e.g., 2, 4, 8)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  type="number"
                  min="1"
                  step="0.1"
                  value={compressionMultiplier}
                  onChange={(e) => setCompressionMultiplier(e.target.value)}
                  placeholder="1"
                />
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <ResultsDisplay
              totalRatio={totalRatio}
              outputSpeed={outputSpeed}
              outputTorque={outputTorque}
              direction={direction}
              ratioBreakdown={ratioBreakdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
