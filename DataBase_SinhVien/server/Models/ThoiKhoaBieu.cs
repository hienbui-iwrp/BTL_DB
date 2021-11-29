using System;

namespace DataBase_SinhVien
{
    public class ThoiKhoaBieu
    {
        public string MaMonHoc { get; set; }
        public string Ten { get; set; }
        public int TinChi { get; set; }
        public string MaNhom { get; set; }
        public int TietBatDau { get; set; }
        public int TietKetThuc { get; set; }
        public int NgayTrongTuan { get; set; }
        public string TenPhong { get; set; }
    }

    public class LopChuNhiem
    {
        public string TenLopChuNhiem { get; set; }
        public string MaKhoa { get; set; }
    }

}