import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { userService } from "../../service/service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_INFOR } from "../../redux/constant/user";

export default function LoginPage() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const onFinish = (values) => {
    userService
      .login(values)
      .then((res) => {
        dispatch({ type: SET_INFOR, payload: res.data.content });
        //lưu vào localStorage
        localStorage.setItem("USER", JSON.stringify(res.data.content));
        toast.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng nhập thất bại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-screen  bg-black">
      <div className="pt-[156px]">
        <Form
          className="bg-gray-200 container_login p-6 rounded-lg w-[460px]"
          name="basic"
          layout="vertical"
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="title text-center mb-3 ">
            <i class="fa-solid fa-user text-3xl w-12 h-12 py-1 bg-orange-600 rounded-full text-white"></i>
            <h4 className="text-2xl font-semibold">Đăng nhập</h4>
          </div>
          <Form.Item
            label="Tài Khoản"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="py-3" />
          </Form.Item>

          <Form.Item
            label="Mật Khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="py-3" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Nhớ tài khoản</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-orange-600 text-white w-full h-11 font-semibold"
            >
              ĐĂNG NHẬP
            </Button>
          </Form.Item>
          <div
            className="text-blue-500 cursor-pointer text-decoration-underline text-right font-semibold"
            onClick={() => {
              navigate("/register");
            }}
          >
            Bạn chưa có tài khoản? Đăng ký
          </div>
        </Form>
      </div>
    </div>
  );
}
