import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LeaderboardList from "@/components/LeaderboardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import type { User } from "@shared/schema";

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("global");
  const { user } = useUser();

  const { data: globalUsers = [] } = useQuery<User[]>({
    queryKey: ["/api/leaderboard"],
  });

  const globalEntries = globalUsers.map((u, index) => ({
    rank: index + 1,
    username: u.username,
    xp: u.xp,
    isCurrentUser: u.id === user?.id,
  }));

  const friendsEntries = globalEntries.slice(0, 4);
  const campusEntries = globalEntries.slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-leaderboard">
      <div className="p-4 space-y-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Leaderboards</h1>
          <p className="text-muted-foreground">See how you rank against others</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="global" data-testid="tab-global">Global</TabsTrigger>
            <TabsTrigger value="friends" data-testid="tab-friends">Friends</TabsTrigger>
            <TabsTrigger value="campus" data-testid="tab-campus">Campus</TabsTrigger>
          </TabsList>
          <TabsContent value="global" className="mt-4">
            <LeaderboardList entries={globalEntries} />
          </TabsContent>
          <TabsContent value="friends" className="mt-4">
            <LeaderboardList entries={friendsEntries} />
          </TabsContent>
          <TabsContent value="campus" className="mt-4">
            <LeaderboardList entries={campusEntries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
