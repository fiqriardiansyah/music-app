import ProfileImg from "../assets/profile.png";
import PremiumImg from "../assets/premium.png";
import {
  Bell,
  Compass,
  Lightbulb,
  MessagesSquare,
  Pencil,
  UserRound,
  ChevronRight,
  LucideProps,
} from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
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

const SettingButton = ({
  icon,
  text,
  index,
}: {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  text: string;
  index: number;
}) => {
  const Icon = icon;
  return (
    <motion.button
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex justify-between gap-24 p-2 cursor-pointer hover:bg-black/20 items-center rounded-lg"
    >
      <div className="flex items-center gap-4 w-full">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <Icon />
        </div>
        <p className="text-white/40">{text}</p>
      </div>
      <ChevronRight size={30} />
    </motion.button>
  );
};

export default function Account() {
  const navigate = useNavigate();

  const profileSettings = [
    { icon: UserRound, text: "Personal Details" },
    { icon: Lightbulb, text: "Your Insight" },
    { icon: Bell, text: "Notifications" },
  ];

  const marketingTools = [
    { icon: Compass, text: "Analytics" },
    { icon: MessagesSquare, text: "Communication" },
  ];

  return (
    <div className="w-full container-layout flex flex-col lg:flex-row gap-10 mt-10 pb-20">
      <motion.div className="bg-white/10 flex-1 rounded-xl p-6 h-fit flex flex-col gap-3">
        <div className="w-full flex justify-between gap-4 items-center">
          <div className="flex gap-4 items-center">
            <img src={ProfileImg} alt="" />
            <div className="flex flex-col">
              <span className="text-white/60">Jhon Smith</span>
              <span className="text-white/40 text-sm">
                jhonsmit122@gmail.com
              </span>
            </div>
          </div>
          <button className="border border-white rounded-full px-4 py-2 text-white/50 flex h-fit cursor-pointer hover:bg-white/20">
            <Pencil className="mr-2" />
            Edit
          </button>
        </div>
        <p className="text-white/80 text-lg">Your Plan</p>
        <div className="bg-green p-5 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img src={PremiumImg} alt="" />
            <div className="flex flex-col">
              <p className="font-medium text-lg">Premium Unlock</p>
              <p className="text-sm font-medium">Monthly subscription</p>
            </div>
          </div>
          <button
            onClick={() => navigate("/subscription")}
            className="rounded-full px-4 py-2 bg-black text-white/60 h-fit cursor-pointer hover:bg-black/80"
          >
            See Plan
          </button>
        </div>
      </motion.div>
      <div className="flex flex-col flex-1 gap-10 text-white/50 w-full">
        <div className="flex flex-col gap-4 w-full">
          <p className="">Profile Settings</p>
          {profileSettings.map((profile, i) => (
            <SettingButton index={i} icon={profile.icon} text={profile.text} />
          ))}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <p className="">Marketing Tools</p>
          {marketingTools.map((tools, i) => (
            <SettingButton index={i} icon={tools.icon} text={tools.text} />
          ))}
        </div>
      </div>
    </div>
  );
}
