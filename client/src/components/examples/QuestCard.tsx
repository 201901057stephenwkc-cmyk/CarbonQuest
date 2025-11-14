import { useState } from "react";
import QuestCard from "../QuestCard";

export default function QuestCardExample() {
  const [completed, setCompleted] = useState(false);
  return (
    <div className="p-4">
      <QuestCard
        title="Bike to Work"
        description="Use your bicycle for transportation instead of driving"
        progress={2}
        target={3}
        stars={50}
        completed={completed}
        onComplete={() => setCompleted(true)}
      />
    </div>
  );
}
