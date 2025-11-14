import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

interface XPProgressCardProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
}

export default function XPProgressCard({
  currentXP,
  nextLevelXP,
  level,
}: XPProgressCardProps) {
  const progress = (currentXP / nextLevelXP) * 100;

  return (
    <Card className="p-6" data-testid="card-xp-progress">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Your Level</p>
          <h2 className="text-3xl font-bold font-mono text-primary">
            {level}
          </h2>
        </div>
        <Badge variant="outline" className="gap-1 text-base px-3 py-1">
          <Sparkles className="w-4 h-4" />
          <span className="font-mono">{currentXP} XP</span>
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="font-mono font-semibold">
            {currentXP}/{nextLevelXP}
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
