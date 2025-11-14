import RewardCard from "../RewardCard";

export default function RewardCardExample() {
  return (
    <div className="p-4">
      <RewardCard
        title="Plant a Tree"
        description="Support reforestation projects worldwide"
        cost={500}
        impact="≈ 1 tree planted (est.)"
        onRedeem={() => console.log("Redeem tree planting")}
      />
    </div>
  );
}
