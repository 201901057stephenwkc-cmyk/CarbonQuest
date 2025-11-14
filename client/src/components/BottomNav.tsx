import { Home, Target, Swords, Trophy, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "quests", label: "Quests", icon: Target },
    { id: "battle", label: "Battle", icon: Swords },
    { id: "leaderboard", label: "Ranks", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border safe-area-inset-bottom z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              data-testid={`button-nav-${tab.id}`}
              className={`flex flex-col items-center justify-center min-w-12 h-12 px-2 rounded-md transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover-elevate"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-2"}`} />
              <span className="text-xs mt-0.5 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
