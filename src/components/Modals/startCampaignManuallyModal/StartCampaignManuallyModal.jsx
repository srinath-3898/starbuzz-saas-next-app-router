"use client";
import { Modal } from "antd";
import React, { useState } from "react";
import styles from "./StartCampaignManuallyModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCampaign, startCampaign } from "@/store/campaign/campaignActions";
import { CloseCircleFilled } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import { useParams, useRouter } from "next/navigation";

const StartCampaignManuallyModal = ({ open, setOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { campaignStartLoading } = useSelector((state) => state.campaign);
  const { brandId } = useSelector((state) => state.globalVariables);
  const { id } = useParams();
  const [hasDeadLine, setHasDeadLine] = useState(true);
  const [campaignDates, setCampaignDates] = useState({
    start_date: null,
    end_date: null,
  });
  const [errors, setErrors] = useState({});

  const handleCancel = () => {
    setOpen(false);
    setHasDeadLine(true);
    setCampaignDates({
      start_date: "",
      end_date: "",
    });
    setErrors({
      start_date: "",
      end_date: "",
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCampaignDates({
      ...campaignDates,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const validateDates = () => {
    const errors = {};
    if (campaignDates.start_date === "" || campaignDates.start_date === null) {
      errors.start_date = "Start date is required";
    }
    if (
      (hasDeadLine && campaignDates.end_date === "") ||
      (hasDeadLine && campaignDates.end_date === null)
    ) {
      errors.end_date = "End date is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateDates()) {
      dispatch(
        startCampaign({ brandId: brandId, campaignId: id, data: campaignDates })
      ).then(() => {
        dispatch(getCampaign({ brandId: brandId, campaignId: id }));
        setOpen(false);
      });
      console.log("form is valid ");
      console.log(campaignDates);
    }
  };
  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: null }));
  };

  return (
    <Modal
      title="Start Campaign Manually"
      centered
      open={open}
      footer={[
        <div className={styles.footer} key={"footer"}>
          <button className="btn_small btn_secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={handleSubmit}
            disabled={campaignStartLoading}
          >
            {campaignStartLoading ? <Loader /> : "Start"}
          </button>
          ,
        </div>,
      ]}
      onCancel={handleCancel}
    >
      <div>
        <div className="input_controller">
          <p className="text_small bold">Start Date</p>
          <input
            type="date"
            name="start_date"
            value={campaignDates.start_date}
            onChange={handleInputChange}
          />
        </div>

        {errors.start_date ? (
          <div className={`validation_error`}>
            <p>{errors.start_date}</p>
            <p onClick={() => handleCloseError("start_date")}>
              <CloseCircleFilled style={{ fontSize: "10px" }} />
            </p>
          </div>
        ) : (
          <></>
        )}

        <div style={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <input
            color="blue"
            type="checkbox"
            checked={hasDeadLine}
            value={campaignDates.end_date}
            onChange={() => {
              setHasDeadLine(!hasDeadLine);
              if (!hasDeadLine) {
                setCampaignDates({ ...campaignDates, end_date: "" });
              }
            }}
          />{" "}
          Has Deadline
        </div>
        {hasDeadLine ? (
          <>
            <div className="input_controller">
              <p className="text_medium bold">Deadline Date</p>
              <input
                type="date"
                name="end_date"
                value={campaignDates.end_date}
                onChange={handleInputChange}
              />
            </div>
            {errors.end_date ? (
              <div className={`validation_error`}>
                <p>{errors.end_date}</p>
                <p onClick={() => handleCloseError("end_date")}>
                  <CloseCircleFilled style={{ fontSize: "10px" }} />
                </p>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </Modal>
  );
};

export default StartCampaignManuallyModal;
