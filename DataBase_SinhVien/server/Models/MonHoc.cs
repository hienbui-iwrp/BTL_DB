using System;

namespace DataBase_SinhVien
{
    public class MonHoc
    {
        public string MaMonHoc { get; set; }
        public string Ten { get; set; }
        public int TinChi { get; set; }
        public double HeSoBtl { get; set; }
        public double HeSoBt { get; set; }
        public double HeSoKt { get; set; }
        public double HeSoTn { get; set; }
        public double HeSoThi { get; set; }
    }
    public class NhomMon
    {
        public string MaNhom { get; set; }
        public string KiHoc { get; set; }
        public int NgayTrongTuan { get; set; }
        public int TietBatDau { get; set; }
        public int TietKetThuc { get; set; }
        public string MSCB { get; set; }
        public string MaMonHoc { get; set; }
        public int SoLuong { get; set; }
    }
    public class HocMon
    {
        public string MSSV{ get; set; }
        public string TenPhong { get; set; }
        public string MaNhom { get; set; }
        public string MaMonHoc { get; set; }
        public string KiHoc { get; set; }
    }
}