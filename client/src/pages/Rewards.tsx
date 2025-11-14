import { useState } from "react";
import RewardCard from "@/components/RewardCard";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Rewards() {
  const { toast } = useToast();
  const [totalStars] = useState(1250);

  const rewards = [
    {
      id: 1,
      title: "Plant a Tree",
      description: "Support reforestation projects worldwide",
      cost: 500,
      impact: "≈ 1 tree planted (est.)",
    },
    {
      id: 2,
      title: "Ocean Cleanup",
      description: "Fund ocean plastic removal initiatives",
      cost: 750,
      impact: "≈ 5 kg plastic removed (est.)",
    },
    {
      id: 3,
      title: "Solar Panel Donation",
      description: "Help install solar panels in communities",
      cost: 1000,
      impact: "≈ 0.1 kW installed (est.)",
    },
    {
      id: 4,
      title: "Eco Store Coupon",
      description: "10% off at partner eco-friendly stores",
      cost: 200,
    },
    {
      id: 5,
      title: "Carbon Offset",
      description: "Offset your carbon footprint",
      cost: 300,
      impact: "≈ 100 kg CO₂ offset (est.)",
    },
  ];

  const handleRedeem = (rewardTitle: string, cost: number) => {
    if (totalStars >= cost) {
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed: ${rewardTitle}`,
      });
    } else {
      toast({
        title: "Not enough stars",
        description: `You need ${cost - totalStars} more stars`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-rewards">
      <div className="p-4 space-y-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Rewards Store</h1>
          <p className="text-muted-foreground">
            Redeem your stars for real-world impact
          </p>
        </div>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Your Stars</span>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold font-mono">{totalStars}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              {...reward}
              onRedeem={() => handleRedeem(reward.title, reward.cost)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
