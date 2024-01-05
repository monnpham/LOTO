import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  let navigate = useNavigate();
  let { info } = useSelector((state) => state.userReducer);
  let handleLogout = () => {
    window.location.href = "/";
    localStorage.clear();
    toast.success("Đăng xuất thành công");
  };
  let renderUserNav = () => {
    if (info) {
      return (
        <>
          <span className="mr-4 text-orange-700 font-bold max-[991px]:ml-7">
            {info.hoTen}
          </span>
          <button
            onClick={handleLogout}
            className=" rounded-md p-2 font-semibold text-white bg-orange-600 hover:bg-orange-900"
          >
            Đăng Xuất
          </button>
        </>
      );
    }
    return (
      <>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="text-gray-400 text-base font-semibold hover:text-orange-600 delay-100 px-2 after:pr-px after:ml-3 after:bg-slate-400"
        >
          <i class="fa-solid fa-user text-2xl mx-2"></i>
          Đăng Nhập
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="text-gray-400 text-base font-semibold hover:text-orange-600 delay-100 px-2"
        >
          <i class="fa-solid fa-user text-2xl mx-2"></i>
          Đăng Ký
        </button>
      </>
    );
  };
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-white py-0 px-6 shadow-xl fixed left-0 right-0 top-0 z-50"
      >
        <Navbar.Brand href="/" className="w-52">
          <img src="./logo.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-none text-orange-600"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              href="#listMovie"
              className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
            >
              Lịch Chiếu
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              href="#cumRap"
              className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
            >
              Cụm Rạp
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              href="/"
              className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
            >
              Tin Tức
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
              href="/"
              className="font-semibold text-black mx-3 p-1 hover:text-orange-600"
            >
              Ứng Dụng
            </Nav.Link>
          </Nav>
          <nav className="max-[991px]:my-3">{renderUserNav()}</nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
