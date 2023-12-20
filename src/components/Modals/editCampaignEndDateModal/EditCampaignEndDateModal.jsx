"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./EditCampaignEndDateModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaign,
  updateCampaignDetails,
} from "@/store/campaign/campaignActions";
import { CloseCircleFilled } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";

const EditCampaignEndDateModal = ({ open, setOpen, enddate }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { brandId } = useSelector((state) => state.globalVariables);
  const { id } = useParams();
  const [campaignEndDate, setcampaignEndDate] = useState("");
  const { campaign, updateCampaignDetailsLoading } = useSelector(
    (state) => state.campaign
  );
  const [error, setError] = useState("");

  const formatPostDate = (postDate) => {
    const apiDatetime = new Date(postDate);

    if (!isNaN(apiDatetime)) {
      const year = apiDatetime.getUTCFullYear();
      const month = String(apiDatetime.getUTCMonth() + 1).padStart(2, "0");
      const day = String(apiDatetime.getUTCDate()).padStart(2, "0");
      const formattedDatetime = `${year}-${month}-${day}`;
      return formattedDatetime;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (enddate) {
      const date = formatPostDate(enddate);
      setcampaignEndDate(date);
    }
  }, [enddate, open]);
  const handleSave = () => {
    if (campaignEndDate !== null && campaignEndDate !== "") {
      const data = {
        status: campaign?.status,
        end_date: campaignEndDate,
      };
      dispatch(
        updateCampaignDetails({ brandId: brandId, campaignId: id, data: data })
      ).then(() => {
        dispatch(getCampaign({ brandId, campaignId: id }));
      });
    } else {
      setError("Please select end date");
    }
  };

  const handleChange = (value) => {
    setcampaignEndDate(value);
    setError("");
  };
  const handleCancel = () => {
    setOpen(false);
    setcampaignEndDate(null);
    setError("");
  };
  return (
    <Modal
      title="Edit Campaign End Date"
      centered
      open={open}
      onCancel={handleCancel}
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button className="btn_small btn_secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={handleSave}
            disabled={updateCampaignDetailsLoading}
          >
            {updateCampaignDetailsLoading ? (
              <Loader size={17} color="#ffffff" />
            ) : (
              "Save"
            )}
          </button>
        </div>,
      ]}
    >
      <div className="input_controller">
        <label htmlFor="end_date"> end date</label>
        <input
          type="date"
          placeholder="End Date"
          value={campaignEndDate}
          onChange={(e) => handleChange(e.target.value)}
        />

        {error && (
          <div className={`validation_error`}>
            <p>{error}</p>
            <p onClick={() => setError("")}>
              <CloseCircleFilled style={{ fontSize: "10px" }} />
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditCampaignEndDateModal;
