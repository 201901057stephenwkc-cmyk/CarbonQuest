import CategoryCard from "../CategoryCard";
import transportIcon from "@assets/generated_images/Transport_category_bike_icon_f386ff58.png";

export default function CategoryCardExample() {
  return (
    <div className="p-4">
      <CategoryCard
        title="Transport"
        icon={transportIcon}
        level={3}
        streak={5}
        progress={65}
        color="#3b82f6"
      />
    </div>
  );
}
