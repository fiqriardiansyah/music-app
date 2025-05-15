import { useRef } from "react";

const MusicSlider = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (t: number) => void;
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, x / rect.width));
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;

    onChange?.(steppedValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      onMouseDown={(e) => {
        handleMove(e);
        const move = (e: MouseEvent) => handleMove(e as any);
        const up = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
      }}
      className="w-full h-[5px] bg-gray-400 rounded-full relative cursor-pointer"
    >
      <div
        className="absolute h-[5px] bg-green rounded-full"
        style={{ width: `${percentage}%` }}
      >
        <div className="w-full h-full flex justify-end">
          <div className="h-5 w-5 bg-green rounded-full absolute top-1/2 right-0 transform -translate-y-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default MusicSlider;
