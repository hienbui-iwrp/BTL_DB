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
    public class GiangVienController : ControllerBase
    {
        [HttpGet]
        public async Task<List<GiangVien>> GetAllGiangVien()
        {
            string query = @"SELECT MSCB, Ho, Ten, ChuyenMon, GioiTinh, NgaySinh, HocHam, MaKhoa FROM GiangVien;";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<GiangVien>();
        }

        [HttpGet("lichday")]
        public async Task<List<ThoiKhoaBieu>> GetLichDays(string mscb)
        {
            string query = $@"select distinct MonHoc.MaMonHoc, MonHoc.Ten, MonHoc.TinChi, NhomMon.MaNhom, NhomMon.TietBatDau, NhomMon.TietKetThuc, NhomMon.NgayTrongTuan, HocMon.TenPhong
                            from HocMon, NhomMon, MonHoc
                            where MonHoc.MaMonHoc = NhomMon.MaMonHoc and HocMon.MaMonHoc = NhomMon.MaMonHoc and HocMon.MaNhom = NhomMon.MaNhom and NhomMon.MSCB = '{mscb}';";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<ThoiKhoaBieu>();
        }

        [HttpGet("search")]
        public async Task<List<GiangVien>> GetGiangViens(string s, string makhoa, string gioitinh)
        {
            if(makhoa == "Khoa")
                makhoa = "";
            if(gioitinh == "Giới tính")
                gioitinh = "";
            string query = $"SELECT MSCB, Ho, Ten, ChuyenMon, GioiTinh, NgaySinh, HocHam, MaKhoa FROM GiangVien where (MSCB like N'%{s}%' or Ten like N'%{s}%') and MaKhoa like '%{makhoa}%' and GioiTinh like N'%{gioitinh}%';";
            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<GiangVien>();
        }

        [HttpPost]
        public async Task<int> InsertStudent(GiangVien giangVien)
        {
            string query = @$"INSERT INTO GiangVien(MSCB, Ho, Ten, ChuyenMon, GioiTinh, CMNDCCCD, NgaySinh, DiaChiTamTru, HoKhau, EmailTruong, EmailCaNhan, HocHam, MaKhoa)
                            VALUES
                            (
                            N'{giangVien.MSCB}', N'{giangVien.Ho}', N'{giangVien.Ten}', N'{giangVien.ChuyenMon}', N'{giangVien.GioiTinh}', '', N'{giangVien.NgaySinh}', '', '', '', '', N'{giangVien.HocHam}', N'{giangVien.MaKhoa}'
                            );";

            int n = await SqlExecutes.Instance.ExecuteNonQuery(query);

            return n;
        }
    }
}