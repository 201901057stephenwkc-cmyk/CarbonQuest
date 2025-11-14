import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Users } from "lucide-react";
import carbonOgreHealthy from "@assets/generated_images/Carbon_Ogre_full_health_standing_552ad7e0.png";
import carbonOgreDamaged from "@assets/generated_images/Carbon_Ogre_medium_health_damaged_c0dd88be.png";
import carbonOgreDefeated from "@assets/generated_images/Carbon_Ogre_low_health_defeated_db57af33.png";

interface BossVisualizationProps {
  bossHP: number;
  maxHP: number;
  communityDamage: number;
  yourDamage: number;
}

export default function BossVisualization({
  bossHP,
  maxHP,
  communityDamage,
  yourDamage,
}: BossVisualizationProps) {
  const hpPercent = (bossHP / maxHP) * 100;
  const [isShaking, setIsShaking] = useState(false);
  const [prevHP, setPrevHP] = useState(bossHP);
  const [showDamageNumber, setShowDamageNumber] = useState(false);
  const [damageAmount, setDamageAmount] = useState(0);

  useEffect(() => {
    if (bossHP < prevHP) {
      const damage = prevHP - bossHP;
      setDamageAmount(damage);
      setIsShaking(true);
      setShowDamageNumber(true);
      
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setShowDamageNumber(false), 1000);
    }
    setPrevHP(bossHP);
  }, [bossHP, prevHP]);

  const getOgreState = () => {
    if (hpPercent > 60) {
      return {
        image: carbonOgreHealthy,
        status: "Full Strength",
        color: "text-primary",
        animation: "animate-idle-bounce",
      };
    } else if (hpPercent > 30) {
      return {
        image: carbonOgreDamaged,
        status: "Taking Damage",
        color: "text-orange-500",
        animation: "",
      };
    } else if (hpPercent > 0) {
      return {
        image: carbonOgreDefeated,
        status: "Critically Weak!",
        color: "text-destructive",
        animation: "animate-defeat-sway",
      };
    } else {
      return {
        image: carbonOgreDefeated,
        status: "Defeated!",
        color: "text-muted-foreground",
        animation: "opacity-40",
      };
    }
  };

  const ogreState = getOgreState();

  return (
    <Card className="p-6 overflow-visible relative" data-testid="card-boss-visualization">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-1">Carbon Ogre</h2>
        <p className={`text-sm font-medium ${ogreState.color}`}>
          {ogreState.status}
        </p>
      </div>

      <div className="relative mb-6">
        {showDamageNumber && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
            <span className="text-2xl font-bold text-destructive animate-damage-number">
              -{damageAmount}
            </span>
          </div>
        )}
        
        <div
          className={`w-48 h-48 mx-auto transition-all duration-500 ${
            isShaking ? "animate-shake" : ""
          } ${ogreState.animation}`}
        >
          <img
            src={ogreState.image}
            alt="Carbon Ogre"
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {hpPercent <= 30 && hpPercent > 0 && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <Badge variant="destructive" className="animate-pulse">
              CRITICAL
            </Badge>
          </div>
        )}

        {bossHP === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-victory">💫</div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Boss HP</span>
            <span className={`font-mono font-bold ${hpPercent <= 30 ? "text-destructive animate-pulse" : "text-destructive"}`}>
              {bossHP.toLocaleString()}/{maxHP.toLocaleString()}
            </span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden relative">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                hpPercent > 60
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : hpPercent > 30
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                  : "bg-gradient-to-r from-red-600 to-red-400"
              }`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Swords className="w-3 h-3" />
              Your Damage
            </div>
            <p className="text-xl font-bold font-mono text-primary">
              {yourDamage.toLocaleString()}
            </p>
          </div>
          <div className="bg-muted/50 rounded-md p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Users className="w-3 h-3" />
              Community
            </div>
            <p className="text-xl font-bold font-mono">
              {communityDamage.toLocaleString()}
            </p>
          </div>
        </div>

        <Badge variant="outline" className="w-full justify-center py-2">
          {bossHP > 0 ? "Complete quests to damage the boss!" : "Victory! Boss Defeated! 🎉"}
        </Badge>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px) rotate(-2deg); }
          20%, 40%, 60%, 80% { transform: translateX(6px) rotate(2deg); }
        }
        
        @keyframes idle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes defeat-sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          50% { transform: translateX(2px) rotate(1deg); }
        }
        
        @keyframes damage-number {
          0% { 
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
          100% { 
            transform: translateY(-40px) scale(0.8);
            opacity: 0;
          }
        }
        
        @keyframes victory {
          0% { 
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% { 
            transform: scale(1.3) rotate(180deg);
            opacity: 1;
          }
          100% { 
            transform: scale(1) rotate(360deg);
            opacity: 1;
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-idle-bounce {
          animation: idle-bounce 2s ease-in-out infinite;
        }
        
        .animate-defeat-sway {
          animation: defeat-sway 3s ease-in-out infinite;
        }
        
        .animate-damage-number {
          animation: damage-number 1s ease-out forwards;
        }
        
        .animate-victory {
          animation: victory 0.8s ease-out forwards;
        }
      `}</style>
    </Card>
  );
}
