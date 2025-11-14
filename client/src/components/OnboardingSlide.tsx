import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OnboardingSlideProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
  onNext?: () => void;
  onSkip?: () => void;
  isLast?: boolean;
}

export default function OnboardingSlide({
  title,
  description,
  illustration,
  onNext,
  onSkip,
  isLast = false,
}: OnboardingSlideProps) {
  return (
    <div className="flex flex-col h-screen bg-background p-6" data-testid="slide-onboarding">
      <div className="flex justify-end mb-4">
        {!isLast && onSkip && (
          <Button variant="ghost" onClick={onSkip} data-testid="button-skip">
            Skip
          </Button>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-8 w-full max-w-xs">{illustration}</div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-muted-foreground text-base mb-8 max-w-sm">
          {description}
        </p>
      </div>

      <div className="space-y-3">
        <Button
          onClick={onNext}
          className="w-full"
          size="lg"
          data-testid="button-next"
        >
          {isLast ? "Get Started" : "Next"}
        </Button>
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
