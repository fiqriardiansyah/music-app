import {
  ChevronDown,
  EllipsisVertical,
  LayoutGrid,
  LayoutList,
  Plus,
  Search,
  X,
} from "lucide-react";
import { useContext, useState } from "react";
import Activity from "../assets/Image.png";
import Activity1 from "../assets/Image-1.png";
import Activity2 from "../assets/Image-2.png";
import Activity3 from "../assets/Image-3.png";
import Activity4 from "../assets/Image-4.png";
import Music1Png from "../assets/music-1.png";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext, AppContextType } from "../context/app";
import { Player } from "../components/player";
import { useBreakpoints } from "../hooks";

const Navbar = () => {
  return (
    <div className="w-full py-4 flex justify-between items-center bg-black-secondary z-10 sticky top-0 left-0">
      <p className="text-white/80 text-xl">Library</p>
      <button className="rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-white/30 cursor-pointer">
        <Search />
      </button>
    </div>
  );
};

const Categories = () => {
  const [active, setActive] = useState("");
  const categories = ["Playlist", "Artists", "Albums", "Stations"];

  const handleClick = (category: string) => {
    setActive(category);
  };

  return (
    <ul className="flex flex-nowrap gap-2 overflow-x-auto hide-horizontal-scrollbar">
      {categories.map((category) => (
        <li
          key={category}
          onClick={() => handleClick(category)}
          className={`${
            active === category ? "!bg-green !text-black" : "border-none"
          } cursor-pointer bg-white/10 text-white/60 border text-base capitalize font-light rounded-full px-4 py-2 whitespace-nowrap`}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

const Menu = ({
  mode,
  onChange,
}: {
  mode: "list" | "grid";
  onChange: () => void;
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-2 text-white">
        <p className="text-white/40 text-sm">Recent Activity</p>
        <ChevronDown className="cursor-pointer" />
      </div>
      <button
        onClick={onChange}
        className="text-white w-12 h-12 rounded-full flex items-center justify-center focus:bg-white/20 cursor-pointer"
      >
        {mode === "list" ? <LayoutGrid /> : <LayoutList />}
      </button>
    </div>
  );
};

const List = ({ mode }: { mode: "list" | "grid" }) => {
  const appContext = useContext(AppContext) as AppContextType;
  const { isXS } = useBreakpoints();

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1, // delay between each child
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const listActivity = [
    { image: Activity, text: "Downloads & Local Music", desc: "41 Songs" },
    { image: Activity1, text: "Liked Songs", desc: "Playlist - 71 Songs" },
    { image: Activity2, text: "Samjho N", desc: "Playlist - Aditya rikari" },
    { image: Activity3, text: "Superman", desc: "Playlist - Kyanu & DJ gulum" },
    { image: Activity4, text: "Above All", desc: "Playlist - Eminem" },
    { image: Activity, text: "Downloads & Local Music", desc: "41 Songs" },
    { image: Activity1, text: "Liked Songs", desc: "Playlist - 71 Songs" },
    { image: Activity2, text: "Samjho N", desc: "Playlist - Aditya rikari" },
    { image: Activity3, text: "Superman", desc: "Playlist - Kyanu & DJ gulum" },
    { image: Activity4, text: "Above All", desc: "Playlist - Eminem" },
    { image: Activity, text: "Downloads & Local Music", desc: "41 Songs" },
    { image: Activity1, text: "Liked Songs", desc: "Playlist - 71 Songs" },
    { image: Activity2, text: "Samjho N", desc: "Playlist - Aditya rikari" },
    { image: Activity3, text: "Superman", desc: "Playlist - Kyanu & DJ gulum" },
    { image: Activity4, text: "Above All", desc: "Playlist - Eminem" },
  ];

  const onClick = () => {
    if (isXS) {
      appContext.setActiveMusic({
        name: "Starboy Remix",
        artist: "The Weeknd",
        cover: Music1Png,
      });
      return;
    }
    appContext.setActiveMusicSide({
      name: "Starboy Remix",
      artist: "The Weeknd",
      cover: Music1Png,
    });
  };

  return (
    <motion.div
      key={mode}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className={`${
        mode === "list"
          ? "flex w-full flex-col gap-5 pb-28"
          : appContext.activeMusicSide
          ? "grid grid-cols-2 gap-4"
          : "grid grid-cols-2 lg:grid-cols-3 gap-4"
      }`}
    >
      {listActivity.map((el, i) => (
        <motion.div
          variants={itemVariants}
          className="flex w-full gap-3 justify-between"
          key={i}
        >
          <button
            onClick={onClick}
            className="flex gap-3 flex-1 items-start cursor-pointer w-full hover:bg-black/40 p-2 rounded-lg"
          >
            <img
              src={el.image}
              className="rounded-lg w-[70px] h-[70px] object-cover"
              alt={el.text}
            />
            <div className="flex flex-col gap-2 items-start">
              <p className="text-white/60 text-lg">{el.text}</p>
              <p className="text-white/40 text-sm">{el.desc}</p>
            </div>
          </button>
          <button className="w-10 h-10 text-white/50 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer">
            <EllipsisVertical />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Library() {
  const appContext = useContext(AppContext) as AppContextType;
  const [modeList, setModeList] = useState<"list" | "grid">("list"); //list, grid

  const onChangeMode = () => {
    setModeList((prev) => (prev === "list" ? "grid" : "list"));
  };

  const closeMusic = () => {
    appContext.setActiveMusicSide(null);
  };

  return (
    <div className="w-full container-layout flex flex-col gap-4">
      <Navbar />
      <Categories />
      <div className="flex gap-10 w-full items-start">
        <div className="flex-1/2 flex-col gap-4 w-full">
          <Menu mode={modeList} onChange={onChangeMode} />
          <List mode={modeList} />
        </div>
        <AnimatePresence>
          {appContext.activeMusicSide && (
            <motion.div
              animate={{ x: 0 }}
              initial={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              className="bg-black flex-1/2 h-fit sticky top-0"
            >
              <button
                onClick={closeMusic}
                className="w-10 absolute top-0 left-0 h-10 rounded-full flex items-center justify-center hover:bg-white/20 text-white/70 cursor-pointer"
              >
                <X />
              </button>
              <Player musicInitial={appContext.activeMusicSide} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button className="bg-white text-lg rounded-full w-fit flex items-center px-4 py-2 cursor-pointer fixed bottom-[80px] right-5 lg:right-15">
        <Plus className="mr-3" />
        New
      </button>
    </div>
  );
}
