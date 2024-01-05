import React from "react";
import { useMediaQuery } from "react-responsive";
import TableMovie from "./TableMovie";
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 960 });
  return isDesktop ? children : null;
};
export default function TableMovieResponsive() {
  return (
    <div>
      <Desktop>
        <TableMovie />
      </Desktop>
    </div>
  );
}
