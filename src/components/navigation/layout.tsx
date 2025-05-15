import { Outlet } from "react-router-dom";
import BottomNavigation from "./bottom-navigation";
import { useContext } from "react";
import { AppContext, AppContextType } from "../../context/app";
import { AnimatePresence, motion } from "framer-motion";
import PlayMusic from "../../pages/play";

export default function Layout() {
  const appProvider = useContext(AppContext) as AppContextType;

  return (
    <div className="relative">
      <Outlet />
      <BottomNavigation />
      <AnimatePresence>
        {appProvider.activeMusic && (
          <motion.div
            className="w-screen h-screen bg-black-secondary z-[99999] fixed top-0 left-0"
            transition={{ duration: 0.5 }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            initial={{ y: "100vh" }}
          >
            <PlayMusic />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
