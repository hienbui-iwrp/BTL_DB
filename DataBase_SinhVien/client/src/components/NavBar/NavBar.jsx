import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "./logo.png";

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/SinhVien">
                        <img
                            src={Logo}
                            style={{
                                width: 50,
                            }}
                        />
                    </NavLink>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarColor03"
                    >
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    exact
                                    to="/SinhVien"
                                    activeClassName="active"
                                >
                                    Sinh viên
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    exact
                                    to="/GiaoVien"
                                    activeClassName="active"
                                >
                                    Giảng viên
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    exact
                                    to="MonHoc"
                                    activeClassName="active"
                                >
                                    Môn học
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
