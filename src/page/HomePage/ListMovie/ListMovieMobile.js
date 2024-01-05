import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { movieService } from "../../../service/service";
import { useNavigate } from "react-router-dom";
import SearchResponsive from "../SearchMovie/SearchResponsive";
import { useSelector } from "react-redux";

export default function ListMovieMobile() {
  const [list, setList] = useState([]);
  const [totalMovieUser, setTotalMovieUser] = useState(0);
  let arrSearch = useSelector((state) => state.userReducer.arrSearch);
  let navigate = useNavigate();
  //giới hạn số lượng chữ xuất hiện
  let convertName = (name, number) => {
    let maxLength = number;
    if (name.length > maxLength) {
      return name.slice(0, maxLength) + "...";
    } else {
      return name;
    }
  };

  useEffect(() => {
    getMovieUser(1, 6);
  }, []);
  let getMovieUser = (page, perPage) => {
    movieService
      .getList(page, perPage)
      .then((res) => {
        setList(res.data.content.items);
        setTotalMovieUser(res.data.content.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let renderList = () => {
    if (arrSearch.length > 0) {
      return arrSearch.map(({ hinhAnh, tenPhim, moTa, maPhim }) => {
        return (
          <div className="flex h-[200px] cursor-pointer item_movie-mb">
            <div className="w-2/5 relative">
              <img
                className="h-full w-full rounded object-cover"
                src={hinhAnh}
                alt=""
              />
              <div
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                className="card_overlay-mb"
              ></div>
              <img
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] hover:opacity-75"
                src="./img/download.png"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                alt=""
              />
            </div>
            <div className="ml-4 w-3/5">
              <div className="text-xl font-semibold h-[15%]">
                {convertName(tenPhim, 13)}
              </div>
              <div className="h-[45%]">{convertName(moTa, 86)}</div>
              <button
                onClick={() => {
                  navigate(`/local/${maPhim}`);
                }}
                className="theme-btn my-3 h-[40%]"
              >
                MUA VÉ
              </button>
            </div>
          </div>
        );
      });
    } else {
      return list.map(({ hinhAnh, tenPhim, moTa, maPhim }) => {
        return (
          <div className="flex h-[200px] cursor-pointer item_movie-mb">
            <div className="w-2/5 relative">
              <img
                className="h-full w-full rounded object-cover"
                src={hinhAnh}
                alt=""
              />
              <div
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                className="card_overlay-mb"
              ></div>
              <img
                className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] hover:opacity-75"
                src="./img/download.png"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                alt=""
              />
            </div>
            <div className="ml-4 w-3/5">
              <div className="text-lg font-semibold h-[15%]">
                {convertName(tenPhim, 13)}
              </div>
              <div className="h-[45%]">{convertName(moTa, 86)}</div>
              <button
                onClick={() => {
                  navigate(`/local/${maPhim}`);
                }}
                className="theme-btn my-3 h-[40%]"
              >
                MUA VÉ
              </button>
            </div>
          </div>
        );
      });
    }
  };
  let handlePageClick = (even) => {
    getMovieUser(even, 6);
  };
  return (
    <div className="container relative px-0" id="listMovie">
      <SearchResponsive />
      <div className="grid mx-6 grid-cols-1 gap-6 mt-4">{renderList()}</div>
      <Pagination
        className="text-center my-3"
        defaultCurrent={1}
        total={totalMovieUser}
        pageSize={6}
        onChange={handlePageClick}
      />
    </div>
  );
}
