"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import styles from "./CreateUpdateUserModal.module.css";
import { createUser, updateUser } from "@/store/user/userActions";
import { CloseCircleFilled } from "@ant-design/icons";
import { fetchAllUsers } from "@/store/users/usersActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";

const CreateUpdateUserModal = ({
  open,
  setOpen,
  editUserData,
  setEditUserData,
  user,
}) => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });
  const dispatch = useDispatch();
  const { cudUserloading } = useSelector((state) => state.user);

  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (editUserData) {
      setUserData((prevState) => ({
        ...prevState,
        fullName: editUserData?.fullName,
        email: editUserData?.email,
        phone: editUserData?.phone ? editUserData?.phone : "",
        city: editUserData?.city ? editUserData?.city : "",
        country: editUserData?.country ? editUserData?.country : "",
      }));
    } else {
      setUserData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
      });
      setConfirmPassword("");
    }
  }, [editUserData]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name !== "confirmPassword") {
      if (name === "email") {
        setUserData((prevState) => ({
          ...prevState,
          [name]: value?.toLowerCase(),
        }));
      } else {
        setUserData((prevState) => ({ ...prevState, [name]: value }));
      }
    } else {
      setConfirmPassword(value);
    }
    setUserData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateSubmit = () => {
    const errors = {};

    //-- name
    if (!userData.fullName) {
      errors.fullName = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(userData.fullName)) {
      errors.fullName = "Please enter characters only";
    }

    if (!editUserData) {
      //-- email
      if (!userData.email) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
        errors.email = "Email is invalid";
      }

      //-- password
      if (!userData.password) {
        errors.password = "Password is required";
      } else if (userData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
          userData.password
        )
      ) {
        errors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      } else if (!/((^\S+$))/.test(userData.password)) {
        errors.password = "Password should not contain white spaces";
      }
      if (userData.password !== confirmPassword) {
        errors.confirmPassword = "Password didn't matched";
      }

      //-- phone
      if (!userData.phone) {
        errors.phone = "User Mobile is required";
      } else if (userData.phone.length != 10) {
        errors.phone = "Please enter 10 digit mobile number";
      } else if (!/^[0-9]{10}$/.test(userData.phone)) {
        errors.phone = "Please enter numbers only from 0-9";
      }
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleCreate = () => {
    if (validateSubmit()) {
      dispatch(createUser(userData)).then(() => {
        dispatch(fetchAllUsers({ size: 5, page: 1 })).then(() => {
          setUserData({
            fullName: "",
            email: "",
            password: "",
            phone: "",
            city: "",
            country: "",
          });
          setConfirmPassword("");
          setOpen(false);
        });
      });
    }
  };

  const handleEdit = () => {
    if (validateSubmit()) {
      dispatch(
        updateUser({ userId: editUserData?.id, createUserData: userData })
      ).then(() => {
        dispatch(fetchAllUsers({ size: 5, page: 1 })).then(() => {
          setEditUserData(null);
          setOpen(false);
          setUserData({
            fullName: "",
            email: "",
            password: "",
            phone: "",
            city: "",
            country: "",
          });
        });
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setEditUserData(null);
    setUserData({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      city: "",
      country: "",
    });
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: null }));
  };
  return (
    <Modal
      title={editUserData ? "Edit User" : "Create User"}
      closable={false}
      maskClosable={false}
      open={open}
      width={"max-content"}
      centered
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_small btn_secondary"
            onClick={handleCancel}
            disabled={cudUserloading}
          >
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={editUserData ? handleEdit : handleCreate}
            disabled={cudUserloading}
          >
            {cudUserloading ? (
              <Loader color="white" />
            ) : editUserData ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>,
      ]}
    >
      <div className={styles.container}>
        <div className={styles.container_1}>
          <div className={`input_controller`}>
            <p>
              Full name <span>*</span>
            </p>
            <input
              type="text"
              placeholder="Please enter full name"
              name="fullName"
              value={userData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName ? (
              <div className={`validation_error`}>
                <p>{errors.fullName}</p>
                <p onClick={() => handleCloseError("fullName")}>
                  <CloseCircleFilled style={{ fontSize: "10px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={`input_controller`}>
            <p>
              Email <span>*</span>
            </p>
            <input
              type="email"
              placeholder="Please enter email address"
              name="email"
              value={userData.email.toLowerCase()}
              onChange={handleInputChange}
              disabled={editUserData}
            />
            {errors.email ? (
              <div className={`validation_error`}>
                <p>{errors.email}</p>
                <p onClick={() => handleCloseError("email")}>
                  <CloseCircleFilled style={{ fontSize: "10px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          {editUserData ? (
            <></>
          ) : (
            <>
              <div className={`input_controller`}>
                <p>
                  Password <span>*</span>
                </p>
                <input
                  type="password"
                  placeholder="Please enter password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                />
                {errors.password ? (
                  <div className={`validation_error`}>
                    <p>{errors.password}</p>
                    <p onClick={() => handleCloseError("password")}>
                      <CloseCircleFilled style={{ fontSize: "10px" }} />
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className={`input_controller`}>
                <p>
                  Confirm password <span>*</span>
                </p>
                <input
                  type="password"
                  placeholder="Please confirm password"
                  onChange={handleInputChange}
                  name="confirmPassword"
                  value={confirmPassword}
                />
                {errors.confirmPassword ? (
                  <div className={`validation_error`}>
                    <p>{errors.confirmPassword}</p>
                    <p onClick={() => handleCloseError("confirmPassword")}>
                      <CloseCircleFilled style={{ fontSize: "10px" }} />
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          )}
        </div>
        <div className={styles.container_2}>
          <div className={`input_controller`}>
            <p>
              Phone <span>*</span>
            </p>
            <input
              type="tel"
              placeholder="Please enter mobile number"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled={editUserData?.phone}
            />
            {errors.phone ? (
              <div className={`validation_error`}>
                <p>{errors.phone}</p>
                <p onClick={() => handleCloseError("phone")}>
                  <CloseCircleFilled style={{ fontSize: "10px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={`input_controller`}>
            <p>City:</p>
            <input
              type="text"
              placeholder="Please enter city(optional)"
              name="city"
              value={userData?.city}
              onChange={handleInputChange}
            />
          </div>
          <div className={`input_controller`}>
            <p>Country:</p>
            <input
              type="text"
              placeholder="Please enter country(optional)"
              name="country"
              value={userData?.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateUpdateUserModal;
