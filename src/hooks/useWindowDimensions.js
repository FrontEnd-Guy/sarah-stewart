import {useEffect, useState} from "react";

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
  
    useEffect(() => {
      const resizeListener = () => {
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
          setWindowDimensions(window.innerWidth);
        }, 500);
      };
  
      window.addEventListener("resize", resizeListener);
  
      return () => {
        window.removeEventListener("resize", resizeListener);
      };
    }, []);
  
    return windowDimensions;
  }
  