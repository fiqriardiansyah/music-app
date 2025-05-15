/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { CirclePlus, House, LibraryBig, Search, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import reverseCornerImg from "../../assets/rounded-reverse.svg";
import { useBreakpoints } from "../../hooks";

export default function BottomNavigation() {
  const location = useLocation();
  const [_, setRender] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSM } = useBreakpoints();

  const navigations = [
    { index: 0, icon: House, title: "Home", link: "/" },
    { index: 1, icon: Search, title: "Search", link: "/search" },
    { index: 2, icon: CirclePlus, title: "Add", link: "/add" },
    { index: 3, icon: LibraryBig, title: "Library", link: "/library" },
    { index: 4, icon: User, title: "Profile", link: "/profile" },
  ];

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, navigations.length);
    setRender(true);

    const onResize = () => {
      setRender((prev) => !prev);
    };

    setActive(
      navigations.find((el) => el.link === location.pathname)?.index || 0
    );

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [location.pathname]);

  const onClick = (index: number) => {
    setActive(index);
    navigate(navigations.find((el) => el.index === index)?.link || "");
  };

  const ActiveElement = navigations[active];

  return (
    <div
      ref={containerRef}
      className={`z-50 flex justify-evenly items-center gap-1 h-14 px-[16px] ${
        isSM
          ? "fixed bottom-2 w-[400px] left-1/2 transform -translate-x-1/2"
          : "fixed bottom-0 left-0 right-0 z-10"
      }`}
    >
      <div className="absolute bottom-0 h-[6px] bg-black z-[-2] w-full rounded-full"></div>
      <motion.div
        animate={{
          width: (itemRefs.current[active] as any)?.offsetLeft - 10 + 20,
          left: -20,
        }}
        className={`h-full bg-black absolute z-[-1] left-0 ${
          isSM ? "rounded-t-2xl rounded-bl-2xl" : "rounded-tr-2xl"
        }`}
      >
        <div className=" h-full w-full relative">
          <img
            src={reverseCornerImg}
            className="absolute right-[-22px] bottom-[5px]"
            alt=""
          />
        </div>
      </motion.div>
      <motion.div
        animate={{
          width:
            (containerRef.current?.clientWidth || 0) -
            ((itemRefs.current[active] as any)?.offsetLeft || 0) -
            ((itemRefs.current[active] as any)?.clientWidth || 0) -
            10 +
            20,
          right: -20,
        }}
        className={`h-full bg-black absolute z-[-1] right-0 ${
          isSM ? "rounded-t-2xl rounded-br-2xl" : "rounded-tl-2xl"
        }`}
      >
        <div className=" h-full w-full relative">
          <img
            src={reverseCornerImg}
            className="absolute left-[-22px] bottom-[5px] -scale-x-100"
            alt=""
          />
        </div>
      </motion.div>
      <motion.div
        layout
        className="absolute top-1/2 transform -translate-y-1/2"
        animate={{
          width: (itemRefs.current[active] as any)?.clientWidth,
          left: (itemRefs.current[active] as any)?.offsetLeft,
        }}
      >
        <div className="bg-lime-400 px-4 py-2 rounded-full flex items-center justify-center text-sm">
          <ActiveElement.icon size={18} />
          <span className="ml-2">{ActiveElement?.title}</span>
        </div>
      </motion.div>
      {navigations.map((Nav) => (
        <button
          ref={(el) => (itemRefs.current[Nav.index] = el) as any}
          onClick={() => onClick(Nav.index)}
          key={Nav.index}
          className={` cursor-pointer h-[70%] w-full rounded-full text-sm gap-2 flex items-center justify-center px-[8px] ${
            active === Nav.index ? "px-[14px] text-transparent" : "text-white"
          }`}
        >
          <Nav.icon />
          {active === Nav.index ? Nav.title : null}
        </button>
      ))}
    </div>
  );
}
