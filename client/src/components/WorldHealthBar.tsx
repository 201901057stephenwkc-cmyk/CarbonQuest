import { Card } from "@/components/ui/card";
import { Globe, Users } from "lucide-react";

interface WorldHealthBarProps {
  percentage: number;
  contributors: number;
}

export default function WorldHealthBar({
  percentage,
  contributors,
}: WorldHealthBarProps) {
  return (
    <Card className="p-4" data-testid="card-world-health">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">World Health</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="w-3 h-3" />
            {contributors.toLocaleString()} contributors
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-mono text-primary">{percentage}%</p>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Card>
  );
}
