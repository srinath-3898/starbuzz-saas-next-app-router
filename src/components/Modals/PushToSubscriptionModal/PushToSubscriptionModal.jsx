import { Modal } from "antd";
import Image from "next/image";
import image from "../../../assets/svgs/SubscribeModalImage.svg";
import styles from "./PushToSubscriptionModal.module.css";

const PushToSubscriptionModal = ({ open, message, handleSubscribe }) => {
  return (
    <Modal
      title="Please Subscribe"
      closable={false}
      maskClosable={false}
      centered
      open={open}
      footer={[
        <button
          key="subscribe"
          className="btn_small btn_primary"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>,
      ]}
    >
      <div className={styles.container}>
        <Image src={image} alt="" />
        <p className="text_medium bold">{message}</p>
      </div>
    </Modal>
  );
};

export default PushToSubscriptionModal;
