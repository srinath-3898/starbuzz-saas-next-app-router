import { sendForgotPasswordEmail } from "@/store/auth/authActions";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ForgotPasswordModal.module.css";
import { CloseCircleFilled } from "@ant-design/icons";
import { resetSendForgotPasswordEmailData } from "@/store/auth/authSlice";

const ForgotPasswordModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const {
    sendForgotPasswordEmailLoading,
    sendForgotPasswordEmailMessage,
    sendForgotPasswordEmailError,
  } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateSendEmail = () => {
    let error = "";
    if (!email) {
      error = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error = "Email is invalid";
    }
    setError(error);
    return error.length === 0;
  };

  const handleOk = () => {
    if (validateSendEmail()) {
      dispatch(sendForgotPasswordEmail({ email })).then(() => {
        setEmail("");
      });
    }
  };

  const handleCancel = () => {
    dispatch(resetSendForgotPasswordEmailData());
    setEmail("");
    setOpen(false);
    setError("");
  };

  const handleResendEmail = () => {
    dispatch(resetSendForgotPasswordEmailData());
    setEmail("");
    setError("");
  };

  return (
    <Modal
      title="Forgot password"
      closable={false}
      maskClosable={false}
      centered
      open={open}
      onCancel={handleCancel}
      footer={[
        sendForgotPasswordEmailMessage ? (
          <></>
        ) : (
          <Button
            key="cancel"
            onClick={handleCancel}
            disabled={sendForgotPasswordEmailLoading}
          >
            Cancel
          </Button>
        ),
        <Button
          key="submit"
          type="primary"
          onClick={
            sendForgotPasswordEmailMessage
              ? handleCancel
              : sendForgotPasswordEmailError
              ? handleResendEmail
              : handleOk
          }
          loading={sendForgotPasswordEmailLoading}
          disabled={sendForgotPasswordEmailLoading}
        >
          {sendForgotPasswordEmailMessage
            ? "Signin"
            : sendForgotPasswordEmailError
            ? "Re-Send Email"
            : "Send Email"}
        </Button>,
      ]}
    >
      {!sendForgotPasswordEmailMessage && !sendForgotPasswordEmailError ? (
        <div className={styles.input_controller}>
          <p className="text_small">Email</p>
          <input
            type="email"
            className="input_large"
            placeholder="Please enter you registered email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error ? (
            <div className={`validation_error`}>
              <p className={`text_small`}>{error}</p>
              <CloseCircleFilled
                style={{ fontSize: "14px", color: "red" }}
                onClick={() => setError("")}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      {sendForgotPasswordEmailMessage ? (
        <p className="text_small" style={{ color: "green" }}>
          {sendForgotPasswordEmailMessage}
        </p>
      ) : (
        <></>
      )}
      {sendForgotPasswordEmailError ? (
        <p className="text_small" style={{ color: "red" }}>
          {sendForgotPasswordEmailError}
        </p>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default ForgotPasswordModal;
