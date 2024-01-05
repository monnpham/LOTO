import { https } from "./config";

export let userService = {
  login: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangNhap", valueForm);
  },
  register: (valueForm) => {
    return https.post("/api/QuanLyNguoiDung/DangKy", valueForm);
  },
};
  
export let movieService = {
  getList: (page, perPage) => {
    return https.get(
      `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=${page}&soPhanTuTrenTrang=${perPage}`
    );
  },
  getListAllMovie: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
  },

  getDetail: (id) => {
    return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  },
  getBanner: () => {
    return https.get("/api/QuanLyPhim/LayDanhSachBanner");
  },
  getMovieByTheater: () => {
    return https.get(
      "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09"
    );
  },
  getShowTimesMovie: (maPhim) => {
    return https.get(
      `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
    );
  },
};

export let ticketService = {
  getList: () => {
    return https.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=01`);
  },

  getToBooking: (idBooking) => {
    return https.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${idBooking}`
    );
  },
  bookingTicket: (ticket) => {
    return https.post("/api/QuanLyDatVe/DatVe", ticket);
  },
};
