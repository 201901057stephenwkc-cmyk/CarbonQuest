import { useQuery, useMutation } from "@tanstack/react-query";
import QuestCard from "@/components/QuestCard";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Quest, UserQuestProgress } from "@shared/schema";

export default function Quests() {
  const { toast } = useToast();
  const { user, setUser } = useUser();

  const { data: quests = [] } = useQuery<Quest[]>({
    queryKey: ["/api/quests"],
  });

  const { data: progress = [] } = useQuery<UserQuestProgress[]>({
    queryKey: ["/api/quests", user?.id, "progress"],
    enabled: !!user?.id,
  });

  const completeMutation = useMutation({
    mutationFn: async (questId: string) => {
      const response = await apiRequest(`/api/quests/${questId}/complete`, {
        method: "POST",
        body: JSON.stringify({ userId: user?.id }),
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
    onSuccess: async (data: { starsGained: number; xpGained: number }, questId) => {
      const quest = quests.find((q) => q.id === questId);
      if (quest) {
        toast({
          title: "Quest Completed! 🎉",
          description: `You earned ${data.starsGained} stars and ${data.xpGained} XP!`,
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["/api/quests"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/boss"] });
      
      if (user) {
        const updatedUser = await fetch(`/api/users/${user.id}`).then((r) => r.json());
        setUser(updatedUser);
      }
    },
  });

  const getQuestProgress = (questId: string) => {
    return progress.find((p) => p.questId === questId);
  };

  const handleCompleteQuest = (questId: string) => {
    const questProgress = getQuestProgress(questId);
    const quest = quests.find((q) => q.id === questId);
    
    if (quest && questProgress && questProgress.progress >= quest.target) {
      completeMutation.mutate(questId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-quests">
      <div className="p-4 space-y-4">
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Daily Quests</h1>
          <p className="text-muted-foreground">Complete quests to earn XP and stars</p>
        </div>

        <div className="space-y-3">
          {quests.map((quest) => {
            const questProgress = getQuestProgress(quest.id);
            const currentProgress = questProgress?.progress || 0;
            const isCompleted = questProgress?.completed || false;

            return (
              <QuestCard
                key={quest.id}
                title={quest.title}
                description={quest.description}
                progress={currentProgress}
                target={quest.target}
                stars={quest.stars}
                completed={isCompleted}
                onComplete={() => handleCompleteQuest(quest.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
