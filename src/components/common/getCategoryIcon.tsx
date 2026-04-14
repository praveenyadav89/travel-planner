import {
  Utensils,
  Coffee,
  Beer,
  Pizza,
  Hotel,
  TreePine,
  ShoppingBag,
  Hospital,
  Dumbbell,
  Film,
  Music,
  Plane,
  Landmark,
  MapPin,
} from "lucide-react";

export const getCategoryIcon = (name: string): JSX.Element => {
  const n = name.toLowerCase();

  if (n.includes("restaurant") || n.includes("food"))
    return <Utensils size={16} />;
  if (n.includes("cafe") || n.includes("coffee")) return <Coffee size={16} />;
  if (n.includes("bar") || n.includes("pub")) return <Beer size={16} />;
  if (n.includes("pizza")) return <Pizza size={16} />;
  if (n.includes("hotel")) return <Hotel size={16} />;
  if (n.includes("park") || n.includes("nature")) return <TreePine size={16} />;
  if (n.includes("mall") || n.includes("shop"))
    return <ShoppingBag size={16} />;
  if (n.includes("hospital")) return <Hospital size={16} />;
  if (n.includes("gym") || n.includes("fitness")) return <Dumbbell size={16} />;
  if (n.includes("cinema") || n.includes("movie")) return <Film size={16} />;
  if (n.includes("music")) return <Music size={16} />;
  if (n.includes("airport") || n.includes("flight")) return <Plane size={16} />;
  if (n.includes("museum") || n.includes("historic"))
    return <Landmark size={16} />;

  return <MapPin size={16} />;
};
