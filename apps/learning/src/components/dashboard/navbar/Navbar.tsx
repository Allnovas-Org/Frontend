import { NavbarLogo } from "./NavbarLogo";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";

interface NavbarProps {
  userName: string;
  avatarUrl?: string;
}

export function Navbar({ userName, avatarUrl }: NavbarProps) {
  return (
    <header className="flex h-[90px] w-full flex-shrink-0 items-center justify-between bg-white px-8">
      <NavbarLogo />
      <SearchInput />
      <UserMenu userName={userName} avatarUrl={avatarUrl} />
    </header>
  );
}
