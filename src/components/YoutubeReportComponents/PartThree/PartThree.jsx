import React from "react";
import styles from "./PartThree.module.css";

const PartThree = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <p className="text_large bold">CQS {influencer?.cqs?.value}</p>
        <p className="text_medium">
          {influencer?.cqs?.mark ? influencer?.cqs?.mark?.toUpperCase() : "NA"}
        </p>
      </div>
      <div className={styles.container_2}>
        <div className={styles.card}>
          <p className="text_medium">Creator</p>
          <p className="text_medium">
            {influencer?.cqs?.value_description?.creator?.value
              ? influencer?.cqs?.value_description?.creator?.value + "/5"
              : "NA"}
          </p>
        </div>
        <div className={styles.card}>
          <p className="text_medium">Audience</p>
          <p className="text_medium">
            {" "}
            {influencer?.cqs?.value_description?.audience?.value
              ? influencer?.cqs?.value_description?.audience?.value + "/5"
              : "NA"}
          </p>
        </div>
        <div className={styles.card}>
          <p className="text_medium">Credibility</p>
          <p className="text_medium">
            {influencer?.cqs?.value_description?.credibility?.value
              ? influencer?.cqs?.value_description?.credibility?.value + "/5"
              : "NA"}
          </p>
        </div>
        <div className={styles.card}>
          <p className="text_medium">Engagement</p>
          <p className="text_medium">
            {influencer?.cqs?.value_description?.engagement?.value
              ? influencer?.cqs?.value_description?.engagement?.value + "/5"
              : "NA"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartThree;
