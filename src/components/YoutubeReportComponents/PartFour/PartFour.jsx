import React from "react";
import styles from "./PartFour.module.css";

const PartFour = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.card_content}>
          <p className="text_large bold">Worldwide</p>
          <p className="text_large bold">
            {" "}
            {influencer?.rankings?.worldwide?.rank
              ? "#" + influencer?.rankings?.worldwide?.rank
              : "NA"}
          </p>
        </div>
        <p className="text_medium">Global Rank</p>
      </div>
      <div className={styles.card}>
        <div className={styles.card_content}>
          <p className="text_large bold">India</p>
          <p className="text_large bold">
            {influencer?.rankings?.country?.rank
              ? "#" + influencer?.rankings?.country?.rank
              : "NA"}
          </p>
        </div>
        <p className="text_medium ">Country Rank</p>
      </div>
    </div>
  );
};

export default PartFour;
