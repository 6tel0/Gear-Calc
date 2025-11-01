import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface GearStageInputProps {
  index: number;
  driver: string;
  driven: string;
  onDriverChange: (value: string) => void;
  onDrivenChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export const GearStageInput = ({
  index,
  driver,
  driven,
  onDriverChange,
  onDrivenChange,
  onRemove,
  canRemove,
}: GearStageInputProps) => {
  return (
    <div className="flex items-end gap-3 p-4 rounded-lg bg-secondary/50 border border-border">
      <div className="flex-1">
        <Label htmlFor={`driver-${index}`} className="text-sm text-muted-foreground">
          Driver (G{index * 2 + 1})
        </Label>
        <Input
          id={`driver-${index}`}
          type="number"
          min="1"
          value={driver}
          onChange={(e) => onDriverChange(e.target.value)}
          placeholder="Size/Teeth"
          className="mt-1"
        />
      </div>
      <div className="text-primary text-xl pb-2">→</div>
      <div className="flex-1">
        <Label htmlFor={`driven-${index}`} className="text-sm text-muted-foreground">
          Driven (G{index * 2 + 2})
        </Label>
        <Input
          id={`driven-${index}`}
          type="number"
          min="1"
          value={driven}
          onChange={(e) => onDrivenChange(e.target.value)}
          placeholder="Size/Teeth"
          className="mt-1"
        />
      </div>
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
