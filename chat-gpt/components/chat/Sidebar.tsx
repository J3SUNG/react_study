import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { Logo } from "./Logo";
import { MessageSquare, Plus } from "lucide-react";
import { SidebarItem } from "./SideBarItem";
import { LogoutButton } from "./LogoutButton";

const DUMMY_ITEMS = [
  {
    id: "new",
    label: "새로운 채팅",
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: "1",
    label: "새로운 긴 대화 예시입니다. 가나다라마바사아자차카타파하",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: "2",
    label: "일반 대화 예시",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/2`,
  },
];

export function Sidebar() {
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      <div className="flex-1 overflow-y-auto">
        <Logo />
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_ITEMS.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}