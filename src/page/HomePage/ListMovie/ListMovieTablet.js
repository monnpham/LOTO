import { Card, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { movieService } from "../../../service/service";
import { useNavigate } from "react-router-dom";
import SearchResponsive from "../SearchMovie/SearchResponsive";
import { useSelector } from "react-redux";

export default function ListMovieTablet() {
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
          <Card
            className="border-none hover:!shadow-none relative"
            hoverable
            cover={
              <img className="object-cover h-80" alt="example" src={hinhAnh} />
            }
          >
            <Meta
              className="py-3"
              title={<h3 className="text-xl">{convertName(tenPhim, 15)}</h3>}
              description={
                <h6 className="font-semibold leading-4 mt-4 mb-2">
                  {convertName(moTa, 50)}
                </h6>
              }
            />
            <div className="card_overlay relative">
              <div
                className="w-full h-80 relative"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
              ></div>
              <img
                className="absolute top-[38%] left-1/2 translate-x-[-50%] translate-y-[-50%] hover:opacity-75 "
                src="./img/download.png"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                alt=""
              />
              <div className="bg-white h-full">
                <button
                  onClick={() => {
                    navigate(`/local/${maPhim}`);
                  }}
                  className="theme-btn mt-4"
                >
                  MUA VÉ
                </button>
              </div>
            </div>
          </Card>
        );
      });
    } else {
      return list.map(({ hinhAnh, tenPhim, moTa, maPhim }) => {
        return (
          <Card
            className="border-none hover:!shadow-none relative"
            hoverable
            cover={
              <img className="object-cover h-80" alt="example" src={hinhAnh} />
            }
          >
            <Meta
              className="py-3"
              title={<h3 className="text-xl">{convertName(tenPhim, 15)}</h3>}
              description={
                <h6 className="font-semibold leading-4 mt-4 mb-2">
                  {convertName(moTa, 50)}
                </h6>
              }
            />
            <div className="card_overlay relative">
              <div
                className="w-full h-80 relative"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
              ></div>
              <img
                className="absolute top-[38%] left-1/2 translate-x-[-50%] translate-y-[-50%] hover:opacity-75 "
                src="./img/download.png"
                onClick={() => {
                  navigate(`/detail/${maPhim}`);
                }}
                alt=""
              />
              <div className="bg-white h-full">
                <button
                  onClick={() => {
                    navigate(`/local/${maPhim}`);
                  }}
                  className="theme-btn mt-4"
                >
                  MUA VÉ
                </button>
              </div>
            </div>
          </Card>
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
      <div className="grid grid-cols-3 gap-6 mt-4 px-3">{renderList()}</div>
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
