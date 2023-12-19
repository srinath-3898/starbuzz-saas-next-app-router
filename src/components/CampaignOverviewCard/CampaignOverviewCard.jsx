"use client";
import React from "react";
import styles from "./CampaignOverviewCard.module.css";
import Image from "next/image";
import tiktok from "../../.../../assets/svgs/tiktok.svg";
import { InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";

const CampaignOverviewCard = ({ title, image, value, color }) => {
  function formatNumber(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      const formatted = (number / 1000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "K"
        : formatted + "K";
    } else if (number < 1000000000) {
      const formatted = (number / 1000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "M"
        : formatted + "M";
    } else {
      const formatted = (number / 1000000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "B"
        : formatted + "B";
    }
  }

  return (
    <div className={styles.container} style={{ backgroundColor: color }}>
      <div className={styles.container_1}>
        <Image src={image} alt="" />
      </div>
      <div className={styles.container_2}>
        <p className={`text_medium`} id={styles.title}>
          {title}
        </p>
        {title === "Platforms" ? (
          <div className={styles.icons}>
            {value?.map((platform) => (
              <div key={platform?.id}>
                {platform?.short_name === "yt" ? (
                  <YoutubeOutlined
                    style={{ fontSize: "21px", color: "#FF0000" }}
                  />
                ) : platform?.short_name === "ig" ? (
                  <InstagramOutlined
                    style={{ fontSize: "21px", color: "#FA0352" }}
                  />
                ) : (
                  <Image src={tiktok} alt="tiktok" width={16} height={16} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text_medium">{formatNumber(value)}</p>
        )}
      </div>
    </div>
  );
};

export default CampaignOverviewCard;
