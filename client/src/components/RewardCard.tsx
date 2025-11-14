import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TreeDeciduous } from "lucide-react";

interface RewardCardProps {
  title: string;
  description: string;
  cost: number;
  impact?: string;
  onRedeem?: () => void;
}

export default function RewardCard({
  title,
  description,
  cost,
  impact,
  onRedeem,
}: RewardCardProps) {
  return (
    <Card className="p-4 hover-elevate" data-testid={`card-reward-${title.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Badge variant="outline" className="gap-1 ml-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="font-mono">{cost}</span>
        </Badge>
      </div>
      {impact && (
        <div className="flex items-center gap-1 text-xs text-primary mb-3 bg-primary/10 rounded-md p-2">
          <TreeDeciduous className="w-3 h-3" />
          <span>{impact}</span>
        </div>
      )}
      <Button
        onClick={onRedeem}
        variant="outline"
        size="sm"
        className="w-full"
        data-testid="button-redeem-reward"
      >
        Redeem
      </Button>
    </Card>
  );
}
