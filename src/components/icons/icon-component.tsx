import { RxMoon } from "react-icons/rx";
import { FiHome, FiSun } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { RiGoogleFill } from "react-icons/ri";
import { BsArrowDownShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { HiMiniChevronRight } from "react-icons/hi2";
import { RiMenu2Fill } from "react-icons/ri";
import { GoStarFill } from "react-icons/go";
import { RxMagnifyingGlass } from "react-icons/rx";

const icon = {
  home: FiHome,
  cart: RiShoppingCart2Line,
  order: RiFileList3Line,
  menu: RiMenu2Fill,
  search: RxMagnifyingGlass,
  moon: RxMoon,
  sun: FiSun,
  star: GoStarFill,
  signOut: PiSignOutBold,
  signIn: PiSignInBold,
  google: RiGoogleFill,
  like: BiLike,
  arrowDown: BsArrowDownShort,
  arrowRight: HiMiniChevronRight,
};

export default icon;
