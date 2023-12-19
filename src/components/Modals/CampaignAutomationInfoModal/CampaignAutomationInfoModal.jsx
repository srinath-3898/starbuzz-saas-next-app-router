import { Modal } from "antd";
import React from "react";
import styles from "./CampaignAutomationInfoModal.module.css";

const CampaignAutomationInfoModal = ({
  open,
  setOpen,
  setBillingAddressModalOpen,
}) => {
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setBillingAddressModalOpen(true);
  };

  return (
    <Modal
      title="Terms & Conditions"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button className="btn_secondary btn_medium" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn_primary btn_medium" onClick={handleOk}>
            Agree & Continue
          </button>
        </div>,
      ]}
    >
      <div
        style={{
          padding: "0 20px ",
          fontSize: "12px",
        }}
      >
        <ul className={styles.list}>
          <li> Once you click this button, the campaign process starts.</li>
          <li>
            A dedicated manager will be assigned to your campaign and will be
            incharge of communicating and managing the influencers.{" "}
          </li>
          <li>
            Please note that any changes in the campaign will not be allowed
            after this step.
          </li>
          <li>
            {" "}
            You can see the current status in the dashboard. A nominal fee of
            Rs.5000 is required to start this process to ensure that you want to
            go ahead with the selected influencers (influencers added to the
            campaign) and there is no change in the plan.
          </li>
          <li>
            This will also help us avoid any unnecessary initiations with the
            influencers unless the brand is serious.
          </li>
          <li>
            The Rs.5000 paid will be adjusted in the amount to be paid to the
            influencers. For example, if your campaign budget is Rs.50,000 and
            you paid Rs.5000 to initiate the process, you’ll have to pay the
            remaining amount of Rs.45,000 only.
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default CampaignAutomationInfoModal;
