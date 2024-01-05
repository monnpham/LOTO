import React from "react";
import { useMediaQuery } from "react-responsive";
import Carousel from "./Carousel";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ minWidth: 600 });
  return isMobile ? children : null;
};
export default function CarouselResponsive() {
  return (
    <div>
      <Mobile>
        <Carousel />
      </Mobile>
    </div>
  );
}
