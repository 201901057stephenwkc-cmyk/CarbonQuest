import { useQuery } from "@tanstack/react-query";
import BossVisualization from "@/components/BossVisualization";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function Battle() {
  const { user } = useUser();

  const { data: bossData } = useQuery<{
    id: string;
    currentHp: number;
    maxHp: number;
    worldHealth: number;
    totalDamage: number;
  }>({
    queryKey: ["/api/boss"],
    refetchInterval: 3000,
  });

  const { data: userContribution } = useQuery<{ damage: number }>({
    queryKey: ["/api/boss", bossData?.id, "contributions", user?.id],
    enabled: !!bossData?.id && !!user?.id,
  });

  if (!bossData) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Loading boss battle...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-battle">
      <div className="p-4 space-y-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Boss Battle</h1>
          <p className="text-muted-foreground">Fight the Carbon Ogre with your community</p>
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Battle Active</span>
            </div>
            <Badge variant="outline" className="font-mono">Ongoing</Badge>
          </div>
        </Card>

        <BossVisualization
          bossHP={bossData.currentHp}
          maxHP={bossData.maxHp}
          communityDamage={bossData.totalDamage}
          yourDamage={userContribution?.damage || 0}
        />

        <Card className="p-4 bg-primary/5">
          <h3 className="font-semibold mb-2 text-sm">💡 How to Deal Damage</h3>
          <p className="text-sm text-muted-foreground">
            Complete quests in the Quests tab to automatically damage the boss! Each quest
            you complete contributes to defeating the Carbon Ogre.
          </p>
        </Card>
      </div>
    </div>
  );
}
