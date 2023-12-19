"use client";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./ProfileDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChangePasswordModal from "../Modals/ChangePasswordModal/ChangePasswordModal";
import { resetAuthState } from "@/store/auth/authSlice";
import EditProfileModal from "../Modals/EditProfileModal/EditProfileModal";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const { organisation, user } = useSelector((state) => state.auth);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_1}></div>
        <div className={styles.container_2}>
          <div className={styles.container_2_box_1}>
            <button
              className={`btn_medium btn_primary`}
              onClick={() => setChangePasswordModalOpen(true)}
            >
              <EditOutlined style={{ fontSize: 16 }} />
              Change password
            </button>
            <button
              className={`btn_small btn_primary`}
              onClick={() => setEditProfileModalOpen(true)}
            >
              <EditOutlined style={{ fontSize: 16 }} />
              Edit profile
            </button>
            <button
              className="btn_small btn_primary"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("user");
                dispatch(resetAuthState());
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = "/login";
              }}
            >
              <LogoutOutlined style={{ fontSize: 16 }} />
              Logout
            </button>
          </div>
          <div className={styles.container_2_box_2}>
            <div className={styles.container_2_box_2_box}>
              <p className={`text_medium `}>Organisation name</p>
              <p className={`text_small`}>{organisation?.name}</p>
            </div>
            <div className={styles.container_2_box_2_box}>
              <p className={`text_medium `}>User name</p>
              <p className={`text_small`}>{user?.fullName}</p>
            </div>
            <div className={styles.container_2_box_2_box}>
              <p className={`text_medium`}>Email</p>
              <p className={`text_small`}>{user?.email}</p>
            </div>
            <div className={styles.container_2_box_2_box}>
              <p className={`text_medium`}>Phone number</p>
              <p className={`text_small`}>{user?.phone}</p>
            </div>
            <div className={styles.container_2_box_2_box}>
              <p className={`text_medium`}>GST</p>
              <p className={`text_small`}>
                {organisation?.vat_number ? organisation?.vat_number : "------"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.profile_pic}>
          <UserOutlined style={{ fontSize: 160 }} />
        </div>
      </div>
      <ChangePasswordModal
        open={changePasswordModalOpen}
        setOpen={setChangePasswordModalOpen}
      />
      <EditProfileModal
        open={editProfileModalOpen}
        setOpen={setEditProfileModalOpen}
      />
    </>
  );
};

export default ProfileDetails;
