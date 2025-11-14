import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ProfileStats from "@/components/ProfileStats";
import { Badge } from "@/components/ui/badge";
import { Share2, UserPlus, Settings } from "lucide-react";
import { SiInstagram, SiDiscord } from "react-icons/si";
import { useUser } from "@/contexts/UserContext";
import { useQuery } from "@tanstack/react-query";
import type { UserQuestProgress } from "@shared/schema";

export default function Profile() {
  const { user } = useUser();

  const { data: progress = [] } = useQuery<UserQuestProgress[]>({
    queryKey: ["/api/quests", user?.id, "progress"],
    enabled: !!user?.id,
  });

  const questsCompleted = progress.filter((p) => p.completed).length;
  const longestStreak = Math.max(
    user?.transportStreak || 0,
    user?.foodStreak || 0,
    user?.energyStreak || 0,
    user?.consumptionStreak || 0
  );
  const co2Saved = questsCompleted * 5;

  const initials = user?.username?.slice(0, 2).toUpperCase() || "EC";

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-profile">
      <div className="p-4 space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold">{user?.username || "Guest"}</h2>
              <p className="text-sm text-muted-foreground">
                Level {user?.level || 1} Eco Warrior
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  ⭐ {user?.stars || 0} stars
                </Badge>
                <Badge variant="outline">
                  {user?.xp || 0} XP
                </Badge>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full" data-testid="button-settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-3">Your Stats</h3>
          <ProfileStats
            questsCompleted={questsCompleted}
            longestStreak={longestStreak}
            co2Saved={co2Saved}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Share & Invite</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" data-testid="button-share-instagram">
              <SiInstagram className="w-4 h-4 mr-2" />
              Share to Instagram
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-join-discord">
              <SiDiscord className="w-4 h-4 mr-2" />
              Join Discord Community
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-invite-friends">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Friends
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-share-progress">
              <Share2 className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </div>

        <Card className="p-4">
          <h4 className="font-semibold mb-2">Achievement Badges</h4>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`aspect-square rounded-md ${
                  i <= Math.min(3, Math.floor((user?.level || 1) / 2)) ? "bg-primary/20" : "bg-muted/50"
                } flex items-center justify-center`}
              >
                <span className="text-2xl">{i <= Math.min(3, Math.floor((user?.level || 1) / 2)) ? "🏆" : "🔒"}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
