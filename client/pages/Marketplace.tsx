import PlaceholderPage from "./PlaceholderPage";
import { Store } from "lucide-react";

export default function Marketplace() {
  return (
    <PlaceholderPage
      title="Marketplace"
      description="Browse suppliers and their fresh products"
      icon={<Store className="h-12 w-12 text-supplier" />}
    />
  );
}
