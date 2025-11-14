import OnboardingSlide from "../OnboardingSlide";
import { Globe } from "lucide-react";

export default function OnboardingSlideExample() {
  return (
    <OnboardingSlide
      title="Battle Climate Change"
      description="Join thousands of eco-warriors fighting the Carbon Ogre through daily sustainable actions"
      illustration={
        <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
          <Globe className="w-16 h-16 text-primary" />
        </div>
      }
      onNext={() => console.log("Next slide")}
      onSkip={() => console.log("Skip onboarding")}
    />
  );
}
