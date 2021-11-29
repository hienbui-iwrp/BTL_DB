import React, { useEffect, useState } from "react";
import "../../styles/student.css";
import GiaoViens from "./Giaoviens";

const GiaoVien = () => {
    const [sex, setsex] = useState("Giới tính");
    const [search, setsearch] = useState("");
    const [Faculties, setFaculties] = useState([]);
    const [faculty, setfaculty] = useState("Khoa");
    const [TeacherTemp, setTeacherTemp] = useState({
        mscb: "",
        ho: "",
        ten: "",
        chuyenMon: "",
        gioiTinh: "Giới tính",
        ngaySinh: "",
        hocHam: "",
        maKhoa: "Khoa",
    });
    const [Teachers, setTeachers] = useState([]);

    const InsertGiaoVien = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        console.log(TeacherTemp);
        var raw = JSON.stringify({
            mscb: TeacherTemp.mscb,
            ho: TeacherTemp.ho,
            ten: TeacherTemp.ten,
            chuyenMon: TeacherTemp.chuyenMon,
            gioiTinh: TeacherTemp.gioiTinh,
            ngaySinh: TeacherTemp.ngaySinh,
            hocHam: TeacherTemp.hocHam,
            maKhoa: TeacherTemp.maKhoa,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/giangvien", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result === "1") setTeachers([...Teachers, TeacherTemp]);
            })
            .catch((error) => console.log("error", error));
        setTeacherTemp({
            mscb: "",
            ho: "",
            ten: "",
            chuyenMon: "",
            gioiTinh: "Giới tính",
            ngaySinh: "",
            hocHam: "",
            maKhoa: "Khoa",
        });
    };

    const SearchGiaoVien = (search, faculty, sex) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `https://localhost:5001/api/giangvien/search?s=${search}&makhoa=${faculty}&gioitinh=${sex}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setTeachers(result))
            .catch((error) => console.log("error", error));
    };

    const fetchData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/giangvien", requestOptions)
            .then((response) => response.json())
            .then((result) => setTeachers(result))
            .catch((error) => console.log("error", error));

        fetch("https://localhost:5001/api/sinhvien/khoa", requestOptions)
            .then((response) => response.json())
            .then((result) => setFaculties(result))
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="student">
                <div className="student-header">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mscb, tên"
                        onChange={(e) => {
                            setsearch(e.target.value);
                            SearchGiaoVien(e.target.value, faculty, sex);
                        }}
                    />
                    <select
                        onChange={(e) => {
                            setfaculty(e.target.value);
                            SearchGiaoVien(search, e.target.value, sex);
                        }}
                    >
                        <option value="Khoa">Khoa</option>
                        {Faculties.map((faculty, index) => {
                            return (
                                <option key={index} value={faculty}>
                                    {faculty}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={(e) => {
                            setsex(e.target.value);
                            SearchGiaoVien(search, faculty, e.target.value);
                        }}
                    >
                        <option value="Giới tính">Giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <form className="teacher-list" onSubmit={InsertGiaoVien}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">MSCB</th>
                                <th scope="col">Họ</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Học hàm/ học vị</th>
                                <th scope="col">Khoa</th>
                                <th scope="col">Chuyên môn</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MSCB"
                                        value={TeacherTemp.mscb}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                mscb: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Họ"
                                        value={TeacherTemp.ho}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                ho: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Tên"
                                        value={TeacherTemp.ten}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                ten: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        required
                                        value={TeacherTemp.ngaySinh}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                ngaySinh: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={TeacherTemp.gioiTinh}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                gioiTinh: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Giới tính">
                                            Giới tính
                                        </option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Học hàm, học vị"
                                        value={TeacherTemp.hocHam}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                hocHam: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        name="Khoa"
                                        id="Khoa"
                                        value={TeacherTemp.maKhoa}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                maKhoa: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Khoa</option>
                                        {Faculties.map((faculty, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={faculty}
                                                >
                                                    {faculty}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Chuyên môn"
                                        value={TeacherTemp.chuyenMon}
                                        onChange={(e) =>
                                            setTeacherTemp({
                                                ...TeacherTemp,
                                                chuyenMon: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <button type="submit">Thêm</button>
                                </td>
                            </tr>
                            <GiaoViens Teachers={Teachers} />
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default GiaoVien;
