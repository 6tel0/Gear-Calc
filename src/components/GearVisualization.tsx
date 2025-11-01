import { useEffect, useRef } from "react";

interface GearVisualizationProps {
  teethCount: number;
  anglePerTooth: number;
  currentOffset: number;
}

export const GearVisualization = ({ teethCount, anglePerTooth, currentOffset }: GearVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const baseRadius = 80;
    const toothHeight = 15;

    // Draw gear circle
    ctx.strokeStyle = "hsl(var(--primary))";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Draw teeth
    const teeth = Math.floor(teethCount) || 0;
    if (teeth > 0) {
      for (let i = 0; i < teeth; i++) {
        const angle = (i * anglePerTooth + currentOffset) * (Math.PI / 180);
        const toothAngle = (anglePerTooth / 2) * (Math.PI / 180);

        // Tooth outer edge
        const x1 = centerX + Math.cos(angle - toothAngle) * baseRadius;
        const y1 = centerY + Math.sin(angle - toothAngle) * baseRadius;
        const x2 = centerX + Math.cos(angle - toothAngle) * (baseRadius + toothHeight);
        const y2 = centerY + Math.sin(angle - toothAngle) * (baseRadius + toothHeight);
        const x3 = centerX + Math.cos(angle + toothAngle) * (baseRadius + toothHeight);
        const y3 = centerY + Math.sin(angle + toothAngle) * (baseRadius + toothHeight);
        const x4 = centerX + Math.cos(angle + toothAngle) * baseRadius;
        const y4 = centerY + Math.sin(angle + toothAngle) * baseRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.lineTo(x4, y4);
        ctx.closePath();
        
        // Highlight first tooth
        if (i === 0) {
          ctx.fillStyle = "hsl(var(--accent))";
          ctx.fill();
        }
        ctx.strokeStyle = "hsl(var(--primary))";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    // Draw angle indicator for first tooth
    if (teeth > 0) {
      ctx.strokeStyle = "hsl(var(--accent))";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      // Line from center to first tooth
      const firstToothAngle = currentOffset * (Math.PI / 180);
      const lineLength = baseRadius + toothHeight + 20;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(firstToothAngle) * lineLength,
        centerY + Math.sin(firstToothAngle) * lineLength
      );
      ctx.stroke();

      // Reference line (0 degrees)
      ctx.strokeStyle = "hsl(var(--muted-foreground))";
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + lineLength, centerY);
      ctx.stroke();

      ctx.setLineDash([]);
    }

    // Draw center point
    ctx.fillStyle = "hsl(var(--foreground))";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
    ctx.fill();

  }, [teethCount, anglePerTooth, currentOffset]);

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border border-border rounded-lg bg-card"
      />
      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--accent))" }} />
          <span className="text-muted-foreground">First tooth (reference)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: "hsl(var(--primary))" }} />
          <span className="text-muted-foreground">Gear body</span>
        </div>
      </div>
    </div>
  );
};
