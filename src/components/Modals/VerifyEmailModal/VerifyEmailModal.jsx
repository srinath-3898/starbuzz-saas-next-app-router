import { Modal } from "antd";
import styles from "./VerifyEmailModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "@/store/auth/authActions";
import { useRouter } from "next/navigation";
import { resetAuthState, resetVerifyEmailData } from "@/store/auth/authSlice";
import Cookies from "js-cookie";
import Loader from "@/components/Loader/Loader";

const VerifyEmailModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, verifyEmailLoading, verifyEmailMessage, verifyEmailError } =
    useSelector((state) => state.auth);

  const handleOk = () => {
    dispatch(verifyEmail({ email: user?.email }));
  };

  const handleCancel = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    localStorage.clear();
    sessionStorage.clear();
    dispatch(resetAuthState());
    dispatch(resetVerifyEmailData());
    setOpen(false);
    router.push("/login");
  };

  return (
    <Modal
      title="Please verify you email"
      centered
      open={open}
      onCancel={handleCancel}
      footer={[
        <div key={"footer"} className={styles.footer}>
          {verifyEmailMessage || verifyEmailError ? (
            <></>
          ) : (
            <button className="btn_small btn_secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
          <button
            className="btn_small btn_primary"
            onClick={verifyEmailMessage ? handleCancel : handleOk}
            loading={verifyEmailLoading}
            disabled={verifyEmailLoading}
          >
            {verifyEmailMessage ? (
              "Signin"
            ) : verifyEmailLoading ? (
              <Loader size={13} color="white" />
            ) : (
              "SendEmail"
            )}
          </button>
        </div>,
      ]}
    >
      {!verifyEmailMessage && !verifyEmailError ? (
        <div className={styles.input_controller}>
          <p className="text_small">Email:</p>
          <input
            type="email"
            className="input_large"
            value={user?.email}
            disabled={true}
          />
        </div>
      ) : (
        <></>
      )}
      {verifyEmailMessage ? (
        <p className="text_small" style={{ color: "green" }}>
          {verifyEmailMessage}
        </p>
      ) : (
        <></>
      )}
      {verifyEmailError ? (
        <p className="text_small" style={{ color: "red" }}>
          {verifyEmailError}
        </p>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default VerifyEmailModal;
