import { useQuery } from "@tanstack/react-query";
import XPProgressCard from "@/components/XPProgressCard";
import WorldHealthBar from "@/components/WorldHealthBar";
import CategoryCard from "@/components/CategoryCard";
import { Button } from "@/components/ui/button";
import { Target, Swords } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import transportIcon from "@assets/generated_images/Transport_category_bike_icon_f386ff58.png";
import foodIcon from "@assets/generated_images/Food_category_leaf_icon_2c3a740b.png";
import energyIcon from "@assets/generated_images/Energy_category_lightbulb_icon_5bf75b21.png";
import consumptionIcon from "@assets/generated_images/Consumption_category_bag_icon_0f0d4211.png";

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { user } = useUser();

  const { data: bossData } = useQuery<{
    id: string;
    currentHp: number;
    maxHp: number;
    worldHealth: number;
    totalDamage: number;
  }>({
    queryKey: ["/api/boss"],
  });

  const categories = [
    {
      title: "Transport",
      icon: transportIcon,
      level: Math.floor((user?.transportStreak || 0) / 7) + 1,
      streak: user?.transportStreak || 0,
      progress: ((user?.transportStreak || 0) % 7) * 14,
      color: "#3b82f6",
    },
    {
      title: "Food",
      icon: foodIcon,
      level: Math.floor((user?.foodStreak || 0) / 7) + 1,
      streak: user?.foodStreak || 0,
      progress: ((user?.foodStreak || 0) % 7) * 14,
      color: "#10b981",
    },
    {
      title: "Energy",
      icon: energyIcon,
      level: Math.floor((user?.energyStreak || 0) / 7) + 1,
      streak: user?.energyStreak || 0,
      progress: ((user?.energyStreak || 0) % 7) * 14,
      color: "#f59e0b",
    },
    {
      title: "Consumption",
      icon: consumptionIcon,
      level: Math.floor((user?.consumptionStreak || 0) / 7) + 1,
      streak: user?.consumptionStreak || 0,
      progress: ((user?.consumptionStreak || 0) % 7) * 14,
      color: "#8b5cf6",
    },
  ];

  const currentXP = (user?.xp || 0) % 1000;
  const nextLevelXP = 1000;

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-home">
      <div className="p-4 space-y-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Welcome back, {user?.username || "Hero"}!</h1>
          <p className="text-muted-foreground">Ready to save the planet?</p>
        </div>

        <XPProgressCard
          currentXP={currentXP}
          nextLevelXP={nextLevelXP}
          level={user?.level || 1}
        />

        {bossData && (
          <WorldHealthBar
            percentage={bossData.worldHealth || 0}
            contributors={1284}
          />
        )}

        <div className="flex gap-2">
          <Button
            onClick={() => onNavigate("quests")}
            className="flex-1"
            data-testid="button-view-quests"
          >
            <Target className="w-4 h-4 mr-2" />
            Active Quests
          </Button>
          <Button
            onClick={() => onNavigate("battle")}
            variant="outline"
            className="flex-1"
            data-testid="button-view-battle"
          >
            <Swords className="w-4 h-4 mr-2" />
            Battle
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Your Categories</h2>
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
