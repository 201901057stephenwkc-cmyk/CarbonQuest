import { Card } from "@/components/ui/card";
import { TreeDeciduous, Target, Flame } from "lucide-react";

interface ProfileStatsProps {
  questsCompleted: number;
  longestStreak: number;
  co2Saved: number;
}

export default function ProfileStats({
  questsCompleted,
  longestStreak,
  co2Saved,
}: ProfileStatsProps) {
  const stats = [
    {
      label: "Quests Completed",
      value: questsCompleted,
      icon: Target,
      color: "text-primary",
    },
    {
      label: "Longest Streak",
      value: `${longestStreak} days`,
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "CO₂ Saved (est.)",
      value: `${co2Saved} kg`,
      icon: TreeDeciduous,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3" data-testid="stats-profile">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-md bg-muted flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold font-mono">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
