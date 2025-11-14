import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: string;
  level: number;
  streak: number;
  progress: number;
  color: string;
}

export default function CategoryCard({
  title,
  icon,
  level,
  streak,
  progress,
  color,
}: CategoryCardProps) {
  return (
    <Card className="p-4 hover-elevate active-elevate-2" data-testid={`card-category-${title.toLowerCase()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <img src={icon} alt={title} className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-base">{title}</h3>
            <p className="text-sm text-muted-foreground">Level {level}</p>
          </div>
        </div>
        {streak > 0 && (
          <Badge variant="secondary" className="gap-1" data-testid={`badge-streak-${title.toLowerCase()}`}>
            <Flame className="w-3 h-3 text-orange-500" />
            <span className="font-mono">{streak}</span>
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span className="font-mono">{progress}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </Card>
  );
}
