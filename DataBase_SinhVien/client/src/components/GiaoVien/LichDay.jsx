import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LichDay = ({ mscb }) => {
    const [schedule, setschedule] = useState([]);
    const fetchData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            "https://localhost:5001/api/giangvien/lichday?mscb=" + mscb,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setschedule(result))
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Popup
                trigger={
                    <button type="button" className="button">
                        Lịch dạy
                    </button>
                }
                modal
            >
                <div className="schedule">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Mã môn học</th>
                                <th scope="col">Tên môn học</th>
                                <th scope="col">Tín chỉ</th>
                                <th scope="col">Nhóm môn</th>
                                <th scope="col">Tiết</th>
                                <th scope="col">Thứ</th>
                                <th scope="col">Phòng học</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((s, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{s.maMonHoc}</td>
                                        <td>{s.ten}</td>
                                        <td>{s.tinChi}</td>
                                        <td>{s.maNhom}</td>
                                        <td>
                                            {s.tietBatDau + "-" + s.tietKetThuc}
                                        </td>
                                        <td>{s.ngayTrongTuan}</td>
                                        <td>{s.tenPhong}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Popup>
        </>
    );
};

export default LichDay;
