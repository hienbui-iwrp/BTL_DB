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
    public class ThoiKhoaBieuController : ControllerBase
    {
        [HttpGet]
        public async Task<List<ThoiKhoaBieu>> GetThoiKhoaBieus(string mssv)
        {
            string query = $"SELECT HocMon.MaMonHoc, MonHoc.Ten, MonHoc.TinChi, HocMon.MaNhom, NhomMon.TietBatDau, NhomMon.TietKetThuc, NhomMon.NgayTrongTuan, HocMon.TenPhong FROM NhomMon, HocMon, MonHoc where NhomMon.MaMonHoc = HocMon.MaMonHoc and NhomMon.MaMonHoc = MonHoc.MaMonHoc and MSSV = '{mssv}';";

            DataTable data = await SqlExecutes.Instance.ExecuteQuery(query);

            return data.ConvertToList<ThoiKhoaBieu>();
        }
    }
}