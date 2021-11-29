import React from 'react';
import '../../styles/subject.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



export default function({subject, setRender}){
    let detail = false
    
    return (
        <tr className = "subject__body"
            onClick = {()=>{
                        let classList = document.querySelector(`.${subject.maMonHoc}`)
                        if (!detail) {
                            classList.classList.add('class-list--active');
                            detail = true;
                        }
                        else{
                            classList.classList.remove('class-list--active');
                            detail = false;
                        }
                    }}
        >
            <th className="body__content">{subject.maMonHoc}</th>
            <th className="body__content">{subject.ten}</th>
            <th className="body__content text--center">{subject.tinChi}</th>
            {/* <th className="body__content body__content--long">{
                getTenKhoa(subject, khoa, giangVien, nhomMon)
            }</th> */}
            <th className="body__content body__content--short text--center" >
                <EditMonHoc subject = {subject} setRender={setRender}/>
            </th>
            <th className="body__content body__content--short text--center">
            <Popup trigger={<button className = "button--delete ">Xóa</button>} modal>
                {close=>(
                    <div>
                        <div className = "modal-header">Xóa môn?</div>
                        <div className = "modal-button">
                            <button className = "button--edit" onClick= {close}> Hủy</button>
                            <button className = "button--delete" onClick = {(e)=>{
                                // e.preventDefault();
                                deleteMonHoc(subject);
                                setRender(prev=> !prev);
                                close();
                            }}> Xóa</button>
                        </div>
                    </div>
                )}
            </Popup>             
            </th>
        </tr>
    )
}

function EditMonHoc({subject, setRender}){
    let temp = subject;
    return (
        <Popup trigger={<button className = "button--edit " >Chỉnh sửa</button>} modal>
        {close => (
     
            <div className = "modal-box">
                <div className = "modal-header">
                    Chỉnh sửa thông tin
                </div>
                <div className = "modal-body">
                <form >
                    
                    <p className = "modal-input">
                        <label className = "input-field">Tên môn học</label>
                        <input type = "text" className = "input-body" required defaultValue = {subject?.ten} onChange = {(e)=>{
                            temp.ten = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Số tín chỉ</label>
                        <input type = "text" className = "input-body" required defaultValue = {subject?.tinChi} onChange = {(e)=>{
                            temp.tinChi = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Hệ số điểm BTL</label>
                        <input type = "number" className = "input-body" defaultValue = {subject?.heSoBtl} onChange = {(e)=>{
                            temp.heSoBtl = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Hệ số điểm BT</label>
                        <input type = "number" className = "input-body" defaultValue = {subject?.heSoBt} onChange = {(e)=>{
                            temp.heSoBt = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Hệ số điểm KT</label>
                        <input type = "number" className = "input-body" defaultValue = {subject?.heSoKt} onChange = {(e)=>{
                            temp.heSoKt = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Hệ số điểm TN</label>
                        <input type = "number" className = "input-body" defaultValue = {subject?.heSoTn} onChange = {(e)=>{
                            temp.heSoTn = e.target.value;
                        }}></input>
                    </p>
                    <p className = "modal-input">
                        <label className = "input-field">Hệ số điểm Thi</label>
                        <input type = "number" className = "input-body" defaultValue = {subject?.heSoThi} onChange = {(e)=>{
                            temp.heSoThi = e.target.value;
                        }}></input>
                    </p>

                    <div className = "modal-button">
                        <button className = "button--delete" type = "button" onClick = {()=>{
                            temp = subject;
                            console.log(temp)
                            close();
                        }}> Hủy</button>
                        <button className = "button--edit" type = "submit" onClick ={(e)=>{
                            e.preventDefault();
                            updateMonHoc(temp);
                            console.log(temp)
                            close();
                            setRender(prev=>!prev)
                        }}> Lưu</button>
                    </div>
                </form>
                </div>
            </div>
        )}
        </Popup> 
    )
}

function deleteMonHoc(subject){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
        maMonHoc: subject.maMonHoc,
    });

    var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("https://localhost:5001/api/monhoc", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))    
        .catch((error) => console.log("error", error));
}

function updateMonHoc(newSubject){
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
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    console.log(newSubject)
    fetch("https://localhost:5001/api/monhoc", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))    
        .catch((error) => console.log("error", error));
}