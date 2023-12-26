"use client";
import { setToken, setUserDetails } from "@/store/auth/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import styles from "./ReduxWrapper.module.css";
import Header from "../Header/Header";
import { usePathname, useRouter } from "next/navigation";
import { getUserDetails } from "@/store/auth/authActions";
import Loader from "../Loader/Loader";
import posthog from "posthog-js";
import init from "@socialgouv/matomo-next";

const ReduxWrapper = ({ children }) => {
  const MATOMO_URL = "https://matomo.innocreates.online";
  const MATOMO_SITE_ID = 2;

  const router = useRouter();

  const pathNames = usePathname()
    .split("/")
    .filter((x) => x);
  const dispatch = useDispatch();

  const { loading, token, user } = useSelector((state) => state.auth);

  const [navbarExpand, setNavbarExpand] = useState(false);
  const [pathName, setPathName] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      sessionStorage.getItem("userDetails")
    ) {
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(
        setUserDetails(JSON.parse(sessionStorage.getItem("userDetails")))
      );
    } else if (
      localStorage.getItem("token") &&
      !sessionStorage.getItem("userDetails")
    ) {
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(getUserDetails());
    }
  }, []);

  useEffect(() => {
    if (pathNames.length > 0) {
      setPathName(pathNames[0]);
    } else {
      setPathName("home");
    }
  }, [pathNames]);

  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
    posthog.init("phc_Hw7Ra5HP7hIwTTmT7fDOxgDDqpYIpfIWCQxNWkOro0x", {
      api_host: "https://app.posthog.com",
      opt_in_site_apps: true,
    });
  }, []);

  return (
    <div
      className={`${
        token &&
        user &&
        user?.isEmailVerified &&
        user?.appTour &&
        process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false"
          ? styles.container
          : ""
      } ${navbarExpand ? styles.container_responsive : ""}`}
    >
      {token &&
      user &&
      user?.isEmailVerified &&
      user?.appTour &&
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" ? (
        <div className={styles.navbar}>
          <Navbar
            handleClick={() => setNavbarExpand(!navbarExpand)}
            navbarExpand={navbarExpand}
          />
        </div>
      ) : (
        <></>
      )}
      {token &&
      user &&
      user?.isEmailVerified &&
      user?.appTour &&
      process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" ? (
        <div className={styles.header}>
          <Header />
        </div>
      ) : (
        <></>
      )}
      <div
        className={`${
          token &&
          user &&
          user?.isEmailVerified &&
          user?.appTour &&
          process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false"
            ? styles.main
            : ""
        }`}
      >
        <div
          className={`${
            token &&
            user &&
            user?.isEmailVerified &&
            user?.appTour &&
            process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false"
              ? styles.content
              : ""
          }`}
        >
          {token && user && user?.isEmailVerified && user?.appTour ? (
            <>{children}</>
          ) : pathName === "login" ||
            pathName === "signup" ||
            pathName === "home" ||
            pathName === "appTour" ? (
            <>{children}</>
          ) : loading ? (
            <div className={styles.loading}>
              <Loader size={50} />
            </div>
          ) : (
            <></>
          )}
        </div>
        {token &&
        user &&
        user?.isEmailVerified &&
        user?.appTour &&
        process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" ? (
          <div className={styles.footer}>
            <p className="text_extra_small bold">
              Copyright © Krisattva Pvt Ltd. All Right Reserved.
            </p>
            <p className="text_extra_small ">{"v2.4.1"}</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ReduxWrapper;
