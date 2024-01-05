import React, { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { movieService } from "../../../service/service";
import { stringToSlug } from "../../../util/method";
import { useDispatch } from "react-redux";
import { ARR_SEARCH } from "../../../redux/constant/user";
const { Search } = Input;

export default function SearchMovieMobile() {
  const [listAllMovie, setListAllMovie] = useState([]);
  let dispatch = useDispatch();

  let getListSearch = () => {
    movieService
      .getListAllMovie()
      .then((res) => {
        setListAllMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getListSearch();
  }, []);

  const onSearch = (value, _e, info) => {
    console.log(
      "🚀 ~ file: SearchMovieMobile.js:30 ~ onSearch ~ value:",
      value
    );
    let tuKhoa = stringToSlug(value);
    let arrSearch = [];
    if (value === "") {
      arrSearch = [];
    } else {
      for (let index = 0; index < listAllMovie.length; index++) {
        let itemMovie = listAllMovie[index];
        if (itemMovie.biDanh.search(tuKhoa) !== -1) {
          arrSearch.push(itemMovie);
        }
      }
    }
    dispatch({ type: ARR_SEARCH, payload: arrSearch });
  };
  return (
    <div className="searchMovie_Mobile">
      <Space
        direction="vertical"
        className="w-full max-[600px]:px-6 max-[600px]:pt-3 px-3"
      >
        <Search placeholder="Tìm kiếm phim" onSearch={onSearch} enterButton />
      </Space>
    </div>
  );
}
