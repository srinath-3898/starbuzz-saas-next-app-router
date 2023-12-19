"use client";
import React, { useEffect, useState } from "react";
import styles from "./CreateBrandModal.module.css";
import { Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { createBrand, updateBrand } from "@/store/brand/brandActions";
import { getAllBrands } from "@/store/brands/brandsActions";
import { resetCreateBrandData } from "@/store/brand/brandSlice";
import Loader from "@/components/Loader/Loader";
import PushToSubscriptionModal from "@/components/Modals/PushToSubscriptionModal/PushToSubscriptionModal";

const CreateBrandModal = ({ open, setOpen, brand }) => {
  const dispatch = useDispatch();
  const { cudBrandLoading, hasEnoughCredits, cudBrandMessage, error } =
    useSelector((state) => state.brand);

  const [brandDetails, setBrandDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [pushToSubscriptionModalOpen, setPushToSubscriptionModalOpen] =
    useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setBrandDetails((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase(),
      }));
    } else {
      setBrandDetails((prevState) => ({ ...prevState, [name]: value }));
    }
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateSubmit = () => {
    const errors = {};
    if (brandDetails.name.length <= 0) {
      errors.name = "Please enter brand name";
    }
    if (
      brandDetails.email.length <= 0 ||
      !/\S+@\S+\.\S+/.test(brandDetails.email)
    ) {
      errors.email = "Please enter valid brand email";
    }
    if (
      brandDetails.phone.length <= 0 ||
      brandDetails.phone.length > 10 ||
      brandDetails.phone.length < 10
    ) {
      errors.phone = "Please enter a valid  mobile number";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleCreateBrand = () => {
    if (validateSubmit()) {
      dispatch(createBrand(brandDetails)).then((response) => {
        if (response?.payload?.status === 200) {
          setOpen(false);
          localStorage.removeItem("brands");
          localStorage.removeItem("brandId");
          dispatch(getAllBrands({ size: 5, page: 1 })).then(() => {
            setBrandDetails({ name: "", email: "", phone: "" });
            setErrors({});
          });
        } else if (response?.payload?.data?.hadEnoughCredist === false) {
          setOpen(false);
        }
      });
    }
  };

  const handleUpdateBrand = () => {
    if (validateSubmit()) {
      dispatch(updateBrand({ brandId: brand?.id, brandDetails })).then(
        (response) => {
          if (response?.payload?.status === 200) {
            localStorage.removeItem("brands");
            localStorage.removeItem("brandId");
            dispatch(getAllBrands({ size: 5, page: 1 })).then(() => {
              setOpen(false);
              setBrandDetails({ name: "", email: "", phone: "" });
              setErrors({});
            });
          }
        }
      );
    }
  };

  const handleCancel = () => {
    if (!brand) {
      setBrandDetails({ name: "", email: "", phone: "" });
    }
    setErrors({});
    setOpen(false);
  };

  useEffect(() => {
    if (brand) {
      setBrandDetails((prevState) => ({
        ...prevState,
        name: brand?.name,
        email: brand?.email,
        phone: brand?.phone,
      }));
    } else {
      setBrandDetails({ name: "", email: "", phone: "" });
    }
  }, [brand]);

  useEffect(() => {
    if (cudBrandMessage || error) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: (cudBrandMessage && cudBrandMessage) || (error && error),
        duration: 3,
        icon: cudBrandMessage ? (
          <CheckCircleOutlined style={{ color: "#ff5900", fontSize: "16px" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
    }
    dispatch(resetCreateBrandData());
  }, [cudBrandMessage, error]);

  return (
    <>
      {contextHolder}
      <Modal
        title={brand ? "Update brand" : "Create Brand"}
        open={open}
        maskClosable={false}
        closable={false}
        footer={null}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className={`${
            brand ? styles.update_brand_modal : styles.create_brand_modal
          }`}
        >
          <div className={styles.input_controller}>
            <p>Brand name</p>
            <input
              type="text"
              placeholder="Brand name"
              name="name"
              value={brandDetails.name}
              onChange={handleInputChange}
            />
            {errors?.name ? (
              <div className={styles.error}>
                <p>{errors.name}</p>
                <p onClick={() => handleCloseError("name")}>
                  <CloseCircleFilled style={{ fontSize: "12px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
          {!brand ? (
            <>
              <div className={styles.input_controller}>
                <p>Brand email</p>
                <input
                  type="text"
                  placeholder="Brand email"
                  name="email"
                  value={brandDetails.email}
                  onChange={handleInputChange}
                />
                {errors?.email ? (
                  <div className={styles.error}>
                    <p>{errors.email}</p>
                    <p onClick={() => handleCloseError("email")}>
                      <CloseCircleFilled style={{ fontSize: "12px" }} />
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.input_controller}>
                <p>Brand phone</p>
                <input
                  type="text"
                  placeholder="Brand phone number"
                  name="phone"
                  value={brandDetails.phone}
                  onChange={handleInputChange}
                />
                {errors?.phone ? (
                  <div className={styles.error}>
                    <p>{errors.phone}</p>
                    <p onClick={() => handleCloseError("phone")}>
                      <CloseCircleFilled style={{ fontSize: "12px" }} />
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          <div className={styles.btns}>
            <button className="btn_small btn_secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn_small btn_primary"
              onClick={brand ? handleUpdateBrand : handleCreateBrand}
              disabled={cudBrandLoading}
            >
              {cudBrandLoading ? (
                <Loader color={"white"} size={16} />
              ) : brand ? (
                "Update brand"
              ) : (
                "Create brand"
              )}
            </button>
          </div>
        </div>
      </Modal>
      <PushToSubscriptionModal
        open={pushToSubscriptionModalOpen}
        setOpen={setPushToSubscriptionModalOpen}
        message={
          "You don't have enough credits to create brand or your plan might have expired, please subscribe to continue"
        }
        resetData={resetCreateBrandData}
      />
    </>
  );
};

export default CreateBrandModal;
