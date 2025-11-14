import ProfileStats from "../ProfileStats";

export default function ProfileStatsExample() {
  return (
    <div className="p-4">
      <ProfileStats questsCompleted={47} longestStreak={14} co2Saved={235} />
    </div>
  );
}
