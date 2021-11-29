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
    public class SinhVienController : ControllerBase
    {
        [HttpGet]
        public async Task<List<SinhVien>> GetAllStudent()
        {
            string query = "SELECT MSSV, Ho, Ten, TinhTrang, NgaySinh, GioiTinh, HoKhau, MaKhoa AS Khoa, TenLopChuNhiem FROM SinhVien;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<SinhVien>();
        }

        [HttpGet("search")]
        public async Task<List<SinhVien>> GetStudent(string s, string makhoa, string gioitinh)
        {
            if (makhoa == "Khoa")
                makhoa = "";
            if (gioitinh == "Giới tính")
                gioitinh = "";
            string query = $"SELECT MSSV, Ho, Ten, TinhTrang, NgaySinh, GioiTinh, HoKhau, MaKhoa AS Khoa, TenLopChuNhiem from SinhVien where (MSSV like N'%{s}%' or Ten like N'%{s}%') and MaKhoa like '%{makhoa}%' and GioiTinh like N'%{gioitinh}%';";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<SinhVien>();
        }

        [HttpGet("khoa")]
        public async Task<List<string>> GetAllFaculty()
        {
            string query = @" SELECT MaKhoa FROM Khoa;";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            List<string> strs = new List<string>();

            foreach (DataRow item in data.Rows)
            {
                strs.Add(item["MaKhoa"].ToString());
            }

            return strs;
        }

        [HttpPost]
        public async Task<int> InsertStudent(SinhVien sinhVien)
        {
            string query = $"INSERT INTO SinhVien(MSSV, Ho, Ten, KhoaHoc, TinhTrang, NgaySinh, GioiTinh, CMNDCCCD, DiaChiTamTru, HoKhau, EmailTruong, EmailCaNhan, TenLopChuNhiem, MaKhoa, SoTinChiTichLuy, DiemTrungBinhTichLuy) VALUES ('{sinhVien.MSSV}', N'{sinhVien.Ho}', N'{sinhVien.Ten}', 0, N'{sinhVien.TinhTrang}', '{sinhVien.NgaySinh}', N'{sinhVien.GioiTinh}', N'', N'', N'{sinhVien.HoKhau}', N'', N'', N'{sinhVien.TenLopChuNhiem}', N'{sinhVien.Khoa}', 0, 0); ";

            int n = await SqlExecutes.Instance.ExecuteNonQuery(query);

            return n;
        }

        [HttpGet("lopchunhiem")]
        public async Task<List<LopChuNhiem>> GetAllClass()
        {
            string query = @"SELECT TenLopChuNhiem, MaKhoa FROM LopChuNhiem;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<LopChuNhiem>();
        }

    }
}