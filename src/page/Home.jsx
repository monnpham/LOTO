import { Button, Col, Row } from 'antd';
import imgVe from '../img/ve3d.png'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Home() {
    let { id } = useParams();
    const [arr, setArr] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);

    useEffect(() => {
        fetch('https://65985e18668d248edf24861d.mockapi.io/loto', {
            method: 'GET',
            // headers: { 'content-type': 'application/json' },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then(data => {
                setArr(data)
            })
            .catch(error => {
                // Handle error as needed
            });
    }, []);
    const upload = () => {
        console.log("🚀 ~ render ~ arr[id]?.arrso:", arr[id]?.arrso)
        return arr[id]?.arrso

    }
    const s = upload()

    const handleButtonClick = (index) => {
        // Toggle the clicked status of the button at the specified index
        setClickedButtons((prevClickedButtons) => {
            const newClickedButtons = [...prevClickedButtons];
            newClickedButtons[index] = !newClickedButtons[index];
            return newClickedButtons;
        });
    };
    const render = () => {
        if (s) {
            return s.map((item, index) => {
                return <button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    className={`btn-so ${clickedButtons[index] ? 'clicked' : ''}`}
                >
                    <h1 style={{ fontSize: "32px", fontWeight: "400", color: "#9B1815", fontFamily: "Paytone One" }}>{item.so}</h1>
                </button>
            })
        }
    }
    const resetButtons = () => {
        setClickedButtons(Array(s?.length).fill(false));
    };


    return (
        <div className='container grid items-center'>
            <div className="mt-12 ml-64">
                <div className="hinh">
                    <img src={imgVe} alt="" />
                </div>
                <div className="so text-center ml-64 " style={{ width: "70%" }}>
                    <div className="mr-10 mt-t"><h1 className='tenn'>{arr[id]?.ten}</h1></div>
                    <Row className=' ml-40 mt-mt' style={{ rowGap: "2px" }} gutter={[16, 24]}>
                        {render()}
                    </Row>
                </div>
                <div className="mt-5  ">
                    <Button
                        onClick={resetButtons} // Call the resetButtons function on "RESTART" button click
                        className='' type="primary" block style={{ width: "67%" }}>
                        RESTART
                    </Button>
                </div>

            </div>

        </div>
    )
}
