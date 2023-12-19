import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./BillingAddressModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import {
  addBillingAddress,
  generateAddonCheckoutUrl,
  generateCheckoutUrl,
  getStates,
} from "@/store/payment/paymentActions";
import { getUserDetails } from "@/store/auth/authActions";
import {
  resetAddBillingAddressData,
  resetGenerateAddonCheckoutUrlData,
  resetGenerateCheckoutURLData,
} from "@/store/payment/paymentSlice";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";

const BillingAddressModal = ({
  open,
  setOpen,
  selectedPlanData,
  setSelectedPlanData,
  featureId,
  campaignId,
  quantity,
}) => {
  const dispatch = useDispatch();

  const { organisation } = useSelector((state) => state.auth);
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    addBillingAddressLoading,
    addBillingAddressMessage,
    addBillingAddressError,
    addBillingAddressErrorCode,
    generateCheckoutURLLoading,
    checkoutURL,
    generateCheckoutURLError,
    generateCheckoutURLErrorCode,
    generateAddonCheckoutUrlLoading,
    addonCheckoutURL,
    generateAddonCheckoutUrlError,
    generateAddonCheckoutUrlErrorCode,
    getStatesLoading,
    states,
    getStatesError,
  } = useSelector((state) => state.payment);

  const [billingAddressFormData, setBillingAddressFormData] = useState({
    phone: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    country_code: "",
    isTaxable: false,
    vat_number: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    address_line_one: "",
    address_line_two: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    country_code: "",
    vat_number: "",
  });
  const [iframeLoading, setIframeLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBillingAddressFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const billingAddressFormValidator = () => {
    const errors = {};
    if (!billingAddressFormData.phone) {
      errors.phone = "User Mobile is required";
    } else if (billingAddressFormData.phone.trim().length === 0) {
      errors.phone = "User Mobile is required";
    } else if (
      billingAddressFormData.phone.trim().length < 10 ||
      billingAddressFormData.phone.trim().length > 10
    ) {
      errors.phone = "Please enter 10 digit mobile number";
    } else if (!/^[0-9]{10}$/.test(billingAddressFormData.phone)) {
      errors.phone = "Please enter numbers only from 0-9";
    }
    if (!billingAddressFormData.address_line_one) {
      errors.address_line_one = "Address line one is required";
    } else if (billingAddressFormData.address_line_one.trim().length === 0) {
      errors.address_line_one = "Address line one is required";
    }
    if (!billingAddressFormData.address_line_two) {
      errors.address_line_two = "Address line two is required";
    } else if (billingAddressFormData.address_line_two.trim().length === 0) {
      errors.address_line_two = "Address line one is required";
    }
    if (!billingAddressFormData.city) {
      errors.city = "City is required";
    } else if (billingAddressFormData.city.trim().length === 0) {
      errors.city = "City is required";
    }
    if (!billingAddressFormData.zip) {
      errors.zip = "Zip code is required";
    }
    if (!billingAddressFormData.state) {
      errors.state = "State is required";
    } else if (billingAddressFormData.state.trim().length === 0) {
      errors.state = "State is required";
    }
    if (!billingAddressFormData.country) {
      errors.country = "Country is required";
    } else if (billingAddressFormData.country.trim().length === 0) {
      errors.country = "Country is required";
    }
    if (!billingAddressFormData.country_code) {
      errors.country_code = "Country code is required";
    } else if (billingAddressFormData.country_code.trim().length === 0) {
      errors.country_code = "Country code is required";
    }
    if (
      !billingAddressFormData.vat_number &&
      billingAddressFormData.isTaxable
    ) {
      errors.vat_number = "GST number is required";
    } else if (billingAddressFormData.vat_number) {
      if (billingAddressFormData.vat_number.trim().length === 0) {
        errors.vat_number = "GST number is required";
      }
    }
    setErrors((prevState) => ({ ...prevState, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (billingAddressFormValidator()) {
      dispatch(addBillingAddress(billingAddressFormData));
    }
  };

  const handleCancel = () => {
    if (selectedPlanData) {
      setSelectedPlanData({});
    }
    setOpen(false);
    dispatch(getUserDetails());
  };

  useEffect(() => {
    if (open) {
      dispatch(resetAddBillingAddressData());
      dispatch(resetGenerateCheckoutURLData());
      dispatch(resetGenerateAddonCheckoutUrlData());
    }
  }, [open]);

  useEffect(() => {
    if (organisation) {
      console.log(organisation);
      setBillingAddressFormData({
        ...organisation,
        country: "INDIA",
        country_code: "IN",
        vat_number: organisation?.vat_number ? organisation?.vat_number : "",
        state: organisation?.state ? organisation?.state : "",
      });
    }
  }, [organisation]);

  useEffect(() => {
    if (addBillingAddressMessage) {
      if (selectedPlanData) {
        dispatch(generateCheckoutUrl(selectedPlanData));
      } else {
        dispatch(
          generateAddonCheckoutUrl({
            brandId: brandId,
            featureId,
            quantity,
            itemId: campaignId,
          })
        );
      }
    }
  }, [addBillingAddressMessage]);

  useEffect(() => {
    if (checkoutURL) {
      window.open(checkoutURL, "_blank");
      setOpen(false);
    }
  }, [checkoutURL]);

  useEffect(() => {
    if (addonCheckoutURL) {
      window.open(addonCheckoutURL, "_blank");
      setOpen(false);
    }
  }, [addonCheckoutURL]);

  useEffect(() => {
    dispatch(getStates());
  }, [open]);

  return (
    <Modal
      title="Billing Address"
      open={open}
      maskClosable={false}
      onCancel={handleCancel}
      centered
      width={1000}
      footer={
        !addBillingAddressMessage && !addBillingAddressError
          ? [
              <div key={"footer"} className={styles.footer}>
                <button
                  className="btn_small btn_secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn_small btn_primary"
                  onClick={handleSubmit}
                  disabled={addBillingAddressLoading}
                >
                  {addBillingAddressLoading ||
                  generateAddonCheckoutUrlLoading ? (
                    <Loader size={14} color="#ffffff" />
                  ) : (
                    "Save & Proceed"
                  )}
                </button>
              </div>,
            ]
          : null
      }
    >
      <div className={styles.billing_address_modal}>
        {addBillingAddressMessage &&
        (generateCheckoutURLLoading || generateAddonCheckoutUrlLoading) ? (
          <div className={styles.add_billing_address_message_or_error}>
            <p className="text_small">{addBillingAddressMessage}</p>
            <p className="text_small">
              Please wait, redirecting to payments page...
            </p>
            <LoadingOutlined style={{ color: "#fe5900", fontSize: "20px" }} />
          </div>
        ) : (
          <></>
        )}
        {addBillingAddressError ||
        generateCheckoutURLError ||
        generateAddonCheckoutUrlError ? (
          <div className={styles.add_billing_address_message_or_error}>
            <Error
              message={
                addBillingAddressError
                  ? addBillingAddressError
                  : generateCheckoutURLError
                  ? generateCheckoutURLError
                  : generateAddonCheckoutUrlError
              }
              errorCode={
                addBillingAddressErrorCode
                  ? addBillingAddressErrorCode
                  : generateCheckoutURLErrorCode
                  ? generateCheckoutURLErrorCode
                  : generateAddonCheckoutUrlErrorCode
              }
            />
          </div>
        ) : (
          <></>
        )}
        {!addBillingAddressMessage && !addBillingAddressError ? (
          <form className={styles.billing_address_form}>
            <div className={styles.container_1}>
              <div>
                <div className="input_controller">
                  <p htmlFor="phone">Phone number</p>
                  <input
                    id="phone"
                    type="text"
                    placeholder="Please Enter Organisation Phone number"
                    name="phone"
                    value={billingAddressFormData?.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.phone && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="address_line_one">Address Line 1:</label>
                  <input
                    id="address_line_one"
                    type="text"
                    placeholder="Please Enter Address Line 1"
                    name="address_line_one"
                    value={billingAddressFormData?.address_line_one}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.address_line_one && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.address_line_one}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="address_line_two">Address Line 2:</label>
                  <input
                    id="address_line_two"
                    type="text"
                    placeholder="Please Enter Address Line 2"
                    name="address_line_two"
                    value={billingAddressFormData?.address_line_two}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.address_line_two && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.address_line_two}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="country">Country</label>
                  <input
                    id="country"
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={billingAddressFormData?.country}
                    disabled={true}
                    required
                  />
                </div>
                {errors?.country && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.country}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="country_code">Country code</label>
                  <input
                    id="country_code"
                    type="text"
                    placeholder="Country Code"
                    name="country_code"
                    value={billingAddressFormData?.country_code}
                    disabled={true}
                  />
                </div>
                {errors?.country_code && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.country_code}</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.container_2}>
              <div>
                <div className="input_controller">
                  <label htmlFor="state">State:</label>
                  <Select
                    showSearch
                    placeholder="Please Select State"
                    allowClear
                    value={billingAddressFormData?.state}
                    loading={getStatesLoading}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={states?.map((state) => ({
                      label: state?.name,
                      value: state?.name,
                    }))}
                    dropdownRender={(options) => {
                      return getStatesError ? (
                        <p
                          style={{
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "red",
                          }}
                        >
                          {getStatesError}
                        </p>
                      ) : (
                        options
                      );
                    }}
                    onChange={(value) => {
                      setErrors((prevState) => ({
                        ...prevState,
                        state: "",
                      }));
                      setBillingAddressFormData((prevState) => ({
                        ...prevState,
                        state: value,
                      }));
                    }}
                  />
                </div>
                {errors?.state && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.state}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="city">City:</label>
                  <input
                    id="city"
                    type="text"
                    placeholder="City"
                    name="city"
                    value={billingAddressFormData?.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.city && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.city}</p>
                  </div>
                )}
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="zip">Zip/Pincode:</label>
                  <input
                    id="zip"
                    type="text"
                    placeholder="Please enter Zip / Pincode"
                    name="zip"
                    value={billingAddressFormData?.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors?.zip && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.zip}</p>
                  </div>
                )}
              </div>

              <div className="input_controller">
                <p>Is GST available</p>
                <div className={styles.is_taxable}>
                  <div className="input_controller_radio">
                    <input
                      type="radio"
                      id="yes"
                      checked={billingAddressFormData?.isTaxable}
                      onChange={() =>
                        setBillingAddressFormData((prevState) => ({
                          ...prevState,
                          isTaxable: true,
                        }))
                      }
                    />
                    <label htmlFor="yes">Yes</label>
                  </div>
                  <div className="input_controller_radio">
                    <input
                      type="radio"
                      id="no"
                      checked={!billingAddressFormData?.isTaxable}
                      onChange={() =>
                        setBillingAddressFormData((prevState) => ({
                          ...prevState,
                          isTaxable: false,
                          vat_number: "",
                        }))
                      }
                    />
                    <label htmlFor="yes">No</label>
                  </div>
                </div>
              </div>
              <div>
                <div className="input_controller">
                  <label htmlFor="vat_number">GST</label>
                  <input
                    id="vat_number"
                    type="text"
                    placeholder="Enter your GST number"
                    name="vat_number"
                    value={billingAddressFormData?.vat_number}
                    disabled={!billingAddressFormData?.isTaxable}
                    onChange={handleChange}
                  />
                </div>
                {errors?.vat_number && (
                  <div className="validation_error">
                    <p className={`text_small`}>{errors.vat_number}</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default BillingAddressModal;
