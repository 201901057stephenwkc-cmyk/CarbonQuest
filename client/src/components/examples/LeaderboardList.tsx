import LeaderboardList from "../LeaderboardList";

export default function LeaderboardListExample() {
  const entries = [
    { rank: 1, username: "EcoWarrior", xp: 15420 },
    { rank: 2, username: "GreenQueen", xp: 14850 },
    { rank: 3, username: "TreeHugger", xp: 13200 },
    { rank: 4, username: "You", xp: 11750, isCurrentUser: true },
    { rank: 5, username: "ClimateChamp", xp: 10900 },
  ];

  return (
    <div className="p-4">
      <LeaderboardList entries={entries} />
    </div>
  );
}
