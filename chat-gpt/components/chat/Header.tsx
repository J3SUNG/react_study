import { MobileMenu } from "./MobileMenu";
import { ModelSelect } from "./ModelSelect";

export function Header() {
  return (
    <header className="flex items-center p-2">
      <MobileMenu />
      <ModelSelect />
    </header>
  );
}
