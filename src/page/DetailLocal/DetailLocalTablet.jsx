


import React, { useEffect, useState } from 'react';
import { Button, Steps, Tabs, theme } from 'antd';
import { movieService } from '../../service/service';
import { NavLink, useParams, } from 'react-router-dom';
import moment from 'moment';

export default function DetailLocalTablet() {
    const [detail, setDetail] = useState();
    const [heThongRap, setHeThongRap] = useState([]);
    const [Rap, setRap] = useState();
    const [diaChi, setdiaChi] = useState();

    let { id } = useParams();
    const steps = [
        {
            title: 'Rạp',
            content: () => {
                return (
                    <>
                        <Tabs
                            className="border-1 items-center"
                            defaultActiveKey="1"
                            items={renderHeThongRap()}
                        /></>
                )

            },
        },
        {
            title: 'Địa Chỉ',
            content: () => {
                return (
                    <>
                        <Tabs
                            className="border-1 items-center"
                            defaultActiveKey="1"
                            items={renderlstCupRap()}
                        /></>
                )

            },
        },
        {
            title: 'Thời Gian',
            content: () => {
                return (
                    <>
                        <Tabs
                            className="border-1 items-center"
                            defaultActiveKey="1"
                            items={renderDsMovieRap()}
                        /></>
                )

            },
        },
    ];

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
    let renderDsMovie = (cumRap) => {
        return cumRap.danhSachPhim.map((movie) => {
            if (movie.tenPhim === detail.tenPhim) return (
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
            )
        })
    };
    let renderDsMovieRap = () => {
        return heThongRap.map((heThong) => {
            return {
                key: heThong.maHeThongRap,
                children: (
                    <Tabs
                        style={{ height: 400 }}
                        tabPosition="left"
                        items={heThong.lstCumRap.map((cumRap) => {
                            return {
                                key: cumRap.tenCumRap,
                                children: (
                                    <div style={{ height: 400, overflowY: "scroll" }}>
                                        {renderDsMovie(cumRap)}
                                    </div>
                                ),
                            };
                        })}
                    />
                ),
            };
        });
    }
    let renderlstCupRap = () => {
        return heThongRap.map((heThong) => {
            return {
                key: heThong.maHeThongRap,
                children: (
                    <Tabs
                        style={{ height: 400 }}
                        tabPosition="left"
                        items={heThong.lstCumRap.map((cumRap) => {
                            return {
                                key: cumRap.tenCumRap,
                                label: (
                                    <button className="text-left w-full py-2"
                                        onClick={() => {
                                            next()
                                            setdiaChi(cumRap.tenCumRap)
                                        }}
                                    >
                                        <h4 className="font-semibold text-green-600 uppercase">
                                            {cumRap.tenCumRap}
                                        </h4>
                                        <p className="text-gray-400">
                                            {cumRap.diaChi}
                                        </p>
                                        <p className="text-red-500 font-medium">[chi tiết]</p>
                                    </button>
                                ),
                            };
                        })}
                    />
                ),
            };


        });
    }
    let renderHeThongRap = () => {
        return heThongRap.map((heThong) => {
            return {
                key: heThong.maHeThongRap,
                label: <button
                    onClick={() => {
                        next()
                        setRap(heThong.maHeThongRap)
                    }}>
                    <img className="w-16" src={heThong.logo} alt="" />
                </button>,
            };
        });
    };
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };
    return (
        <div className='container pt-24  bg-gray-100' >
            <div className="flex">
                <div className="w-1/3 relative">
                    <img src={detail?.hinhAnh} alt="" />
                </div>
                <span className="w-2/3 pl-12 font-medium">
                    <p className=" " style={{ fontSize: "2rem" }}>{detail?.tenPhim}</p>
                </span>
            </div>
            <div className='container text-center'>
                <span className='font-medium  ' style={{ fontSize: "32px" }}>
                    Chi Tiết Đặt Vé  <br />
                </span>
                <div className=" w-full flex">
                    <div className="w-1/2 left-0">{Rap}</div>
                    <div className="w-1/2 text-center mr-12">{diaChi}</div>
                </div>

            </div>

            <>
                <Steps current={current} items={items} />
                <div style={contentStyle}>{steps[current].content()}</div>
                <div
                    style={{
                        marginTop: 24,
                    }}
                >

                    {current === 2 && (
                        <Button
                            className='container bg-orange-500 text-white'
                            style={{
                                marginTop: '2px',
                                marginBottom: '30px'
                            }}
                            onClick={() => {
                                prev()
                                setdiaChi("")
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {current === 1 && (
                        <Button
                            className='container bg-orange-500 text-white'
                            style={{
                                marginTop: '2px',
                                marginBottom: '30px'
                            }}
                            onClick={() => {
                                prev()
                                setRap("")
                            }}
                        >
                            Previous
                        </Button>
                    )}
                </div>
            </>

        </div >
    )
}
