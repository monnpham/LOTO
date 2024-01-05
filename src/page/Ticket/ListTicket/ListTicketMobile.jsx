// import React, { useEffect, useState } from 'react'
// import { ticketService } from '../../service/service'
// import { useParams } from 'react-router'

// export default function ListTicket() {
//     let { id } = useParams()
//     let [list, setList] = useState([])
//     let [dataChair, setDataChair] = useState([])
//     useEffect(() => {
//         ticketService
//             .getToBooking(id)
//             .then((res) => {
//                 setList(res.data.content)
//                 setDataChair(res.data.content.danhSachGhe)
//             })
//             .catch((err) => {

//             })

//     }, [])
//     console.log("🚀 ~ file: ListTicket.jsx:9 ~ ListTicket ~ list:", dataChair)

//     let renderThead = () => {
//         return (
//             <thead>
//                 {dataChair.map((item) => (
//                     <tr key={item.hang}>
//                         <tr></tr>
//                         {item.hang === '' &&
//                             item.danhSachGhe.map((ghe) => (
//                                 <td key={ghe.soGhe} className={ghe.soGhe}>
//                                     {ghe.soGhe}
//                                 </td>
//                             ))}
//                     </tr>
//                 ))}
//             </thead>
//         );
//     };
//     // let renderTbody = () => {
//     //     return (
//     //         <tbody>
//     //             {dataChair.map((item) => (
//     //                 <tr key={item.hang}>
//     //                     <td>{item.hang}</td>
//     //                     {item.hang !== '' &&
//     //                         item.danhSachGhe.map((ghe) => (
//     //                             <td key={ghe.soGhe} className={ghe.soGhe.substring(1, 2)}>
//     //                                 <button className=" w-10 h-10 bg-i" href="https://www.flaticon.com/free-icons/chair" title="chair icons" >
//     //                                 </button>
//     //                             </td>
//     //                         ))}
//     //                 </tr>
//     //             ))}
//     //         </tbody>
//     //     )
//     // }
//     let renderTbody = () => {
//         return (
//             <tbody>
//                 {dataChair.map((item) => (
//                     < td key={item.maGhe} >
//                         <button className=" w-10 h-10 bg-orange-300"> {item.tenGhe}
//                         </button>
//                     </td>
//                 ))
//                 }
//             </tbody >
//         )
//     }
//     return (
//         <div className='container pt-32 bg-blue-200'>
//             <div className="w-1/3">
//                 {/* {renderThead()} */}
//                 {renderTbody()}
//             </div>


//         </div>
//     )

// }

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ticketService } from "../../../service/service";
import toast from "react-hot-toast";

export default function ListTicketTablet() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [detailRoom, setDetailRoom] = useState([]);
    const [selectChair, setSelectChair] = useState([]);
    let user = JSON.parse(localStorage.getItem("USER"));

    let getBookingRoom = () => {
        ticketService.getToBooking(id)
            .then((res) => {
                setDetailRoom(res.data.content);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        getBookingRoom()
    }, [])

    let handleSelectChair = (ghe) => {
        if (ghe.daDat) {
            return;
        }
        if (isSelected(ghe)) {
            setSelectChair((prevSelectChair) =>
                prevSelectChair.filter((chair) => chair.maGhe !== ghe.maGhe)
            );
        } else {
            setSelectChair((prevSelectChair) => [...prevSelectChair, ghe])
        }
    };
    let isSelected = (ghe) => {
        return selectChair?.some((chair) => chair.maGhe === ghe.maGhe);
    };
    let renderSelectedChair = () => {
        return selectChair?.map((ghe) => {
            return <span key={ghe.maGhe}>Ghế {ghe.tenGhe}, </span>;
        });
    };
    let renderTotal = () => {
        return selectChair.reduce((sum, { giaVe }) => {
            return sum + giaVe;
        }, 0);
    };

    let renderBooking = () => {
        return (
            detailRoom?.danhSachGhe &&
            detailRoom?.danhSachGhe.map((ghe) => {
                return (
                    <span
                        key={ghe.maGhe}
                        className={`${ghe.loaiGhe === "Vip" ? "gheVipMobile" : "gheThuongMobile"
                            } ${ghe.daDat === true ? "gheDaDatMobile" : "cursor-pointer"
                            }`}

                        onClick={() => handleSelectChair(ghe)}
                        style={{
                            backgroundColor: isSelected(ghe) ? "green" : "",
                            fontSize: "8px",
                            fontWeight: "500"
                        }}
                    >
                        {ghe.daDat === false ? ghe.tenGhe : "X"}
                    </span>
                );
            })
        );
    };
    let renderImg = () => {
        let { hinhAnh } =
            detailRoom?.thongTinPhim || {};
        return <img style={{ width: "50%", margin: "auto", height: "360px" }} src={hinhAnh} alt="" />

    }
    let renderTicket = () => {
        let { diaChi, gioChieu, ngayChieu, tenCumRap, tenPhim, tenRap } =
            detailRoom?.thongTinPhim || {};
        return (
            <table className=" tableBuyTicket text-left w-full">
                <tbody className="font-title">
                    <tr>
                        <th className="font-semibold w-1/4">Tên phim:</th>
                        <td>{tenPhim}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Cụm rạp:</th>
                        <td>{tenCumRap}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Địa chỉ:</th>
                        <td>{diaChi}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Rạp:</th>
                        <td>{tenRap}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Suất chiếu:</th>
                        <td>
                            {ngayChieu} - {gioChieu}
                        </td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Chọn:</th>
                        <td>{renderSelectedChair()}</td>
                    </tr>
                    <tr>
                        <th className="font-semibold">Tổng tiền:</th>
                        <td className="text-4xl">
                            {renderTotal().toLocaleString("vi")} VND
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };
    let handleBuyTicket = () => {
        if (selectChair.length === 0) {
            return toast.error("Vui lòng chọn ghế trước");
        }
        let danhSachVe = selectChair.map((ghe) => {
            return {
                maGhe: ghe.maGhe,
                giaVe: ghe.giaVe,
            };
        });
        let listVe = {
            maLichChieu: id,
            danhSachVe,
        };
        console.log("🚀 ~ file: ListTicket.jsx:221 ~ handleBuyTicket ~ listVe:", listVe)
        if (user) {
            ticketService
                .bookingTicket(listVe)
                .then((res) => {
                    setSelectChair([]);
                    toast.success(res.data.content);
                    getBookingRoom();
                })
                .catch((err) => {
                    toast.error("Mua vé thất bại!");
                    console.log("🚀👾👽 ~ err:", err);
                });
        } else {
            toast.error("Bạn chưa đăng nhập. Hãy đăng nhập rồi đặt vé lại");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };


    return (
        <div className="container bg-orange-200">
            <div >
                <div className="flex py-1 gap-5 justify-between w-full mt-20">
                    <div className="pr-1">
                        <span style={{ lineHeight: "30px", borderRadius: "0 0 25px 25px", border: "solid 1px" }} className=" mt-3 block text-center w-full h-8 bg-blue-100">Màn Hình</span>
                        <div className="grow grid grid-cols-16 gap-3  mt-8 pr-2">
                            {renderBooking()}
                        </div>
                        <div className="flex items-center justify-center gap-3 mt-5">
                            <span className="gheThuong inline-block"></span>
                            <span className="text-slate-950">Ghế thường</span>

                            <span className="gheVip inline-block"></span>
                            <span className="text-slate-950">Ghế Vip</span>

                            <span className="gheDaDat inline-block">X</span>
                            <span className="text-slate-950">Ghế đã đặt</span>
                        </div>
                    </div>

                </div>
                <div className="bg-slate-800 text-white mt-20 h-full pb-1 mb-2">
                    {renderImg()}
                    {renderTicket()}
                    <div
                        style={{ width: "80%", borderRadius: "10px" }}
                        className="bg-red-500 h-16  ml-12 mb-2 text-white text-2xl font-bold text-center leading-[64px] hover:bg-red-400 cursor-pointer"
                        onClick={() => {
                            handleBuyTicket();
                        }}
                    >
                        ĐẶT VÉ
                    </div>
                </div>
            </div >
        </div>
    );
}

