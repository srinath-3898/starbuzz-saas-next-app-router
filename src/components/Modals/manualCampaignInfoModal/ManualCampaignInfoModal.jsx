import { Modal } from "antd";
import React from "react";
import styles from "./ManualCampaignInfoModal.module.css";
const ManualCampaignInfoModal = ({
  open,
  setOpen,
  startCampaignManuallyModalOpen,
}) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    setOpen(false);
    startCampaignManuallyModalOpen(true);
  };
  return (
    <Modal
      centered
      open={open}
      title="Terms & Conditions"
      onCancel={handleCancel}
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button className="btn_secondary btn_medium" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn_primary btn_medium" onClick={handleAgree}>
            Agree & Continue
          </button>
        </div>,
      ]}
    >
      <div style={{ padding: "0 20px ", fontSize: "12px" }}>
        <ul className={styles.list}>
          <li>
            You can update the status of negotiation of the influencers in the
            dashboard.
          </li>
          <li>
            Please note that any changes in the campaign will not be allowed
            once you start the campaign.
          </li>
          <li>
            You can start recording the relevant metrics of the influencers
            added to the campaign.
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default ManualCampaignInfoModal;
