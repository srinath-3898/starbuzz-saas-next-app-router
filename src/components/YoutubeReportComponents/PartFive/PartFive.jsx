import React from "react";
import styles from "./PartFive.module.css";
import AudienceByCountry from "../ChartComponents/AudienceByCountry/AudienceByCountry";
import AudienceRaces from "../ChartComponents/AudienceRaces/AudienceRaces";

const PartFive = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <AudienceByCountry influencer={influencer} />
      <AudienceRaces influencer={influencer} />
    </div>
  );
};

export default PartFive;
