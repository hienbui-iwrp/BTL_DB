import React from 'react'
import NavBar from './pages/NavBar'
import './styles/bootstrap.css'
import { Route, Switch } from "react-router";
import SinhVien from './pages/SinhVien';
import GiaoVien from './pages/GiaoVien';
import MonHoc from './pages/MonHoc';

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/SinhVien"><SinhVien/></Route>
                <Route exact path="/GiaoVien"><GiaoVien/></Route>
                <Route exact path="/MonHoc"><MonHoc/></Route>
            </Switch>
        </>
    )
}

export default App
