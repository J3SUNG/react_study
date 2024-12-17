import { Sidebar } from "@/components/chat/Sidebar";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex h-full">
      <div className="hidden md:block w-[300px]">
        <Sidebar />
      </div>
      <div>{children}</div>
    </div>
  );
}
