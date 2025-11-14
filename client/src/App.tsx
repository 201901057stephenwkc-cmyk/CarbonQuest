import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider, useUser } from "@/contexts/UserContext";
import BottomNav from "@/components/BottomNav";
import Onboarding from "@/pages/Onboarding";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import Quests from "@/pages/Quests";
import Battle from "@/pages/Battle";
import Leaderboard from "@/pages/Leaderboard";
import Profile from "@/pages/Profile";

function AppContent() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    return localStorage.getItem("onboardingComplete") === "true";
  });
  const [activeTab, setActiveTab] = useState("home");
  const { user, isLoading } = useUser();

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboardingComplete", "true");
    setHasCompletedOnboarding(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (!user) {
    return <Auth onAuth={() => {}} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <Home onNavigate={setActiveTab} />;
      case "quests":
        return <Quests />;
      case "battle":
        return <Battle />;
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        return <Profile />;
      default:
        return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
