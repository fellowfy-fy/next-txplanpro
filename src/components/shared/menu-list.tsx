import React from "react";
import { MenuItem } from "../ui/menu-item";
import {
  // Grid2x2,
  // Notebook,
  // Megaphone,
  // ListTodo,
  Settings,
  SquarePlus,
  User,
  // CircleHelp,
  UserRoundPen,
} from "lucide-react";
import { useMenuStore } from "@/store/activeMenuItem";
// import { SidebarUser } from "./sidebar-user";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const items = [
  // {
  //   title: "Dashboard",
  //   icon: Grid2x2,
  //   path: "/dashboard",
  // },
  // {
  //   title: "All Plans",
  //   icon: Notebook,
  //   path: "/all-plans",
  // },
  // {
  //   title: "Ready to Present",
  //   icon: Megaphone,
  //   path: "/ready-to-present",
  // },
  // {
  //   title: "To-do Plans",
  //   icon: ListTodo,
  //   path: "/todo-plans",
  // },
  {
    title: "Create",
    icon: SquarePlus,
    path: "/dashboard/create-plan",
  },
  {
    title: "Patients",
    icon: User,
    path: "/dashboard/patients",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
  {
    title: "Profile",
    icon: UserRoundPen,
    path: "/dashboard/profile",
  },
  //   {
  //   title: "Support",
  //   icon: CircleHelp,
  //   path: "/support",
  // },
];

export const MenuList: React.FC<Props> = ({ className }) => {
  const { activeItem, setActiveItem } = useMenuStore();
  const router = useRouter();

  return (
    <div className={className}>
      {items.map((item) => (
        <MenuItem
          key={item.title}
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
      {/* <SidebarUser /> */}
    </div>
  );
};