import { useEffect, useState } from "react";

interface Dimensions {
  width: number | null;
  height: number | null;
}

const useWindowDimensions = (): Dimensions => {
  const [windowSize, setWindowSize] = useState<Dimensions>({
    width: null,
    height: null,
  });

  useEffect(() => {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      handleResize();
  }, [

  ])

  return {
    ...windowSize
  };
};

export default useWindowDimensions;
