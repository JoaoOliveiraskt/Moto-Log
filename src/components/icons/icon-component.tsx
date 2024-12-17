import { RxMoon } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { BsArrowDownShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { HiMiniChevronRight } from "react-icons/hi2";
import { GoStarFill } from "react-icons/go";
import { FaGithub } from "react-icons/fa6";
import { TbHeartFilled } from "react-icons/tb";
import { IoTrashOutline } from "react-icons/io5";
import { FiClock } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import { MdBookmarkAdd } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { VscLoading } from "react-icons/vsc";
import { GoHomeFill, GoHome } from "react-icons/go";
import { BiShoppingBag, BiSolidShoppingBag } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { PiCheckCircleFill } from "react-icons/pi";
import { FiEdit2 } from "react-icons/fi";
import { TbFolderDown } from "react-icons/tb";
import { TbFolderCheck } from "react-icons/tb";
import { TbSquareRoundedMinus } from "react-icons/tb";
import { TbSquareRoundedPlus } from "react-icons/tb";
import { TbPhotoMinus } from "react-icons/tb";
import { FiBarChart2 } from "react-icons/fi";
import {
  Menu,
  ShoppingCart,
  Home,
  Tag,
  LogIn,
  LogOut,
  Sun,
  Dribbble,
  Package,
  Package2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const Icon = {
  home: GoHome,
  homeSolid: GoHomeFill,
  cart: ShoppingCart,
  trash: IoTrashOutline,
  order: BiShoppingBag,
  orderSolid: BiSolidShoppingBag,
  menu: Menu,
  search: FiSearch,
  moon: RxMoon,
  sun: Sun,
  star: GoStarFill,
  signOut: LogOut,
  signIn: LogIn,
  notification: Bell,
  like: BiLike,
  arrowDown: BsArrowDownShort,
  arrowRight: ArrowRight,
  arrowLeft: ArrowLeft,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  sell: Tag,
  dashboard: FiBarChart2,
  analytics: FiBarChart2,
  package: Package,
  package2: Package2,
  settings: Settings,
  github: FaGithub,
  confirmed: PiCheckCircleFill,
  bookmark: CiBookmark,
  bookmark2: MdBookmarkAdd,
  heartFilled: TbHeartFilled,
  heart: CiHeart,
  clock: FiClock,
  location: SlLocationPin,
  google: FcGoogle,
  loading: VscLoading,
  user: FaRegUserCircle,
  globe: Dribbble,
  edit: FiEdit2,
  folderDown: TbFolderDown,
  folderCheck: TbFolderCheck,
  Minus: TbSquareRoundedMinus,
  Plus: TbSquareRoundedPlus,
  photoMinus: TbPhotoMinus,
};

export default Icon;
