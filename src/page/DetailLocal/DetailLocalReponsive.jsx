import React from "react";
import { useMediaQuery } from "react-responsive";
import DetailLocal from "./DetailLocal";
import DetailLocalTablet from "./DetailLocalTablet";
import DetailLocalMobile from "./DetailLocalMobile";


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
export default function DetailLocalResponsive() {
    return (
        <div>
            <Desktop>
                <DetailLocal />
            </Desktop>
            <Tablet>
                <DetailLocalTablet />
            </Tablet>
            <Mobile>
                <DetailLocalMobile />
            </Mobile>
        </div>
    );
}
