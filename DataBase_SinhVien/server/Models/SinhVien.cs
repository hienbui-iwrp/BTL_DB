using System;

namespace DataBase_SinhVien
{
    public class SinhVien
    {
        public string MSSV { get; set; }
        public string Ho { get; set; }
        public string Ten { get; set; }
        public string TinhTrang { get; set; }
        public DateTime NgaySinh { get; set; }
        public string GioiTinh { get; set; }
        public string HoKhau { get; set; }
        public string Khoa { get; set; }

        public string TenLopChuNhiem { get; set; }
    }
    public class Khoa{
        public string MaKhoa { get; set; }
        public string TenKhoa { get; set; }
    }
}