import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";

interface QuestCardProps {
  title: string;
  description: string;
  progress: number;
  target: number;
  stars: number;
  completed?: boolean;
  onComplete?: () => void;
}

export default function QuestCard({
  title,
  description,
  progress,
  target,
  stars,
  completed = false,
  onComplete,
}: QuestCardProps) {
  const progressPercent = (progress / target) * 100;

  return (
    <Card
      className={`p-4 ${completed ? "opacity-60" : "hover-elevate"}`}
      data-testid={`card-quest-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-base mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <Badge variant="outline" className="gap-1 ml-2">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-mono">{stars}</span>
            </Badge>
          </div>
          <div className="space-y-2 mt-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span className="font-mono">
                {progress}/{target}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          {!completed && progress >= target && (
            <Button
              onClick={onComplete}
              className="w-full mt-3"
              size="sm"
              data-testid="button-complete-quest"
            >
              <Check className="w-4 h-4 mr-1" />
              Complete Quest
            </Button>
          )}
          {completed && (
            <div className="flex items-center justify-center gap-2 mt-3 text-sm text-primary font-medium">
              <Check className="w-4 h-4" />
              Completed
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
