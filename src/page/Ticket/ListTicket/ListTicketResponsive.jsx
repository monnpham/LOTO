

import React from "react";
import { useMediaQuery } from "react-responsive";
import ListTicket from "./ListTicket";
import ListTicketMobile from "./ListTicketMobile";
import ListTicketTablet from "./ListTicketTablet";


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
export default function ListTicketResponsive() {
  return (
    <div>
      <Desktop>
        <ListTicket />
      </Desktop>
      <Tablet>
        <ListTicketTablet />
      </Tablet>
      <Mobile>
        <ListTicketMobile />
      </Mobile>
    </div>
  );
}
