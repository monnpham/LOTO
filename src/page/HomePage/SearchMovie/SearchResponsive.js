import React from "react";
import { useMediaQuery } from "react-responsive";
import SearchMovie from "./SearchMovie";
import SearchMovieMobile from "./SearchMovieMobile";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 960 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ maxWidth: 959 });
  return isTablet ? children : null;
};
export default function SearchResponsive() {
  return (
    <div>
      <Desktop>
        <SearchMovie />
      </Desktop>
      <Tablet>
        <SearchMovieMobile />
      </Tablet>
    </div>
  );
}
