import React from "react";
import styles from "./PartOne.module.css";
import Image from "next/image";
import { CheckCircleFilled } from "@ant-design/icons";
import CircularProgessBar from "@/components/CircularProgressBar/CircularProgessBar";
const PartOne = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image
          className={styles.profile_pic}
          src={influencer?.profilePic}
          alt=""
          height={160}
          width={160}
        />
      </div>
      <div className={styles.container_2}>
        <p className="text_large bold">
          @{influencer?.username}{" "}
          <span>
            {influencer?.is_verified ? (
              <CheckCircleFilled style={{ margin: "3px", color: "blue" }} />
            ) : (
              ""
            )}
          </span>
        </p>{" "}
        <p className="text_medium">{influencer?.title}</p>
        <p className="text_medium"> category : {influencer?.category_name}</p>
        <p className="text_medium">
          Lang: {influencer?.blogger_languages?.toString()}
        </p>
      </div>
      <div className={styles.container_3}>
        <CircularProgessBar
          value={influencer?.cqs?.value}
          StrokeColor={"#fe5900"}
          size={150}
          strokeWidth={5}
        />
        <p className="text_medium bold">SB Score</p>
      </div>
    </div>
  );
};

export default PartOne;
