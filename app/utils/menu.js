import { IoMdHome } from "react-icons/io";
import { LiaListAltSolid } from "react-icons/lia";
import { MdOutlineDone } from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";

const menu = [
  {
    id: 1,
    title: "All Tasks",
    icon: <IoMdHome />,
    link: "/",
  },
  {
    id: 2,
    title: "Important!",
    icon: <LiaListAltSolid />,
    link: "/important",
  },
  {
    id: 3,
    title: "Check",
    icon: <MdOutlineDone />,
    link: "/completed",
  },
  {
    id: 4,
    title: "Do It Now",
    icon: <PiNotepadBold />,
    link: "/incomplete",
  },
];

export default menu;
