
using System.Net.NetworkInformation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace DataBase_SinhVien.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MonHocController : ControllerBase
    {
        [HttpGet]
        public async Task<List<MonHoc>> GetAllMonHoc()
        {
            string query = @"SELECT MaMonHoc, Ten, TinChi, HeSoBtl, HeSoBt, HeSoKt, HeSoTn, HeSoThi FROM MonHoc;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<MonHoc>();
        }

        [HttpGet("search")]
        public async Task<List<MonHoc>> GetSearchMonHoc(string s)
        {
            string query = @$"SELECT MaMonHoc, Ten, TinChi, HeSoBtl, HeSoBt, HeSoKt, HeSoTn, HeSoThi 
                            FROM MonHoc
                            where Ten like N'%{s}%'";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<MonHoc>();
        }

        [HttpGet("nhommon")]
        public async Task<List<NhomMon>> GetAllNhomMon()
        {
            string query = @"SELECT MaNhom, KiHoc, NgayTrongTuan, TietBatDau, TietKetThuc, MSCB, MaMonHoc, SoLuong FROM NhomMon;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<NhomMon>();
        }


        [HttpGet("hocmon")]
        public async Task<List<HocMon>> GetAllHocMon()
        {
            string query = @"SELECT MSSV, TenPhong, MaNhom, MaMonHoc, KiHoc FROM HocMon;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<HocMon>();
        }

        [HttpPost]
        public async void NewMonHoc(MonHoc newMon)
        {
            string query = @$"insert into MonHoc(MaMonHoc, Ten, TinChi, HeSoBtl, HeSoBt, HeSoKt, HeSoTn, HeSoThi)
                            values ('{newMon.MaMonHoc}',N'{newMon.Ten}','{newMon.TinChi}','{newMon.HeSoBtl}','{newMon.HeSoBt}','{newMon.HeSoKt}','{newMon.HeSoTn}','{newMon.HeSoThi}')";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);
        }

        [HttpPut]
        public async Task<int> UpdateMonHoc(MonHoc newMon)
        {
            string query = @$"update MonHoc
                            set Ten = N'{newMon.Ten}', TinChi ='{newMon.TinChi}', HeSoBtl ='{newMon.HeSoBtl}',
                            HeSoBt = '{newMon.HeSoBt}', HeSoKt='{newMon.HeSoKt}', HeSoTn ='{newMon.HeSoTn}', HeSoThi='{newMon.HeSoThi}'
                            where MaMonHoc = '{newMon.MaMonHoc}'";

            int ret = await SqlExecutes.Instance.ExecuteNonQuery(query);
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);
            return ret;
        }

        [HttpDelete]
        public async void DeleteMonHoc(MonHoc monHoc)
        {

            string query = @$"delete from MonHoc where MaMonHoc = '{monHoc.MaMonHoc}' ";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);
        }

        // nhom mon

        [HttpPost("nhommon")]
        public async Task<int> NewNhomMon(NhomMon nhomMon)
        {
            // Console.WriteLine(nhomMon.MaMonHoc);
            string query = @$"insert into NhomMon(SoLuong,MaMonHoc, MaNhom, KiHoc, NgayTrongTuan, TietBatDau, TietKetThuc, MSCB)
                            values ('{nhomMon.SoLuong}' ,'{nhomMon.MaMonHoc}','{nhomMon.MaNhom}','{nhomMon.KiHoc}','{nhomMon.NgayTrongTuan}','{nhomMon.TietBatDau}','{nhomMon.TietKetThuc}','{nhomMon.MSCB}')";
            int ret = await SqlExecutes.Instance.ExecuteNonQuery(query);
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);
            return ret;
        }


        [HttpDelete("nhommon")]
        public async void DeleteNhomMon(NhomMon nhomMon)
        {

            string query = @$"delete from NhomMon 
                            where MaMonHoc = '{nhomMon.MaMonHoc}' and KiHoc = '{nhomMon.KiHoc}' 
                                and MaNhom = '{nhomMon.MaNhom}'";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);
        }

    }
}