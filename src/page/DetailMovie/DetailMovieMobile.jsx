import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { movieService } from "../../service/service";
import { Rate, } from "antd";
import moment from "moment";
import TableMovie from "../HomePage/TableMovie/TableMovie";


export default function DetailMovieMobile() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [detail, setDetail] = useState();
    const httpYou = " https://www.youtube.com/embed/"
    let httpLink = (code) => {
        return httpYou + code
    }
    console.log("DetailMovieMobile:")
    useEffect(() => {
        movieService
            .getDetail(id)
            .then((res) => {
                setDetail(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log("🚀 ~ file~~~~~~~~~~~~~: DetailMovieMobile")

    return (
        <div className="container  pt-24 bg-gray-100">
            <div className="flex">
                <div className="w-1/3 relative">
                    <img src={detail?.hinhAnh} alt="" />
                </div>
                <span className="w-2/3 pl-6 font-medium">
                    <p className=" " style={{ fontSize: "2rem" }}>{detail?.tenPhim}</p>
                    <p style={{ fontSize: "20px" }}>Đánh Giá: &nbsp;
                        <Rate
                            allowHalf
                            value={detail?.danhGia / 2}
                            count={5}
                            className="text-red-500 "
                        /></p>
                    <p>
                        Tình Trạng: &nbsp;
                        {
                            detail?.dangChieu
                                ? `Đang Chiếu`
                                : `Chưa chiếu`
                        }
                    </p >
                    <p>
                        Ngày Khởi Chiếu: &nbsp;
                        <span className="text-red-500">
                            {moment(detail?.ngayKhoiChieu).format("DD/MM/YYYY - hh:mm")}
                        </span>
                    </p>
                    <div className="h-full">
                        <button
                            onClick={() => {
                                navigate(`/local/${detail?.maPhim}`);
                            }}
                            className="theme-btn h-80 mt-10 "
                        >  ĐẶT VÉ
                        </button>
                    </div>
                </span>

            </div >
            <div className=" relative w-full overflow-hidden text-center pt-2" >
                <h2 className="font-medium bg-orange-500 text-white" style={{ fontSize: "32px" }}>TRAILER</h2>
                {/* <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" width="900" height="500" > </iframe> */}
                {/* <iframe src="https://www.youtube.com/embed/fSDsT3pSJCA" width="900" height="500" > </iframe> */}
                <iframe src={httpLink(detail?.trailer.slice(17, 28))} width="100% " height="300px"></iframe>
            </div>
            <span className="w-full">
                <h5 className="font-medium" style={{ fontSize: "24px" }}>Nội Dung Phim :</h5>
                {detail?.moTa}

            </span>



        </div >
    );

}
