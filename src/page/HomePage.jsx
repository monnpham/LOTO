import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { userService } from "../service/service";
import { Button } from 'antd';

export default function HomePage() {
    const [arr, setArr] = useState([]);
    console.log("🚀 ~ HomePage ~ arr:", arr)
    let navigate = useNavigate();

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

    const render = () => {
        return arr?.map((item, index) => {
            return (
                <Button
                    key={index} // Add a unique key to each button
                    onClick={() => {
                        navigate(`/base/${index}`);
                    }}
                    className='' type="primary" block
                    style={{ width: "50%", margin: "2px" }}
                >
                    {item.ten}
                </Button>
            );
        });
    }

    return (
        <div className='container w-full'>
            <div className="text-center">
                <div className="ds">
                    <h1>DANH SÁCH NGƯỜI CHƠI</h1>
                    <div className="grid justify-items-center">
                        {render()} {/* Call the render function */}
                    </div>
                </div>
            </div>
        </div>
    )
}
