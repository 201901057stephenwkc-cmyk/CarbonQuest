import XPProgressCard from "../XPProgressCard";

export default function XPProgressCardExample() {
  return (
    <div className="p-4">
      <XPProgressCard currentXP={650} nextLevelXP={1000} level={5} />
    </div>
  );
}
