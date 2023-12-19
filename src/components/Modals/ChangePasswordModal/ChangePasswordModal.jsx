"use client";
import { Modal, message } from "antd";
import styles from "./ChangePasswordModal.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "@/store/auth/authActions";
import { CloseCircleFilled } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { resetChangePasswordData } from "@/store/auth/authSlice";

const ChangePasswordModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { changePasswordLoading, changePasswordMessage, changePasswordError } =
    useSelector((state) => state.auth);

  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setErrors((prevState) => ({ ...prevState, confirmPassword: "" }));
    } else {
      setErrors((prevState) => ({ ...prevState, [name]: "" }));
      setChangePasswordData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const validateForm = () => {
    const errors = {};
    if (changePasswordData?.currentPassword?.trim().length <= 0) {
      errors.currentPassword = "Please enter your current password";
    }
    if (changePasswordData.newPassword?.trim().length <= 0) {
      errors.newPassword = "New password is required";
    } else if (changePasswordData.newPassword.trim().length < 8) {
      errors.newPassword = "New password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
        changePasswordData.newPassword
      )
    ) {
      errors.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    } else if (!/((^\S+$))/.test(changePasswordData.newPassword)) {
      errors.newPassword = "Password should not contain white spaces";
    }
    if (changePasswordData.newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords didn't matched";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleChangePassword = () => {
    if (validateForm()) {
      dispatch(changePassword(changePasswordData)).then(() => {
        setChangePasswordData({
          currentPassword: "",
          newPassword: "",
        });
        setConfirmPassword("");
        setErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      });
    }
  };

  useEffect(() => {
    if (changePasswordMessage || changePasswordError) {
      messageApi.open({
        key: "updatabale",
        type: changePasswordMessage ? "success" : "error",
        content: changePasswordMessage
          ? changePasswordMessage
          : changePasswordError,

        duration: 3,
      });
      dispatch(resetChangePasswordData());
    }
  }, [changePasswordMessage, changePasswordError]);

  return (
    <Modal
      title="Forgot password"
      closable={false}
      maskClosable={false}
      centered
      open={open}
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_medium btn_secondary"
            onClick={handleCancel}
            disabled={changePasswordLoading}
          >
            Cancel
          </button>
          <button
            className="btn_medium btn_primary"
            onClick={handleChangePassword}
            disabled={changePasswordLoading}
          >
            {changePasswordLoading ? (
              <Loader size={17} color="#ffffff" />
            ) : (
              "Change Password"
            )}
          </button>
        </div>,
      ]}
    >
      {contextHolder}
      <div className={styles.container}>
        <div className="input_controller">
          <p className="text_small">Current Password</p>
          <input
            type="password"
            placeholder="Please enter your current password"
            name="currentPassword"
            value={changePasswordData.currentPassword}
            onChange={handleInputChange}
          />
          {errors.currentPassword ? (
            <div className="validation_error">
              <p className={`text_small`}>{errors.currentPassword}</p>
              <p onClick={() => handleCloseError("currentPassword")}>
                <CloseCircleFilled style={{ fontSize: "14px" }} />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input_controller">
          <p className="text_small">New Password</p>
          <input
            type="password"
            placeholder="Please enter your new password"
            name="newPassword"
            value={changePasswordData.newPassword}
            onChange={handleInputChange}
          />
          {errors.newPassword ? (
            <div className="validation_error">
              <p className={`text_small`}>{errors.newPassword}</p>
              <p onClick={() => handleCloseError("newPassword")}>
                <CloseCircleFilled style={{ fontSize: "14px" }} />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input_controller">
          <p>Confirm Password</p>
          <input
            type="password"
            placeholder="Please confirm your new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword ? (
            <div className="validation_error">
              <p className={`text_small`}>{errors.confirmPassword}</p>
              <p onClick={() => handleCloseError("confirmPassword")}>
                <CloseCircleFilled style={{ fontSize: "14px" }} />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
