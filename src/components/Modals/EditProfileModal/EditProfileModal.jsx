"use client";
import { Modal, message } from "antd";
import styles from "./EditProfileModal.module.css";
import { CloseCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { editprofile, getUserDetails } from "@/store/auth/authActions";
import Loader from "@/components/Loader/Loader";
import { resetEditProfileData } from "@/store/auth/authSlice";

const EditProfileModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { user, editProfileLoading, editProfileMessage, editProfileError } =
    useSelector((state) => state.auth);

  const [editProfileData, setEditProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });
  const [errors, setErrors] = useState({ fullName: "", phone: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const handleCancel = () => {
    setEditProfileData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
    });
    setErrors({ fullName: "", phone: "" });
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditProfileData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (editProfileData.fullName.length === 0) {
      errors.fullName = "Full name is required";
    }
    if (!editProfileData.phone) {
      errors.phone = "User Mobile is required";
    } else if (
      editProfileData.phone.length < 10 ||
      editProfileData.phone.length > 10
    ) {
      errors.phone = "Please enter 10 digit mobile number";
    } else if (!/^[0-9]{10}$/.test(editProfileData.phone)) {
      errors.phone = "Please enter numbers only from 0-9";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditProfile = () => {
    if (validateForm()) {
      dispatch(editprofile(editProfileData)).then(() => {
        dispatch(getUserDetails());
      });
    }
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  useEffect(() => {
    if (user && open) {
      setEditProfileData((prevState) => ({
        ...prevState,
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        country:
          user?.country === null || user?.country === undefined
            ? ""
            : user?.country,
        city: user?.city === null || user?.city === undefined ? "" : user?.city,
      }));
    }
  }, [user, open]);

  useEffect(() => {
    if (editProfileMessage || editProfileError) {
      messageApi.open({
        key: "updatable",
        type: editProfileMessage ? "success" : "error",
        content: editProfileMessage ? editProfileMessage : editProfileError,
        duration: 3,
      });
      dispatch(resetEditProfileData());
    }
  }, [editProfileMessage, editProfileError]);

  return (
    <Modal
      title="Edit Profile"
      closable={false}
      maskClosable={false}
      centered
      open={open}
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_small btn_secondary"
            onClick={handleCancel}
            disabled={editProfileLoading}
          >
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={handleEditProfile}
            disabled={editProfileLoading}
          >
            {editProfileLoading ? (
              <Loader size={17} color="#ffffff" />
            ) : (
              "Edit profile"
            )}
          </button>
          ,
        </div>,
      ]}
    >
      {contextHolder}
      <div className={styles.container}>
        <div className="input_controller">
          <p className="text_small">Full name</p>
          <input
            type="text"
            placeholder="Please enter your full name"
            name="fullName"
            value={editProfileData?.fullName}
            onChange={handleInputChange}
          />
          {errors.fullName ? (
            <div className="validation_error">
              <p className={`text_small`}>{errors.fullName}</p>
              <p onClick={() => handleCloseError("fullName")}>
                <CloseCircleFilled style={{ fontSize: "14px" }} />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input_controller">
          <p className="text_small">Email</p>
          <input
            type="email"
            placeholder="Please enter your email"
            name="email"
            value={editProfileData.email}
            disabled
            onChange={handleInputChange}
          />
        </div>
        <div className="input_controller">
          <p>Phone</p>
          <input
            type="tel"
            placeholder="Please enter your phone number"
            name="phone"
            value={editProfileData.phone}
            onChange={handleInputChange}
          />
          {errors.phone ? (
            <div className="validation_error">
              <p className={`text_small`}>{errors.phone}</p>
              <p onClick={() => handleCloseError("phone")}>
                <CloseCircleFilled style={{ fontSize: "14px" }} />
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="input_controller">
          <p>Country</p>
          <input
            type="text"
            placeholder="Please enter your country"
            name="country"
            value={editProfileData.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="input_controller">
          <p>City</p>
          <input
            type="text"
            placeholder="Please enter city"
            name="city"
            value={editProfileData.city}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
