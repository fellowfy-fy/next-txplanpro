import React from "react";
import { MenuItem } from "../ui/menu-item";
import {
  Grid2x2,
  Notebook,
  Megaphone,
  ListTodo,
  Settings,
  SquarePlus,
} from "lucide-react";
import { useMenuStore } from "@/store/activeMenuItem";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const items = [
  {
    title: "Dashboard",
    icon: Grid2x2,
    path: "/dashboard",
  },
  {
    title: "All Plans",
    icon: Notebook,
    path: "/",
  },
  {
    title: "Ready to Present",
    icon: Megaphone,
    path: "/",
  },
  {
    title: "To-do Plans",
    icon: ListTodo,
    path: "/",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/",
  },
  {
    title: "Create",
    icon: SquarePlus,
    path: "/create",
  },
];

export const MenuList: React.FC<Props> = ({ className }) => {
  const { activeItem, setActiveItem } = useMenuStore();
  const router = useRouter();

  return (
    <div className={className}>
      {items.map((item) => (
        <MenuItem
          title={item.title}
          icon={item.icon}
          className=""
          menuClassName={`${activeItem === item.title ? "text-blue-500" : ""}`}
          onClick={() => {
            setActiveItem(item.title);
            router.push(item.path);
          }}
        />
      ))}
    </div>
  );
};
