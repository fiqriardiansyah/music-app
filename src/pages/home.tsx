import { Bell, ChevronRight, Mail, MoveRight } from "lucide-react";
import { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Music1Png from "../assets/music-1.png";
import Music2Png from "../assets/music-2.png";
import { motion } from "framer-motion";
import { AppContext, AppContextType, Music } from "../context/app";

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2, // stagger delay per card
      duration: 0.5,
    },
  }),
};

const Navbar = () => {
  const [active, setActive] = useState("message"); //message, notification
  const handleClick = () => {
    setActive((prev) => (prev === "message" ? "notification" : "message"));
  };
  return (
    <nav className="py-2 container-layout top-0 sticky bg-black-secondary z-[9999]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-light">
          Hello, John Smith ✨
        </div>
        <div className="bg-white/40 flex rounded-full overflow-hidden relative">
          <motion.div
            animate={{ left: active === "message" ? "50%" : "0%" }}
            className="absolute z-[-1] h-full w-1/2 bg-white rounded-full"
          />
          <button
            onClick={handleClick}
            className={`${
              active === "notification"
                ? "text-black rounded-full"
                : "text-white"
            } p-3 px-4 cursor-pointer`}
          >
            <Bell size={18} />
          </button>
          <button
            onClick={handleClick}
            className={`${
              active === "message" ? "text-black rounded-full" : "text-white"
            } p-3 px-4 cursor-pointer`}
          >
            <Mail size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const Categories = () => {
  const [active, setActive] = useState("all"); // all, party, blues, sad, hip hop, pop, rock, jazz, classical
  const categories = [
    "all",
    "party",
    "blues",
    "sad",
    "hip hop",
    "pop",
    "rock",
    "jazz",
    "classical",
  ];

  const handleClick = (category: string) => {
    setActive(category);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-lg text-white font-light">Select Categories</h2>
      <ul className="flex flex-nowrap gap-2 overflow-x-auto hide-horizontal-scrollbar">
        {categories.map((category) => (
          <li
            key={category}
            onClick={() => handleClick(category)}
            className={`${
              active === category ? "!bg-green !text-black" : ""
            } cursor-pointer bg-white/10 text-white/60 border text-lg capitalize font-light border-white/20 rounded-full px-4 whitespace-nowrap`}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PopularSongs = () => {
  const appContext = useContext(AppContext) as AppContextType;

  const musics = [
    { id: 1, name: "Starboy Remix", artist: "The Weeknd", cover: Music1Png },
    { id: 2, name: "Superman", artist: "Eminem", cover: Music2Png },
    { id: 3, name: "Starboy Remix", artist: "The Weeknd", cover: Music1Png },
    { id: 4, name: "Superman", artist: "Eminem", cover: Music2Png },
    { id: 5, name: "Starboy Remix", artist: "The Weeknd", cover: Music1Png },
    { id: 6, name: "Superman", artist: "Eminem", cover: Music2Png },
    { id: 7, name: "Starboy Remix", artist: "The Weeknd", cover: Music1Png },
    { id: 8, name: "Superman", artist: "Eminem", cover: Music2Png },
  ];

  const onClickMusic = (id: number) => {
    appContext.setActiveMusic(musics.find((m) => m.id === id) as Music);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="w-full flex justify-between gap-3">
        <h2 className="text-lg text-white font-light m-0">Popular Songs</h2>
        <a href="" className="text-white/40 flex m-0 font-light">
          See all <ChevronRight />
        </a>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
        itemClass="pr-[20px]"
        draggable
        focusOnSelect={false}
        infinite
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          1: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            partialVisibilityGutter: 10,
          },
          2: {
            breakpoint: { max: 600, min: 464 },
            items: 3,
            partialVisibilityGutter: 10,
          },
          3: {
            breakpoint: { max: 800, min: 600 },
            items: 4,
            partialVisibilityGutter: 10,
          },
          4: {
            breakpoint: { max: 1000, min: 800 },
            items: 5,
            partialVisibilityGutter: 10,
          },
          5: {
            breakpoint: { max: 1200, min: 1000 },
            items: 6,
            partialVisibilityGutter: 10,
          },
          6: {
            breakpoint: { max: 1600, min: 1200 },
            items: 7,
            partialVisibilityGutter: 10,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {musics.map((music, i) => {
          return (
            <motion.button
              key={i}
              custom={i}
              onClick={() => onClickMusic(music.id)}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-1 items-start cursor-pointer p-3 rounded-xl hover:bg-black/20"
            >
              <img
                src={music.cover}
                alt={music.name}
                className="w-full h-[130px] rounded object-cover"
              />
              <div className="flex mt-2 justify-start text-start">
                <div className="h-[20px] w-[2px] bg-blue-400 mr-2"></div>
                <p className="text-white/60 capitalize font-light m-0">
                  {music.name}
                </p>
              </div>
              <p className="text-white/40 text-sm font-light m-0">
                {music.artist}
              </p>
            </motion.button>
          );
        })}
      </Carousel>
    </div>
  );
};

const NewCollection = () => {
  const collections = [
    {
      title: "TOP SONGS GLOBAL",
      desc: "Discover 85 Songs",
      color: "bg-gray-100",
    },
    {
      title: "IN YOUR COUNTRY",
      desc: "Discover 30 Songs",
      color: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="w-full flex justify-between gap-3">
        <h2 className="text-lg text-white font-light m-0">New Collection</h2>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="pr-[20px]"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3.4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1.2,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1.5,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {collections.map((coll, i) => (
          <motion.div
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            key={i}
            className={`rounded-lg p-3 flex flex-col gap-2 ${coll.color}`}
          >
            <h2 className="font-semibold text-2xl">{coll.title}</h2>
            <p className="font-normal text-sm text-gray-500">{coll.desc}</p>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <button className="">
              <MoveRight />
            </button>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

const Playlist = () => {
  const playlists = [
    {
      title: "TOP SONGS GLOBAL",
      desc: "Discover 85 Songs",
      color: "bg-gray-100",
    },
    {
      title: "IN YOUR COUNTRY",
      desc: "Discover 30 Songs",
      color: "bg-blue-100",
    },
    {
      title: "TOP SONGS GLOBAL",
      desc: "Discover 85 Songs",
      color: "bg-gray-100",
    },
    {
      title: "IN YOUR COUNTRY",
      desc: "Discover 30 Songs",
      color: "bg-blue-100",
    },
    {
      title: "TOP SONGS GLOBAL",
      desc: "Discover 85 Songs",
      color: "bg-gray-100",
    },
    {
      title: "IN YOUR COUNTRY",
      desc: "Discover 30 Songs",
      color: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="w-full flex justify-between gap-3">
        <h2 className="text-lg text-white font-light m-0">Playlist</h2>
        <a href="" className="text-white/40 flex m-0 font-light">
          See all <ChevronRight />
        </a>
      </div>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass="pr-[20px]"
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 3.4,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1.2,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1.5,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        {playlists.map((playlist, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={`rounded-lg p-3 flex flex-col gap-2 ${playlist.color}`}
          >
            <h2 className="font-semibold text-2xl">{playlist.title}</h2>
            <p className="font-normal text-sm text-gray-500">{playlist.desc}</p>
            <div className="w-full h-[1px] bg-gray-300" />
            <button>
              <MoveRight />
            </button>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full container-layout flex flex-col gap-4 pb-20">
        <Categories />
        <PopularSongs />
        <NewCollection />
        <Playlist />
        <Playlist />
      </div>
    </>
  );
}
