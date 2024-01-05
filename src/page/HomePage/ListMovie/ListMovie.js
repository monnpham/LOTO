import { Card, Modal, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect, useState } from "react";
import { movieService } from "../../../service/service";
import { useNavigate } from "react-router-dom";
import SearchResponsive from "../SearchMovie/SearchResponsive";
import ReactPlayer from "react-player";

export default function ListMovie() {
  const [list, setList] = useState([]);
  const [totalMovieUser, setTotalMovieUser] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
    getMovieUser(1, 8);
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
    return list.map(({ hinhAnh, tenPhim, moTa, trailer, maPhim }) => {
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
              onClick={showModal}
              className="absolute top-[38%] left-1/2 translate-x-[-50%] translate-y-[-50%] hover:opacity-75"
              src="./img/download.png"
              alt=""
            />
            <Modal
              style={{ width: 640 }}
              footer={null}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <ReactPlayer url={trailer} />
            </Modal>
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
  };
  let handlePageClick = (even) => {
    getMovieUser(even, 8);
  };

  return (
    <div className="container relative px-0" id="listMovie">
      <SearchResponsive />
      <div className="grid grid-cols-4 gap-6 mt-12">{renderList()}</div>
      <Pagination
        className="text-center my-3"
        defaultCurrent={1}
        total={totalMovieUser}
        pageSize={8}
        onChange={handlePageClick}
      />
    </div>
  );
}
