// hooks/useBreakpoints.ts
import { useMediaQuery } from "react-responsive";

// based on tailwind breakpoints
export const useBreakpoints = () => {
  const is2XL = useMediaQuery({ query: "(min-width: 1536px)" });
  const isXL = useMediaQuery({ query: "(min-width: 1280px)" });
  const isLG = useMediaQuery({ query: "(min-width: 1024px)" });
  const isMD = useMediaQuery({ query: "(min-width: 768px)" });
  const isSM = useMediaQuery({ query: "(min-width: 640px)" });

  return {
    is2XL,
    isXL,
    isLG,
    isMD,
    isSM,
    isXS: !isSM, // below 640
  };
};
