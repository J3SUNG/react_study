import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  name?: string;
  content?: string;
  role: string;
};

export function Message({ name = "User", content = "", role }: Props) {
  const isAssistant = role === "assistant";
  const avatarName = isAssistant ? "Chat GPT" : name;
  return (
    <div className="flex items-center gap-2 mb-5">
      <Avatar>
        <AvatarImage src={isAssistant ? "/logo_black.jpg" : ""} alt="avatar" />
        <AvatarFallback> {avatarName[0]}</AvatarFallback>
      </Avatar>

      <div className="mt-2">
        <h2 className="font-bold">{avatarName}</h2>
        <div className="mt-2 whitespace-break-spaces">{content}</div>
      </div>
    </div>
  );
}
