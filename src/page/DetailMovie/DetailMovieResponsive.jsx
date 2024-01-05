import React from "react";
import { useMediaQuery } from "react-responsive";

import DetailMovie from "./DetailMovie";
import DetailMovieTablet from "./DetailMovieTablet";
import DetailMovieMobile from "./DetailMovieMobile";

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
export default function DetailMovieResponsive() {
    return (
        <div>
            <Desktop>
                <DetailMovie />
            </Desktop>
            <Tablet>
                <DetailMovieTablet />
            </Tablet>
            <Mobile>
                <DetailMovieMobile />
            </Mobile>
        </div>
    );
}
