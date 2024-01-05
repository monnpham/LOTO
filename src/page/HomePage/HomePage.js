import React from "react";
import CarouselResponsive from "./Carousel/CarouselResponsive";
import ListMovieResponsive from "./ListMovie/ListMovieResponsive";
import TableMovieResponsive from "./TableMovie/TableMovieResponsive";

export default function HomePage() {
  return (
    <div>
      <CarouselResponsive />
      <ListMovieResponsive />
      <TableMovieResponsive />
    </div>
  );
}
