import GoBackButton from "./go-back-button";
import MotoLogLogo from "./icons/moto-log-logo";
import SearchInput from "./search-input";

export default function MobileHeader() {
  return (
    <div className="fixed top-0 w-full flex items-center justify-between gap-3 z-40 bg-background lg:hidden px-4 h-[72px]">
      <GoBackButton />
      <SearchInput className="h-10" />
      <MotoLogLogo />
    </div>
  );
}
