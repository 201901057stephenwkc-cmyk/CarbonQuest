import WorldHealthBar from "../WorldHealthBar";

export default function WorldHealthBarExample() {
  return (
    <div className="p-4">
      <WorldHealthBar percentage={73} contributors={12847} />
    </div>
  );
}
