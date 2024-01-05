import React, { useEffect, useState } from "react";
import { movieService } from "../../../service/service";
import { ConfigProvider, Tabs } from "antd";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
const onChange = (key) => {
  console.log(key);
};

export default function TableMovie() {
  const [heThongRap, setHeThongRap] = useState([]);
  let convertName = (name, number) => {
    let maxLength = number;
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    } else {
      return name;
    }
  };
  useEffect(() => {
    movieService
      .getMovieByTheater()
      .then((res) => {
        setHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderHeThongRap = () => {
    return heThongRap.map((heThong) => {
      return {
        key: heThong.maHeThongRap,
        label: <img className="w-16" src={heThong.logo} alt="" />,
        children: (
          <Tabs
            style={{ height: 700 }}
            tabPosition="left"
            items={heThong.lstCumRap.map((cumRap) => {
              return {
                key: cumRap.tenCumRap,
                label: (
                  <div className="text-left w-60 py-2">
                    <h4 className="font-semibold text-green-600 uppercase">
                      {convertName(cumRap.tenCumRap, 31)}
                    </h4>
                    <p className="text-gray-400">
                      {convertName(cumRap.diaChi, 34)}
                    </p>
                    <p className="text-red-500 font-medium">[chi tiết]</p>
                  </div>
                ),
                children: (
                  <div style={{ height: 700, overflowY: "scroll" }}>
                    {renderDsMovie(cumRap)}
                  </div>
                ),
              };
            })}
          />
        ),
      };
    });
  };
  let renderDsMovie = (cumRap) => {
    return cumRap.danhSachPhim.map((movie) => {
      return (
        <div className="my-4 flex pl-6">
          <img className="w-24 h-32 object-cover" src={movie.hinhAnh} alt="" />
          <div className="ml-6">
            <div className="flex">
              <div className="font-semibold text-lg text-white bg-orange-600 px-1 w-9 h-6 leading-6 rounded-lg mr-2">
                C18
              </div>
              <h3 className="text-lg font-semibold mb-3 leading-5">
                {movie.tenPhim}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {movie.lstLichChieuTheoPhim.slice(0, 4).map((lichChieu) => {
                return (
                  <NavLink className="rounded bg-slate-100 py-2 w-36 text-center border-1 font-medium hover:!font-bold cursor-pointer" to={`ticket/${lichChieu.maLichChieu}`}>
                    <span className="text-green-700">
                      {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY")}
                    </span>
                    <span className="px-1 text-gray-400">~</span>
                    <span className="text-red-500">
                      {moment(lichChieu.ngayChieuGioChieu).format("hh:mm")}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container_tablemovie px-0 pt-24 pb-10" id="cumRap">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#00b96b",
            borderRadius: 2,

            // Alias Token
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <Tabs
          style={{ height: 700 }}
          className="border-1"
          defaultActiveKey="1"
          items={renderHeThongRap()}
          onChange={onChange}
          tabPosition="left"
        />
      </ConfigProvider>
    </div>
  );
}
