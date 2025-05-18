import { ChevronLeft, ChevronRight, Eye, Music, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2, // stagger delay per card
      duration: 0.5,
    },
  }),
};

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center p-4 justify-between container-layout">
      <button
        onClick={() => navigate(-1)}
        className="hover:bg-white/40 cursor-pointer p-2 rounded-full bg-zinc-800 p-2 mr-4"
      >
        <ChevronLeft size={20} />
      </button>
      <h1 className="text-lg font-medium">Add Details</h1>
      <p></p>
    </header>
  );
};

export default function Add() {
  return (
    <div className="flex flex-col min-h-screen text-white pb-20 container-layout">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row p-4 space-y-6">
        <div className="relative flex-1">
          <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-md">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ubPqrihrda1rdr0dn7EdKg0OESiWDv.png"
              alt="Album cover"
              className="object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1">
              <Tag size={16} />
            </div>
          </div>
          <p className="text-sm text-zinc-400 mt-4">
            A long description highlights features, increases search visibility
            and drives more views.
          </p>
        </div>

        <div className="space-y-4 flex-1 pt-4">
          <motion.button
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hover:bg-white/5 rounded-lg w-full cursor-pointer p-2 flex items-center justify-between py-4"
          >
            <div className="flex items-center">
              <Music size={20} className="text-zinc-400 mr-4" />
              <span>Add Music</span>
            </div>
            <ChevronRight size={20} className="text-zinc-400" />
          </motion.button>

          <motion.button
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hover:bg-white/5 rounded-lg w-full cursor-pointer p-2 flex items-center justify-between py-4"
          >
            <div className="flex items-center">
              <Eye size={20} className="text-zinc-400 mr-4" />
              <div className="flex flex-col">
                <span>Visibility</span>
                <span className="text-sm text-zinc-400">Public</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-zinc-400" />
          </motion.button>

          <motion.button
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="hover:bg-white/5 rounded-lg w-full text-start cursor-pointer p-2 flex items-center justify-between py-4"
          >
            <div className="flex items-center">
              <Tag size={20} className="text-zinc-400 mr-4" />
              <div className="flex flex-col">
                <span>Pick Genre</span>
                <span className="text-sm text-zinc-400">Hip-Hop & Rap</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-zinc-400" />
          </motion.button>
        </div>
      </main>

      <footer className="p-4 flex justify-center">
        <button className="w-full md:w-fit cursor-pointer px-7 py-4 rounded-full bg-[#c4f135] text-black font-medium">
          Upload
        </button>
      </footer>
    </div>
  );
}
