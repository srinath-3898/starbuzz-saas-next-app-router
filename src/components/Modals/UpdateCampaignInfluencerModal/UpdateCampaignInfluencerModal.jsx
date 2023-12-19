import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./UpdateCampaignInfluencerModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCampaignInfluencer } from "@/store/campaign/campaignActions";
import Loader from "@/components/Loader/Loader";

const UpdateCampaignInfluencerModal = ({
  open,
  setOpen,
  influencer,
  setInfluencer,
  campaign,
}) => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const { updateCampaignInfluencerLoading } = useSelector(
    (state) => state.campaign
  );

  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const statusOptions = [
    {
      value: "ACCEPTED",
      label: "ACCEPTED",
    },
    {
      value: "REJECTED",
      label: "REJECTED",
    },
    {
      value: "PENDING",
      label: "PENDING",
    },
    {
      value: "NEGOTIATED",
      label: "NEGOTIATED",
    },
  ];

  const handleSubmit = () => {
    dispatch(
      updateCampaignInfluencer({
        username: influencer?.username,
        status,
        budget,
        brandId,
        campaignId: campaign?.id,
        notes,
      })
    ).then(() => {
      setInfluencer(null);
      setOpen(false);
    });
  };

  const handleCancel = () => {
    setInfluencer(null);
    setOpen(false);
  };

  useEffect(() => {
    if (influencer) {
      setStatus(influencer?.CampaignInfluencers?.status);
      setBudget(influencer?.CampaignInfluencers?.budget);
      setNotes(influencer?.CampaignInfluencers?.notes || "");
    }
  }, [influencer]);

  return (
    <Modal
      title="Edit influencer budget"
      open={open}
      centered
      maskClosable={false}
      closable={false}
      footer={
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_secondary btn_small"
            onClick={handleCancel}
            disabled={updateCampaignInfluencerLoading}
          >
            Cancel
          </button>
          <button
            className="btn_primary btn_small"
            onClick={handleSubmit}
            disabled={updateCampaignInfluencerLoading}
          >
            {updateCampaignInfluencerLoading ? (
              <Loader size={17} color="#ffffff" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      }
    >
      <div className={styles.container}>
        <div className="input_controller">
          <label htmlFor="influencer_status">Status</label>
          <Select
            id="influencer_status"
            options={statusOptions}
            value={status}
            placeholder="Influencer status"
            onChange={setStatus}
          />
        </div>
        <div className="input_controller">
          <label htmlFor="influencer_budget">Budget</label>
          <input
            type="number"
            id="influencer_budget"
            placeholder="Influencer budget"
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
          />
        </div>
        <div className="input_controller">
          <label htmlFor="influencer_note">Notes</label>
          <input
            type="text"
            id="influencer_note"
            placeholder="Influencer notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdateCampaignInfluencerModal;
