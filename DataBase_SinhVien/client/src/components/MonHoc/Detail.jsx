import React from 'react';
import '../../styles/subject.css';
import '../../styles/all.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function({subject, nhomMon, giangVien, hocMon, setRender}){

    return (
        <div className = {`class-list ${subject.maMonHoc}`}>
            <div className = "class-list__new">
                <span> Các lớp hiện có </span>
                <NewNhomMon giangVien = {giangVien} nhomMon = {nhomMon} setRender= {setRender} subject = {subject}/>
            </div>
            <div className = "class-list__field">
                <tr className = "subject__field" >
                    <th className ="field__content">Nhóm lớp</th>
                    <th className ="field__content">Kì</th>
                    <th className ="field__content">Sĩ số</th>
                    <th className ="field__content">Giảng viên</th>
                </tr>
                {
                    nhomMon.map((nhom)=>{
                        if(nhom.maMonHoc === subject.maMonHoc)
                            return <Schedule 
                                        nhom = {nhom} 
                                        giangVien = {giangVien}
                                        hocMon = {hocMon}
                                        setRender= {setRender}
                                    />
                    })
                }
                
            </div>
        </div>
    )
}


function Schedule({nhom, giangVien, hocMon, setRender}){
    return (
        <div >
            <tr className = "subject__body">
                <th className ="body__content">{nhom.maNhom}</th>
                <th className ="body__content">{nhom.kiHoc}</th>
                <th className ="body__content">{nhom.soLuong}</th>
                <th className ="body__content">{getTenGiangVien(nhom, giangVien)}</th>
                <th className ="field__content">
                    <Popup trigger={<button className = "button--delete">Xóa</button>} modal>
                        {close=>(
                            <div>
                                <div className = "modal-header">Xóa môn?</div>
                                <div className = "modal-button">
                                    <button className = "button--edit" onClick= {close}> Hủy</button>
                                    <button className = "button--delete" onClick = {(e)=>{
                                        e.preventDefault();
                                        deleteNhomMon(nhom);
                                        setRender(prev=> !prev);
                                        close();
                                    }}> Xóa</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    
                </th>
            </tr>
            <div className = "class-list__sched">
                <tr className = "subject__field" >
                    <th className ="field__content">Thứ</th>
                    <th className ="field__content">Tiết bắt đầu</th>
                    <th className ="field__content">Tiết kết thúc</th>
                    <th className ="field__content">Phòng </th>
                </tr>
                <tr className = "subject__body" style = {{marginBottom: "20px"}}>
                    <th className ="body__content">{nhom.ngayTrongTuan}</th>
                    <th className ="body__content">{nhom.tietBatDau}</th>
                    <th className ="body__content">{nhom.tietKetThuc}</th>
                    <th className ="body__content">{getTenPhong(nhom, hocMon)}</th>
                </tr>
            </div>
        </div>
    )
}


function NewNhomMon({giangVien, nhomMon, setRender, subject}){
    let nhomMoi = {
        nhomMon: "",
        kiHoc: "",
        mscb:"001253",
        ngayTrongTuan:2,
        tietBatDau:0,
        tietKetThuc:0,
        maMonHoc: subject.maMonHoc,
        soLuong: 0
    }
    
    // console
    
    // console.log(setRender);
    return (
        <Popup trigger={<button className = "button--edit" >Thêm mới</button>} modal>
        {close =>(
            <div className = "modal-box">
                <div className = "modal-header">
                    Thêm lớp mới
                </div>
                <div className = "modal-body">
                <form >
                    <p className = "modal-input">
                        <label className = "input-field">Mã nhóm</label>
                        <input type = "text" className = "input-body" required onChange = {(e)=>{
                            nhomMoi.maNhom = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Kì học</label>
                        <input type = "text" className = "input-body" required onChange = {(e)=>{
                            nhomMoi.kiHoc = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Ngày học</label>
                        <select className = "input-body" onChange = {(e)=>{
                            nhomMoi.ngayTrongTuan = e.target.value;
                        }}>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                        </select>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Tiết bắt đầu</label>
                        <input type = "number" className = "input-body" required onChange = {(e)=>{
                            nhomMoi.tietBatDau = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Tiết kết thúc</label>
                        <input type = "number" className = "input-body" required onChange = {(e)=>{
                            nhomMoi.tietKetThuc = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Mã số giảng viên</label>
                        <select className = "input-body" onChange = {(e)=>{
                            nhomMoi.mscb = e.target.value;
                        }}>
                           {giangVien.map((giangVien)=>{
                               return <option>{giangVien.mscb}</option>;
                           })}
                        </select>
                    </p>
                    <div className = "modal-button">
                        <button className = "button--delete" type = "button" onClick ={close}> Hủy</button>
                        <button className = "button--edit" type = "submit" onClick = {(e)=>{
                            console.log(nhomMoi.maMonHoc)
                            e.preventDefault();
                            insertNhomMon(nhomMoi);
                            close()
                            setRender(prev=>!prev);
                        }}> Lưu</button>
                    </div>
                </form>
                </div>
            </div>
        )}
        </Popup> 
    )
}

function getTenGiangVien(nhom, giangVien){
    let curGiangVien = giangVien.find(curGiangVien=>{
        return nhom.mscb === curGiangVien.mscb;
    })
    return curGiangVien?.ho +" "+ curGiangVien?.ten;
}

function getTenPhong(nhom, hocMon){
    
    let room = hocMon.find((room)=>{
        return room?.maNhom === nhom?.maNhom && room?.kiHoc === nhom?.kiHoc && room?.maMonHoc === nhom?.maMonHoc
    })
    // console.log(room);
    return room?.tenPhong
}


function insertNhomMon(nhomMon){
    // console.log(nhomMon);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        maMonHoc: nhomMon.maMonHoc,
        maNhom: nhomMon.maNhom,
        kiHoc: nhomMon.kiHoc,
        ngayTrongTuan: nhomMon.ngayTrongTuan,
        tietBatDau: nhomMon.tietBatDau,
        tietKetThuc: nhomMon.tietKetThuc,
        mscb: nhomMon.mscb,
        soLuong: 0
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    fetch("https://localhost:5001/api/monhoc/nhommon", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))    
        .catch((error) => console.log("error", error));
}


function deleteNhomMon(nhomMon){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        maMonHoc: nhomMon.maMonHoc,
        maNhom: nhomMon.maNhom,
        kiHoc: nhomMon.kiHoc,
        ngayTrongTuan: nhomMon.ngayTrongTuan,
        tietBatDau: nhomMon.tietBatDau,
        tietKetThuc: nhomMon.tietKetThuc,
        mscb: nhomMon.mscb
    });

    
    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://localhost:5001/api/monhoc/nhommon", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))    
        .catch((error) => console.log("error", error));
}