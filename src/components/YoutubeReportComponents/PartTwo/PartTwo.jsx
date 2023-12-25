import React from "react";
import styles from "./PartTwo.module.css";
const PartTwo = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className="text_medium">subscribers</p>
        <p className="text_medium bold">{influencer?.subscribers_count}</p>
      </div>
      <div className={styles.card}>
        <p className="text_medium">Subscribers growth</p>
        <p className="text_medium bold">
          {influencer?.subscribers_growth_prc_30d?.value} %
        </p>
      </div>
      <div className={styles.card}>
        <p className="text_medium">Video frequency</p>
        <p className="text_medium bold">
          {influencer?.videos_per_week}{" "}
          <span style={{ fontWeight: 400 }}>per week</span>
        </p>
      </div>
      <div className={styles.card}>
        <p className="text_medium">Avg. Views</p>
        <p className="text_medium bold">
          {influencer?.views_avg}{" "}
          <span style={{ fontWeight: 400 }}>per video</span>
        </p>
      </div>
      <div className={styles.card}>
        <p className="text_medium">Avg. Engagement</p>
        <p className="text_medium bold">
          {influencer?.engagement_avg}{" "}
          <span style={{ fontWeight: 400 }}>per video</span>
        </p>
      </div>
      <div className={styles.card}>
        <p className="text_medium">Engagement Rate</p>
        <p className="text_medium bold">
          {influencer?.er?.value} {influencer?.er?.mark}{" "}
        </p>
      </div>
    </div>
  );
};

export default PartTwo;
