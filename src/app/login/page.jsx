"use client";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import logo from "../../assets/svgs/logo.svg";
import { useEffect, useState } from "react";
import {
  CloseCircleFilled,
  EyeOutlined,
  EyeInvisibleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { message } from "antd";
import { resetAuthData } from "@/store/auth/authSlice";
import ForgotPasswordModal from "@/components/Modals/ForgotPasswordModal/ForgotPasswordModal";
import { useRouter } from "next/navigation";
import { getUserDetails, signin } from "@/store/auth/authActions";
import Loader from "@/components/Loader/Loader";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, token, user, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "gabinil947@newcupon.com",
    password: "Munnuru@1998",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setFormData({
        ...formData,
        [name]: value.toLowerCase(),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleCloseError = (text) => {
    setErrors((prevState) => ({ ...prevState, [text]: "" }));
  };

  const loginValidator = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (loginValidator()) {
      dispatch(signin(formData));
    }
  };

  useEffect(() => {
    if (token) {
      document.cookie = `token=${token}; path=/`;
      // setFormData({ email: "", password: "" });
      dispatch(getUserDetails());
      router.push("/");
    } else {
      return;
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "updatable",
        content: error,
        duration: 5,
        icon: <CloseCircleFilled style={{ color: "red", fontSize: "14px" }} />,
        style: {
          fontSize: "13px",
        },
      });
      dispatch(resetAuthData());
    }
  }, [error]);

  return token ? (
    <></>
  ) : (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.container_1}>
          <Image src={logo} alt="logo" />
        </div>
        <form className={styles.container_2} onSubmit={handleLogin}>
          <div className={styles.input_controller}>
            <p className={`text_small`}>Email</p>
            <input
              className="input_large"
              onChange={handleInputChange}
              type="text"
              placeholder="Enter Your User Email ID"
              name="email"
              value={formData.email}
            />
            {errors.email ? (
              <div className="validation_error">
                <p className={`text_small`}>{errors.email}</p>
                <p onClick={() => handleCloseError("email")}>
                  <CloseCircleFilled style={{ fontSize: "14px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.input_controller}>
            <p className={`text_small`}>Password</p>
            <input
              className="input_large"
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
            />
            <div className={styles.password_icon}>
              {showPassword ? (
                <EyeInvisibleOutlined
                  style={{ fontSize: 16 }}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOutlined
                  style={{ fontSize: 16 }}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password ? (
              <div className="validation_error">
                <p className={`text_small`}>{errors.password}</p>
                <CloseCircleFilled
                  style={{ fontSize: "14px", color: "red" }}
                  onClick={() => handleCloseError("password")}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={styles.container_2_box_1}>
            <div className={styles.keep_me_signed_in}>
              <input
                className={styles.check_box}
                type="checkbox"
                name=""
                id=""
              />
              <p className={`text_small`}>Keep me signed in</p>
            </div>
            <div className={styles.forgot_password}>
              <p
                className={`text_small`}
                onClick={() => {
                  setForgotPasswordModalOpen(true);
                  setErrors({ email: "", password: "" });
                }}
              >
                Forgot Password?
              </p>
            </div>
          </div>
          <button
            className={`btn_extra_large btn_primary `}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <LoadingOutlined style={{ fontSize: "13px", color: "#ffffff" }} />
            ) : (
              `Signin`
            )}
          </button>
          <div className={styles.terms_and_conditions}>
            <p className={`text_extra_small`}>
              By logging in you are accepting the{" "}
              <span>
                <Link href={"https://starbuzz.ai/terms/"} target="_blank">
                  Terms and Conditons
                </Link>
              </span>
            </p>
          </div>
          <div className={styles.sign_up}>
            <p className={`text_small`}>{`Don't`} have an account?</p>
            <Link href={"/signup"}>Sign Up here</Link>
          </div>
        </form>
      </div>
      <ForgotPasswordModal
        open={forgotPasswordModalOpen}
        setOpen={setForgotPasswordModalOpen}
      />
    </>
  );
};

export default Login;
