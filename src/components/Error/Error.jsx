"use client";
import { WarningOutlined } from "@ant-design/icons";
import styles from "./Error.module.css";
import { useSelector } from "react-redux";
import NotFound from "../../assets/svgs/404.svg";
import Image from "next/image";
import GateWayTimeout from "../../assets/svgs/504.svg";
import InternalServerError from "../../assets/svgs/500.svg";
import Badrequest from "../../assets/svgs/400.svg";

const Error = ({ message, errorCode }) => {
  const { error, user } = useSelector((state) => state.auth);
  return (
    <div
      className={`${styles.error} ${error && !user ? styles.error_res : ""}`}
    >
      {errorCode === 400 ? (
        <>
          <Image src={Badrequest} alt="" />
          <div className={styles.error_message}>
            <WarningOutlined style={{ color: "#F03D3E", fontSize: "16px" }} />
            <p className="text_small">{message}</p>
          </div>
        </>
      ) : errorCode === 404 ? (
        <>
          <Image src={NotFound} alt="" />
        </>
      ) : errorCode === 504 ? (
        <>
          <Image src={GateWayTimeout} alt="" />
          <div className={styles.error_message}>
            <WarningOutlined style={{ color: "#F03D3E", fontSize: "16px" }} />
            <p className="text_small bold">{`Hold tight! Server's taking a short breath. Refresh soon`}</p>
          </div>
        </>
      ) : errorCode === 500 ? (
        <>
          <Image src={InternalServerError} alt="" />
          <div className={styles.error_message}>
            <p className="text_small bold">
              {`Looks like our server is taking a coffee break. ☕️ Don't panic, our team is brewing up a fix!`}
            </p>
          </div>
        </>
      ) : (
        <div className={styles.error_message}>
          <WarningOutlined style={{ color: "#F03D3E", fontSize: "16px" }} />
          <p className="text_small bold">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Error;
