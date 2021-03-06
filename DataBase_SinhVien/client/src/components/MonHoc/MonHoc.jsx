import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../styles/subject.css';
import '../../styles/student.css';
import '../../styles/all.css'

import { useState, useEffect } from 'react';

import Info from './Info';
import Detail from './Detail';

const MonHoc = () => {
    const [subjectList, setSubjectList] = useState( []);
    const [nhomMon, setNhomMon] = useState([]);
    const [giangVien, setGiangVien] = useState([]);
    const [khoa, setKhoa] = useState([]);
    const [hocMon, setHocMon] = useState([])
    const [render, setRender] = useState(true);
    const fetchData = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch("https://localhost:5001/api/monhoc", requestOptions)
            .then((response) => response.json())
            .then((result) => setSubjectList(result))
            .catch((error) => console.log("error", error));
        fetch("https://localhost:5001/api/monhoc/nhommon", requestOptions)
            .then((response) => response.json())
            .then((result) => setNhomMon(result))
            .catch((error) => console.log("error", error));
        fetch("https://localhost:5001/api/sinhvien/khoa", requestOptions)
            .then((response) => response.json())
            .then((result) => setKhoa(result))
            .catch((error) => console.log("error", error));
        fetch("https://localhost:5001/api/monhoc/hocmon", requestOptions)
            .then((response) => response.json())
            .then((result) => setHocMon(result))
            .catch((error) => console.log("error", error));
        fetch("https://localhost:5001/api/giangvien", requestOptions)
            .then((response) => response.json())
            .then((result) => {setGiangVien(result)})
            .catch((error) => console.log("error", error));
    };

    const SearchMonHoc = (search) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        fetch(
            `https://localhost:5001/api/monhoc/search?s=${search}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => setSubjectList(result))
            .catch((error) => console.log("error", error));
    };

    useEffect(()=>{
        fetchData();
    },[render])
    // console.log(nhomMon);
    return (
        <div className="student">
            <div className="student-header">
                <input
                    type="text"
                    placeholder="T??m ki???m theo t??n"
                    onChange = {e=>{
                        SearchMonHoc(e.target.value);
                    }}
                />
            </div>
            <div className="student-list">
                <div className = 'subject-container'>
                    <tr className = "subject__field">
                        <th className="field__content">M?? m??n h???c</th>
                        <th className="field__content">T??n m??n h???c</th>
                        <th className="field__content text--center">S??? t??n ch???</th>
                        <th className="field__content text--center">
                            <NewMonHoc 
                                subjectList = {subjectList} 
                                setRender = {setRender}
                            />
                        </th>
                    </tr>
                    <div className = "subject-list">
                        {
                            subjectList.map(subject=>{
                                return (
                                    <div>
                                        <Info 
                                            subject = {subject}
                                            setRender = {setRender}    
                                        />
                                        <Detail 
                                            subject = {subject} 
                                            nhomMon = {nhomMon}
                                            giangVien = {giangVien}
                                            hocMon = {hocMon}
                                            setRender = {setRender}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>  
            
        </div>
    )
}

export default MonHoc

function NewMonHoc({subjectList, setRender}){
    let newSubject = subjectList[0];
    return (
        <Popup trigger={<button className = "button--edit">Th??m m??n h???c</button>} modal>
        {close=>(
            <div className = "modal-box">
                <div className = "modal-header">
                    M??n h???c m???i
                </div>
                <div className = "modal-body">
                <form  onSubmit = {(e) =>{
                    e.preventDefault();
                    insertMonHoc(newSubject)
                    setRender(prev=>!prev)
                    close();
                }}>
                    <p className = "modal-input">
                        <label className = "input-field">M?? m??n h???c</label>
                        <input type = "text" className = "input-body" required 
                            onChange = {(e)=>{
                                newSubject.maMonHoc = e.target.value
                            }} 
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">T??n m??n h???c</label>
                        <input type = "text" className = "input-body" required 
                             onChange = {(e)=>{
                                newSubject.ten = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">S??? t??n ch???</label>
                        <input type = "text" className = "input-body" required 
                             onChange = {(e)=>{
                                newSubject.tinChi = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">H??? s??? ??i???m BTL</label>
                        <input type = "number" className = "input-body" 
                            onChange = {(e)=>{
                                newSubject.heSoBtl = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">H??? s??? ??i???m BT</label>
                        <input type = "number" className = "input-body" 
                            onChange = {(e)=>{
                                newSubject.heSoBt = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">H??? s??? ??i???m KT</label>
                        <input type = "number" className = "input-body" 
                            onChange = {(e)=>{
                                newSubject.heSoKt = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">H??? s??? ??i???m TN</label>
                        <input type = "number" className = "input-body"
                            onChange = {(e)=>{
                                newSubject.heSoTn = e.target.value
                            }}
                        ></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">H??? s??? ??i???m Thi</label>
                        <input type = "number" className = "input-body"
                            onChange = {(e)=>{
                                newSubject.heSoThi = e.target.value
                            }}
                        ></input>
                    </p>

                    <div className = "modal-button">
                        <button className = "button--delete" type = "button" onClick = {()=>{close()}}> H???y</button>
                        <button className = "button--edit" type = "submit" > L??u</button>
                    </div>
                </form>
                </div>
            </div>
        )}
        </Popup> 
    )
}

function insertMonHoc(newSubject){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        maMonHoc: newSubject.maMonHoc,
        ten: newSubject.ten,
        tinChi: newSubject.tinChi,
        heSoBtl: newSubject.heSoBtl,
        heSoBt: newSubject.heSoBt,
        heSoKt: newSubject.heSoKt,
        heSoTn: newSubject.heSoTn,
        heSoThi: newSubject.heSoThi
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://localhost:5001/api/monhoc", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))    
        .catch((error) => console.log("error", error));
}


