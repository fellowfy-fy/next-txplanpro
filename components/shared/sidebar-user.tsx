import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export function SidebarUser() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col sm:flex-row justify-center items-center gap-3 cursor-pointer pt-5"
      onClick={() => router.push("/user-profile")}
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <p>Dr. John Doe</p>
    </div>
  );
}