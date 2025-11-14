import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  isCurrentUser?: boolean;
}

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardList({ entries }: LeaderboardListProps) {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return null;
  };

  return (
    <div className="space-y-2" data-testid="list-leaderboard">
      {entries.map((entry) => (
        <Card
          key={entry.rank}
          className={`p-4 ${entry.isCurrentUser ? "border-primary border-2" : ""}`}
          data-testid={`card-leaderboard-${entry.rank}`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 text-center">
              {getMedalIcon(entry.rank) || (
                <span className="font-bold font-mono text-muted-foreground">
                  {entry.rank}
                </span>
              )}
            </div>
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {entry.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold text-base">
                {entry.username}
                {entry.isCurrentUser && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    You
                  </Badge>
                )}
              </h4>
              <p className="text-sm text-muted-foreground font-mono">
                {entry.xp.toLocaleString()} XP
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
