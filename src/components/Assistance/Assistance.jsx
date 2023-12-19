import Image from "next/image";
import Link from "next/link";
import styles from "./Assistance.module.css";
import customerSupport from "../../assets/svgs/customerSupport.svg";

const Assistance = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.container_1}>
          <p className="text_large">Assistance is just one call away</p>
          <p className={`text_small`}>
            Reach out to us for any support and guidance.
          </p>
          <Link
            href={{ pathname: "https://wa.me/+919000134357" }}
            target="_blank"
          >
            <button className={`btn_small btn_primary`}>Call Now</button>
          </Link>
        </div>
        <div className={styles.container_2}>
          <Image src={customerSupport} alt="customer support" priority />
        </div>
      </div>
    </div>
  );
};

export default Assistance;
