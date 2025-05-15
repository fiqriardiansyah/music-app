import { ChevronDown, EllipsisVertical } from "lucide-react";
import { useContext } from "react";
import { AppContext, AppContextType } from "../context/app";
import { Player } from "../components/player";

const TopMenu = () => {
  const appContext = useContext(AppContext) as AppContextType;

  const onClickClose = () => {
    appContext.setActiveMusic(null);
  };

  return (
    <div className="w-full flex justify-between container-layout py-3 static top-0 left-0 z-10">
      <button
        onClick={onClickClose}
        className="bg-white/10 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center"
      >
        <ChevronDown className="text-white" />
      </button>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white/30 text-xs">PLAYING FROM ALBUM</p>
        <p className="text-white/70 text-base">
          {appContext.activeMusic?.name}
        </p>
      </div>
      <button className="bg-white/10 rounded-full cursor-pointer w-10 h-10 flex items-center justify-center">
        <EllipsisVertical className="text-white" />
      </button>
    </div>
  );
};

export default function PlayMusic() {
  return (
    <div className="text-white flex items-center flex-col">
      <TopMenu />
      <Player />
    </div>
  );
}
