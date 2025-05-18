import { Outlet, useLocation } from "react-router-dom";
import BottomNavigation from "./bottom-navigation";
import { useContext } from "react";
import { AppContext, AppContextType } from "../../context/app";
import { AnimatePresence, motion } from "framer-motion";
import PlayMusic from "../../pages/play";
import Add from "../../pages/add";
import Subscription from "../../pages/subscription";

export default function Layout() {
  const appProvider = useContext(AppContext) as AppContextType;
  const location = useLocation();

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
      <AnimatePresence>
        {location.pathname === "/add" && (
          <motion.div
            className="w-screen h-screen bg-black-secondary z-[99999] fixed top-0 left-0"
            transition={{ duration: 0.5 }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            initial={{ y: "100vh" }}
          >
            <Add />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {location.pathname === "/subscription" && (
          <motion.div
            className="w-screen h-screen bg-black-secondary z-[99999] fixed top-0 left-0 overflow-y-auto"
            transition={{ duration: 0.5 }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            initial={{ y: "100vh" }}
          >
            <Subscription />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
