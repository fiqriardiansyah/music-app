import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import musicExample from "../assets/music-example.weba";
import { AppContext, AppContextType, Music } from "../context/app";
import MusicSlider from "./music-slider";

export const Player = ({ musicInitial }: { musicInitial?: Music }) => {
  const appContext = useContext(AppContext) as AppContextType;
  const [music, setMusic] = useState<Music | null>(null);
  const [isLyricsOn, setIsLyricsOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (appContext.activeMusic || musicInitial) {
      setMusic(appContext.activeMusic || musicInitial || null);
      setTimeout(() => {
        setIsPlaying(true);
        if (audioRef.current) audioRef.current.play();
      }, 100);
      return;
    }

    setTimeout(() => {
      setMusic(null);
    }, 400);
  }, [appContext.activeMusic, musicInitial]);

  const onClickSeeLyrics = () => {
    setIsLyricsOn((prev) => !prev);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Update current time on progress
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Seek manually
  const handleSeek = (value: number) => {
    const currentTime = (value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setCurrentTime(currentTime);
  };

  return (
    <div className="container-layout overflow-y-hidden flex flex-col items-center gap-7">
      <audio
        ref={audioRef}
        src={musicExample}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />
      <AnimatePresence mode="sync" initial={false}>
        {isLyricsOn && (
          <motion.div
            key="lyrics"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.6 }}
            className="py-4 px-4 w-full h-screen bg-black-secondary z-10"
          >
            <div className="w-full text-white flex flex-col items-center justify-center">
              <button
                onClick={onClickSeeLyrics}
                className="flex flex-col items-center cursor-pointer"
              >
                <span>CLOSE LYRICS</span>
                <ChevronUp />
              </button>
            </div>
            <p className="text-white/70 font-light">
              If I had to live my life without you near me The days would all be
              empty The nights would seem so long With you I see forever, oh, so
              clearly I might have been in love before But it never felt this
              strong Our dreams are young and we both know They'll take us where
              we want to go Hold me now, touch me now I don't want to live
              without you Nothing's gonna change my love for you You oughta know
              by now how much I love you One thing you can be sure of I'll never
              ask for more than your love Nothing's gonna change my love for you
              You oughta know by now how much I love you The world may change my
              whole life through But nothing's gonna change my love for you If
              the road ahead is not so easy Our love will lead the way for us
              Like a guiding star I'll be there for you if you should need me
              You don't have to change a thing I love you just the way you are
              So come with me and share the view I'll help you see forever too
              Hold me now, touch me now I don't want to live without you
              Nothing's gonna change my love for you You oughta know by now how
              much I love you One thing you can be sure of I'll never ask for
              more than your love Nothing's gonna change my love for you You
              oughta know by now how much I love you The world may change my
              whole life through But nothing's gonna change my love for you
              Nothing's gonna change my love for you You oughta know by now how
              much I love you One thing you can be sure of I'll never ask for
              more than your love Nothing's gonna change my love for you You
              oughta know by now how much I love you The world may change my
              whole life through But nothing's gonna change my love for you
              Nothing's gonna change my love for you You oughta know by now how
              much I love you One thing you can be sure of I'll never ask for
              more than your love Nothing's gonna change my love for you You
              oughta know by now how much I love you The world may change my
              whole life through But nothing's gonna change my love for you
              Nothing's gonna change my love for you
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[100px] w-full  py-4 container-layout flex flex-col items-center">
        <img
          src={music?.cover}
          alt=""
          className="rounded-xl md:max-w-[300px] h-[300px] w-[90%] object-contain"
        />
        <div className="flex flex-col gap-10 w-full">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-white/70 text-xl">{music?.name}</p>
              <p className="text-sm text-white/50">{music?.artist}</p>
            </div>
            <button className="text-white cursor-pointer w-10 h-10 flex items-center justify-center rounded-full">
              <Heart size={20} />
            </button>
          </div>
          <div className="relative flex flex-col items-center gap-5 w-full">
            {music && (
              <MusicSlider
                value={(currentTime / duration) * 100}
                min={0}
                max={100}
                step={1}
                onChange={handleSeek}
              />
            )}
            <div className="w-full flex justify-between">
              <span className="text-sm text-white/30">
                {formatTime(currentTime)}
              </span>
              <span className="text-sm text-white/30">
                {formatTime(duration)}
              </span>
            </div>
            <div className="w-full sm:w-[400px] flex justify-between gap-4">
              <button className="text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10">
                <Shuffle />
              </button>
              <button className="text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10">
                <SkipBack />
              </button>
              <motion.button
                key={isPlaying ? 1 : 0}
                animate={{ scale: 1.1 }}
                onClick={togglePlay}
                className="w-14 h-14 cursor-pointer hover:bg-green/70 bg-green rounded-full flex justify-center items-center text-black"
              >
                {isPlaying ? <Pause /> : <Play />}
              </motion.button>
              <button className="text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10">
                <SkipForward />
              </button>
              <button className="text-white cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10">
                <Repeat />
              </button>
            </div>
          </div>
          <div className="w-full text-white flex flex-col items-center justify-center">
            <button
              onClick={onClickSeeLyrics}
              className="flex flex-col items-center cursor-pointer"
            >
              <span>LYRICS</span>
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
