import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { movieService } from "../../../service/service";

export default function Carousel() {
  const [banner, setBanner] = useState([]);
  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  useEffect(() => {
    getBannerMovie();
  }, []);
  let getBannerMovie = () => {
    movieService
      .getBanner()
      .then((res) => {
        setBanner(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let RenderBannerMovie = () => {
    return banner.map(({ hinhAnh }) => {
      return (
        <>
          <div className="relative min-[600px]:h-[30vh] min-[700px]:h-[40vh] min-[959px]:h-[50vh] min-[960px]:h-[60vh] min-[1024px]:h-[70vh] min-[1280px]:h-[82vh]">
            <img
              className="h-full w-full object-left-top"
              src={hinhAnh}
              alt=""
            />
            <a href="/" className="cursor-pointer hover:opacity-80">
              <img
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                src="./img/download.png"
                alt=""
              />
            </a>
          </div>
        </>
      );
    });
  };
  return (
    <div className="mt-[74px]">
      <Slider {...settings}>{RenderBannerMovie()}</Slider>
    </div>
  );
}
