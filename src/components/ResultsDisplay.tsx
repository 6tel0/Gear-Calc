import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RotateCcw, RotateCw, Zap, Weight } from "lucide-react";

interface ResultsDisplayProps {
  totalRatio: number;
  outputSpeed: number;
  outputTorque: number;
  direction: "clockwise" | "counterclockwise";
  ratioBreakdown: string[];
}

export const ResultsDisplay = ({
  totalRatio,
  outputSpeed,
  outputTorque,
  direction,
  ratioBreakdown,
}: ResultsDisplayProps) => {
  return (
    <div className="space-y-4">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Final Output
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground mb-1">Speed</div>
              <div className="text-2xl font-bold text-primary">
                {outputSpeed.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">RPM</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground mb-1">Torque</div>
              <div className="text-2xl font-bold text-accent">
                {outputTorque.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">N⋅m</div>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="text-sm text-muted-foreground mb-1">Direction</div>
              <div className="flex items-center gap-2 mt-1">
                {direction === "clockwise" ? (
                  <RotateCw className="h-6 w-6 text-primary" />
                ) : (
                  <RotateCcw className="h-6 w-6 text-primary" />
                )}
                <span className="text-sm font-medium capitalize">{direction}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {ratioBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ArrowRight className="h-4 w-4 text-primary" />
              Calculation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              {ratioBreakdown.map((step, index) => (
                <div
                  key={index}
                  className="p-2 rounded bg-secondary/50 text-foreground"
                >
                  {step}
                </div>
              ))}
              <div className="p-3 rounded bg-primary/10 text-primary font-semibold border border-primary/20 mt-3">
                Total Ratio: {totalRatio.toFixed(4)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
