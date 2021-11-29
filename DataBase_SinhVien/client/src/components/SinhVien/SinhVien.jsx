import React, { useEffect, useState } from "react";
import "../../styles/student.css";
import SinhViens from "./SinhViens";

const SinhVien = () => {
    const [StudentTemp, setStudentTemp] = useState({
        mssv: "",
        ho: "",
        ten: "",
        tinhTrang: "Tình Trạng",
        ngaySinh: "",
        gioiTinh: "Giới tính",
        hoKhau: "",
        khoa: "Khoa",
        tenLopChuNhiem: "Lớp",
    });
    const [sex, setsex] = useState("Giới tính");
    const [search, setsearch] = useState("");
    const [Students, setStudents] = useState([]);
    const [Faculties, setFaculties] = useState([]);
    const [faculty, setfaculty] = useState("Khoa");
    const [classes, setclasses] = useState([]);

    const fetchData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/sinhvien/khoa", requestOptions)
            .then((response) => response.json())
            .then((result) => setFaculties(result))
            .catch((error) => console.log("error", error));

        fetch("https://localhost:5001/api/sinhvien/lopchunhiem", requestOptions)
            .then((response) => response.json())
            .then((result) => setclasses(result))
            .catch((error) => console.log("error", error));

        fetch("https://localhost:5001/api/sinhvien", requestOptions)
            .then((response) => response.json())
            .then((result) => setStudents(result))
            .catch((error) => console.log("error", error));
    };

    const SearchSinhvien = (search, faculty, sex) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `https://localhost:5001/api/sinhvien/search?s=${search}&makhoa=${faculty}&gioitinh=${sex}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setStudents(result))
            .catch((error) => console.log("error", error));
    };

    const InsertSinhVien = (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            mssv: StudentTemp.mssv,
            ho: StudentTemp.ho,
            ten: StudentTemp.ten,
            tinhTrang: StudentTemp.tinhTrang,
            ngaySinh: StudentTemp.ngaySinh,
            gioiTinh: StudentTemp.gioiTinh,
            hoKhau: StudentTemp.hoKhau,
            khoa: StudentTemp.khoa,
            tenLopChuNhiem: StudentTemp.tenLopChuNhiem,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/sinhvien", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                if (result === "1") setStudents([...Students, StudentTemp]);
            })
            .catch((error) => console.log("error", error));
        setStudentTemp({
            mssv: "",
            ho: "",
            ten: "",
            tinhTrang: "Tình Trạng",
            ngaySinh: "",
            gioiTinh: "Giới tính",
            hoKhau: "",
            khoa: "Khoa",
            tenLopChuNhiem: "Lớp",
        });
    };

    useEffect(() => {
        console.log("reload");
        fetchData();
    }, []);

    return (
        <>
            <div className="student">
                <div className="student-header">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo mssv, tên"
                        onChange={(e) => {
                            setsearch(e.target.value);
                            SearchSinhvien(e.target.value, faculty, sex);
                        }}
                    />
                    <select
                        name="Khoa"
                        id="Khoa"
                        onChange={(e) => {
                            setfaculty(e.target.value);
                            SearchSinhvien(search, e.target.value, sex);
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
                        name=""
                        id=""
                        onChange={(e) => {
                            setsex(e.target.value);
                            SearchSinhvien(search, faculty, e.target.value);
                        }}
                    >
                        <option value="Giới tính">Giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
                <form className="student-list" onSubmit={InsertSinhVien}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">MSSV</th>
                                <th scope="col">Họ</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Tình Trạng</th>
                                <th scope="col">Ngày sinh</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Hộ Khẩu</th>
                                <th scope="col">Khoa</th>
                                <th scope="col">Lớp</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="MSSV"
                                        value={StudentTemp.mssv}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                mssv: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Họ"
                                        value={StudentTemp.ho}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
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
                                        value={StudentTemp.ten}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                ten: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={StudentTemp.tinhTrang}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                tinhTrang: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="Tình trạng">
                                            Tình trạng
                                        </option>
                                        <option value="Đang học">
                                            Đang học
                                        </option>
                                        <option value="Bảo lưu">Bảo lưu</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        required
                                        placeholder="Ngày sinh"
                                        value={StudentTemp.ngaySinh}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                ngaySinh: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={StudentTemp.gioiTinh}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
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
                                        placeholder="Hộ Khẩu"
                                        value={StudentTemp.hoKhau}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                hoKhau: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={StudentTemp.khoa}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                khoa: e.target.value,
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
                                    <select
                                        value={StudentTemp.tenLopChuNhiem}
                                        onChange={(e) =>
                                            setStudentTemp({
                                                ...StudentTemp,
                                                tenLopChuNhiem: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">Lớp</option>
                                        {classes.map((cl, index) => {
                                            if (cl.maKhoa === StudentTemp.khoa)
                                                return (
                                                    <option
                                                        key={index}
                                                        value={
                                                            cl.tenLopChuNhiem
                                                        }
                                                    >
                                                        {cl.tenLopChuNhiem}
                                                    </option>
                                                );
                                        })}
                                    </select>
                                </td>
                                <td>
                                    <button type="submit">Thêm</button>
                                </td>
                            </tr>
                            <SinhViens Students={Students} />
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
};

export default SinhVien;
