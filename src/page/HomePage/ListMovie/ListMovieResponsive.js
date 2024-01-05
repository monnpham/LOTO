import React from "react";
import { useMediaQuery } from "react-responsive";
import ListMovie from "./ListMovie";
import ListMovieTablet from "./ListMovieTablet";
import ListMovieMobile from "./ListMovieMobile";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 960 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 959 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 599 });
  return isMobile ? children : null;
};
export default function ListMovieResponsive() {
  return (
    <div>
      <Desktop>
        <ListMovie />
      </Desktop>
      <Tablet>
        <ListMovieTablet />
      </Tablet>
      <Mobile>
        <ListMovieMobile />
      </Mobile>
    </div>
  );
}
