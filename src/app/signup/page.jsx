"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/svgs/logo.svg";
import Image from "next/image";
import {
  CloseCircleFilled,
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Modal, message } from "antd";
import { signup } from "@/store/auth/authActions";
import { resetAuthData } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading,
    message: authMessage,
    token,
    user,
    error,
  } = useSelector((state) => state.auth);

  const [formData, setFromData] = useState({
    organisation: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      isBrand: false,
    },
  });
  const [errors, setErrors] = useState({
    organisation: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [section, field] = name.split(".");
    if (field === "email") {
      setFromData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [field]: value.toLowerCase() },
      }));
    } else {
      setFromData((prevState) => ({
        ...prevState,
        [section]: { ...prevState[section], [field]: value },
      }));
    }
    setErrors((prevState) => ({
      ...prevState,
      [section]: { ...prevState[section], [field]: "" },
    }));
  };

  const validateForm = () => {
    const errors = { organisation: {} };
    if (!formData.organisation.name) {
      errors.organisation.name = "Name is required";
    } else if (formData.organisation.name) {
      if (formData?.organisation?.name?.trim().length === 0) {
        errors.organisation.name = "Please enter a valid name";
      }
    }
    if (!formData.organisation.email) {
      errors.organisation.email = "Email is required";
    } else if (formData.organisation.email) {
      if (formData?.organisation?.email?.trim().length === 0) {
        errors.organisation.email = "Email is invalid";
      } else if (!/\S+@\S+\.\S+/.test(formData?.organisation?.email.trim())) {
        errors.organisation.email = "Email is invalid";
      }
    }
    if (!formData?.organisation?.password) {
      errors.organisation.password = "Password is required";
    } else if (formData.organisation.password) {
      if (formData?.organisation?.password?.trim().length === 0) {
        errors.organisation.password = "Password is required";
      } else if (formData?.organisation?.password?.trim().length < 8) {
        errors.organisation.password =
          "Password must be at least 8 characters long";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
          formData?.organisation?.password.trim()
        )
      ) {
        errors.organisation.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      } else if (!/((^\S+$))/.test(formData?.organisation?.password)) {
        errors.organisation.password =
          "Password should not contain white spaces";
      }
    }

    if (
      formData?.organisation?.password !==
      formData?.organisation?.confirmPassword
    ) {
      errors.organisation.confirmPassword = "Password didn't matched";
    }
    if (!formData.organisation.phone) {
      errors.organisation.phone = "User Mobile is required";
    } else if (formData.organisation.phone) {
      if (
        formData.organisation.phone.trim().length < 10 ||
        formData.organisation.phone.trim().length > 10
      ) {
        errors.organisation.phone = "Please enter 10 digit mobile number";
      } else if (!/^[0-9]{10}$/.test(formData.organisation.phone.trim())) {
        errors.organisation.phone = "Please enter numbers only from 0-9";
      }
    }
    setErrors(errors);
    return Object.keys(errors.organisation).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(signup(formData));
    }
  };

  useEffect(() => {
    if (token && user) {
      if (user?.isEmailVerified && user?.appTour) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (authMessage) {
      setMessageModalOpen(true);
      setFromData({
        organisation: {
          email: "",
          isBrand: false,
          name: "",
          password: "",
          phone: "",
        },
      });
    }
  }, [authMessage]);

  useEffect(() => {
    if (error) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: error,
        duration: 3,
        icon: error && (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetAuthData());
    }
  }, [error]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <Image src={logo} width={50} height={50} alt="Logo" />
        <div className={styles.agency_or_brand}>
          <p className={`text_medium bold`}>Sign Up As</p>
          <div>
            <button
              className={`btn_small ${styles.agency_btn} ${
                !formData.organisation.isBrand && styles.active
              }`}
              onClick={() =>
                setFromData((prevState) => ({
                  ...prevState,
                  organisation: { ...prevState.organisation, isBrand: false },
                }))
              }
            >
              Agency
            </button>
            <button
              className={`btn_small ${styles.brand_btn} ${
                formData.organisation.isBrand && styles.active
              }`}
              onClick={() =>
                setFromData((prevState) => ({
                  ...prevState,
                  organisation: { ...prevState.organisation, isBrand: true },
                }))
              }
            >
              Brand
            </button>
          </div>
        </div>
        <form className={styles.signup_form} onSubmit={handleSubmit}>
          <div className="input_controller">
            <label htmlFor="organisationName" className="text_small bold">
              {formData?.organisation.isBrand
                ? " Organisation Name"
                : "Agency Name"}
            </label>
            <input
              id="organisationName"
              onChange={handleChange}
              type="text"
              placeholder={`Please Enter ${
                formData.organisation.isBrand ? "Organisation" : "Agency"
              } Name`}
              name="organisation.name"
              value={formData?.organisation?.name}
            />
            {errors.organisation.name && (
              <div className="validation_error">
                <p className={`text_small`}>{errors.organisation.name}</p>
              </div>
            )}
          </div>
          <div className="input_controller">
            <label htmlFor="organisationEmail" className="text_small bold">
              {formData.organisation.isBrand
                ? "Organisation Email"
                : "Agency Email"}
            </label>
            <input
              onChange={handleChange}
              type="email"
              placeholder={`Please Enter Your ${
                formData.organisation.isBrand ? "Organization" : "Agency"
              } Email`}
              name="organisation.email"
              id="organisationEmail"
              value={formData.organisation.email}
            />
            {errors.organisation.email && (
              <div className="validation_error">
                <p className={`text_small`}>{errors.organisation.email}</p>
              </div>
            )}
          </div>
          <div className="input_controller">
            <label htmlFor="organisationPhone" className="text_small bold">
              Mobile number
            </label>
            <input
              onChange={handleChange}
              type="tel"
              placeholder={`Please Enter Your ${
                formData.organisation.isBrand ? "Organization" : "Agency"
              } mobile number`}
              name="organisation.phone"
              id="organisationPhone"
              value={formData.organisation.phone}
            />
            {errors.organisation.phone && (
              <div className="validation_error">
                <p className={`text_small`}>{errors.organisation.phone}</p>
              </div>
            )}
          </div>
          <div className={`input_controller`}>
            <label htmlFor="password" className="text_small bold">
              Password
            </label>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Please create a password"
              name="organisation.password"
              id="password"
              value={formData.organisation?.password}
              className={styles.password}
            />
            <div className={styles.show_password_icon}>
              {showPassword ? (
                <EyeInvisibleOutlined
                  style={{ fontSize: 15 }}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOutlined
                  style={{ fontSize: 15 }}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.organisation.password && (
              <div className="validation_error">
                <p className={`text_small`}>{errors.organisation.password}</p>
              </div>
            )}
          </div>
          <div className="input_controller">
            <label htmlFor="confirm_Password" className="text_small bold">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Please confirm your password"
              name="organisation.confirmPassword"
              id="confirm_Password"
              value={formData.organisation.confirmPassword}
              className={styles.confirm_password}
            />
            <div className={styles.show_password_icon}>
              {showConfirmPassword ? (
                <EyeInvisibleOutlined
                  style={{ fontSize: 15 }}
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <EyeOutlined
                  style={{ fontSize: 15 }}
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
            {errors.organisation.confirmPassword && (
              <div className="validation_error">
                <p className={`text_small`}>
                  {errors.organisation.confirmPassword}
                </p>
              </div>
            )}
          </div>
          <button type="submit" className="btn_primary" disabled={loading}>
            {loading ? (
              <LoadingOutlined style={{ color: "white", fontSize: "13px" }} />
            ) : (
              "Signup"
            )}
          </button>
          <p className={`text_small center ${styles.terms_and_conditions}`}>
            By Signing up you are accepting the{" "}
            <Link href={"https://starbuzz.ai/terms/"} target="_blank">
              Terms and Conditons
            </Link>
          </p>
        </form>
        <p className={`text_small ${styles.login}`}>
          Already have an account? <Link href={"/login"}>Login</Link> to
          continue
        </p>
      </div>
      <Modal
        title={null}
        open={messageModalOpen}
        maskClosable={false}
        closable={false}
        centered
        footer={[
          <div key={"footer"} className={styles.message_modal_footer}>
            <button
              className="btn_small btn_primary "
              onClick={() => {
                dispatch(resetAuthData());
                router.push("/login");
              }}
            >
              Login
            </button>
          </div>,
        ]}
      >
        <p className="text_medium bold">{authMessage}</p>
      </Modal>
    </>
  );
};

export default Signup;
