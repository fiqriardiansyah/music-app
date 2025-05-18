import { Check, ChevronLeft, Minus, Plus, User } from "lucide-react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Accordion = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 pb-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm">
            What's The Difference Between Fan and Artist Plans?
          </h3>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="text-sm text-white/40"
              >
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will take effect at the start of your next billing cycle.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-1 cursor-pointer"
        >
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </button>
      </div>
    </div>
  );
};

export default function Subscription() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-white container-layout pb-20">
      <header className="flex items-center justify-center py-4 sticky top-0 bg-black-secondary z-40">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 rounded-full bg-zinc-800 p-2 hover:bg-white/20 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-medium">Subscription Plan</h1>
      </header>

      <main className="flex-1 flex flex-col py-4 space-y-8">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          dotListClass=""
          draggable
          focusOnSelect={false}
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
              items: 3,
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
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 rounded-xl p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-white rounded-full p-3">
                  <User className="h-5 w-5 text-black" />
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold">$1.99</span>
                  <span className="text-zinc-400 text-sm">/month</span>
                </div>
              </div>

              <h2 className="text-xl font-medium text-[#c4f135] mb-4">
                Mini Premium
              </h2>

              <div className="space-y-3 flex-1">
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-zinc-800 rounded-full p-1">
                    <Check className="h-3 w-3 text-[#c4f135]" />
                  </div>
                  <span className="text-sm text-zinc-300">
                    Unlock unlimited upload time
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-zinc-800 rounded-full p-1">
                    <Check className="h-3 w-3 text-[#c4f135]" />
                  </div>
                  <span className="text-sm text-zinc-300">
                    Get paid fairly for your plays
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-zinc-800 rounded-full p-1">
                    <Check className="h-3 w-3 text-[#c4f135]" />
                  </div>
                  <span className="text-sm text-zinc-300">Ads blocking</span>
                </div>
                <div className="flex items-start">
                  <div className="mr-3 mt-1 bg-zinc-800 rounded-full p-1">
                    <Check className="h-3 w-3 text-[#c4f135]" />
                  </div>
                  <span className="text-sm text-zinc-300">
                    Pin your favorite tracks
                  </span>
                </div>
              </div>

              <button className="w-full py-3 mt-6 rounded-full bg-[#c4f135] text-black font-medium">
                Get Premium Mini
              </button>

              <p className="text-xs text-zinc-500 text-center mt-3">
                Terms apply
              </p>
            </div>
          ))}
        </Carousel>

        <div className="mt-8">
          <h2 className="text-xl font-medium mb-4">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Accordion key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
