import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  onAuth: () => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username: username || email.split("@")[0],
        }),
      });

      if (response.ok) {
        const user = await response.json();
        setUser(user);
        toast({
          title: "Welcome to CarbonQuest!",
          description: `Great to see you, ${user.username}!`,
        });
        onAuth();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuest = () => {
    const guestUser = {
      id: "guest",
      username: "Guest",
      email: "guest@example.com",
      xp: 0,
      level: 1,
      transportStreak: 0,
      foodStreak: 0,
      energyStreak: 0,
      consumptionStreak: 0,
      stars: 0,
      createdAt: new Date(),
    };
    setUser(guestUser);
    onAuth();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4" data-testid="page-auth">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">CarbonQuest</h1>
          <p className="text-muted-foreground mt-2">
            Turn eco-actions into epic quests
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="EcoWarrior"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="input-username"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              data-testid="button-submit-auth"
            >
              {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <Button variant="outline" className="w-full" data-testid="button-google-auth">
            <SiGoogle className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={handleGuest}
            data-testid="button-guest"
          >
            Continue as Guest
          </Button>
        </Card>

        <div className="text-center text-sm">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline"
            data-testid="button-toggle-auth"
          >
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
