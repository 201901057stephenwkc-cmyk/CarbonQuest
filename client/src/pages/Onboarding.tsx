import { useState } from "react";
import OnboardingSlide from "@/components/OnboardingSlide";
import { Globe, Target, Users } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Battle Climate Change",
      description:
        "Join thousands of eco-warriors fighting the Carbon Ogre through daily sustainable actions",
      illustration: (
        <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Globe className="w-16 h-16 text-primary" />
        </div>
      ),
    },
    {
      title: "Complete Daily Quests",
      description:
        "Turn eco-friendly habits into rewarding quests. Earn XP, level up, and unlock achievements",
      illustration: (
        <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Target className="w-16 h-16 text-primary" />
        </div>
      ),
    },
    {
      title: "Compete & Collaborate",
      description:
        "Join forces with friends and your campus community to defeat bosses and climb leaderboards",
      illustration: (
        <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Users className="w-16 h-16 text-primary" />
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <OnboardingSlide
      {...slides[currentSlide]}
      onNext={handleNext}
      onSkip={onComplete}
      isLast={currentSlide === slides.length - 1}
    />
  );
}
