import React, { useEffect, useState } from "react";
import { Button, Select, Space } from "antd";
import { movieService } from "../../../service/service";

export default function SearchMovie() {
  const [listMovie, setListMovie] = useState([]);
  const [listRap, setListRap] = useState([]);
  let getListMovie = () => {
    movieService
      .getListAllMovie()
      .then((res) => {
        setListMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListMovie();
  }, []);

  const handleMovieSearch = (value) => {
    movieService
      .getShowTimesMovie(value)
      .then((res) => {
        setListRap(res.data.content.heThongRapChieu);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRapSearch = (value) => {};
  const handleGioChieuSearch = (value) => {};
  return (
    <Space wrap className="absolute top-[-118px] left-0 right-0">
      <div className="bg-white shadow-2xl rounded-lg searchMovie w-[912px] h-20 px-3 py-3 flex justify-between items-center">
        <Select
          defaultValue={"Phim"}
          className="slect_phim"
          options={listMovie.map(({ tenPhim, maPhim }) => {
            return {
              label: tenPhim,
              value: maPhim,
            };
          })}
          style={{
            width: 260,
          }}
          onChange={handleMovieSearch}
        />
        <Select
          className="slect_rap"
          defaultValue={"Rạp"}
          options={listRap.map(({ tenHeThongRap }) => {
            return {
              label: tenHeThongRap,
              value: tenHeThongRap,
            };
          })}
          style={{
            width: 200,
          }}
          onChange={handleRapSearch}
        />
        <Select
          className="slect_gioChieu"
          defaultValue={"Ngày giờ chiếu"}
          style={{
            width: 220,
          }}
          onChange={handleGioChieuSearch}
        />
        <Button
          type="primary"
          className="!bg-orange-600 text-white font-semibold !h-11 w-36 hover:!bg-orange-800"
        >
          MUA VÉ NGAY
        </Button>
      </div>
    </Space>
  );
}
