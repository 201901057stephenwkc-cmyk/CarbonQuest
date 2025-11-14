import { useState } from "react";
import BossVisualization from "../BossVisualization";
import { Button } from "@/components/ui/button";

export default function BossVisualizationExample() {
  const [bossHP, setBossHP] = useState(8000);
  const maxHP = 10000;

  const dealDamage = (amount: number) => {
    setBossHP((prev) => Math.max(0, prev - amount));
  };

  const setHPLevel = (percent: number) => {
    setBossHP(Math.floor(maxHP * (percent / 100)));
  };

  return (
    <div className="p-4 space-y-4">
      <BossVisualization
        bossHP={bossHP}
        maxHP={maxHP}
        communityDamage={maxHP - bossHP}
        yourDamage={Math.floor((maxHP - bossHP) * 0.15)}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={() => dealDamage(500)} size="sm" data-testid="button-attack-light">
          Attack (-500)
        </Button>
        <Button onClick={() => dealDamage(1500)} size="sm" variant="destructive" data-testid="button-attack-heavy">
          Heavy (-1500)
        </Button>
        <Button onClick={() => setHPLevel(80)} size="sm" variant="outline" data-testid="button-hp-high">
          High HP (80%)
        </Button>
        <Button onClick={() => setHPLevel(45)} size="sm" variant="outline" data-testid="button-hp-medium">
          Mid HP (45%)
        </Button>
        <Button onClick={() => setHPLevel(15)} size="sm" variant="outline" data-testid="button-hp-low">
          Low HP (15%)
        </Button>
        <Button onClick={() => setBossHP(maxHP)} size="sm" variant="outline" data-testid="button-reset">
          Reset Full
        </Button>
      </div>
    </div>
  );
}
