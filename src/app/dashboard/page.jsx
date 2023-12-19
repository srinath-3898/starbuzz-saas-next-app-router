"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Dashboard.module.css";
import { Skeleton, message } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { resetAuthData } from "@/store/auth/authSlice";
import { useEffect, useState } from "react";
import Assistance from "@/components/Assistance/Assistance";
import { getUserDetails } from "@/store/auth/authActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { message: authMessage } = useSelector((state) => state.auth);

  const [videoOneLoading, setVideoOneLoading] = useState(true);
  const [videoTwoLoading, setVideoTwoLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (authMessage) {
      messageApi.open({
        key: "updatable",
        content: authMessage,
        duration: 5,
        icon: (
          <CheckCircleFilled style={{ color: "#fe5900", fontSize: "14px" }} />
        ),
        style: {
          fontSize: "14px",
        },
      });
    }
    dispatch(resetAuthData());
  }, [authMessage]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <Assistance />
        <div className={styles.container_1}>
          <div className={styles.container_1_box_1}>
            {videoOneLoading ? (
              <Skeleton.Input
                active={true}
                size={"70"}
                block={true}
                style={{ height: "300px" }}
              />
            ) : (
              <></>
            )}
            <iframe
              onLoad={() => setVideoOneLoading(false)}
              src="https://www.youtube.com/embed/dYKcvJSXHeY"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: videoOneLoading ? "none" : "block" }}
            />
          </div>
          <div className={styles.container_1_box_2}>
            {videoTwoLoading ? (
              <Skeleton.Input
                active={true}
                // size={"70"}
                block={true}
                style={{ height: "300px" }}
              />
            ) : (
              <></>
            )}
            <iframe
              onLoad={() => setVideoTwoLoading(false)}
              src="https://www.youtube.com/embed/ctNDiU6VwQ8"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: videoTwoLoading ? "none" : "block" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
