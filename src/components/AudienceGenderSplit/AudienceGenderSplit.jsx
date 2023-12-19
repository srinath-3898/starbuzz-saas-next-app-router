"use client";
import Image from "next/image";
import styles from "./AudienceGenderSplit.module.css";
import user from "../../assets/svgs/user.svg";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DonutChart = dynamic(() => import("../DonutChart/DonutChart"), {
  ssr: false,
});

const AudienceGenderSplit = ({ influencer, isAdvance }) => {
  const [labels, setLabels] = useState(null);
  const [donuctChartData, setDonutChartData] = useState(null);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer?.audienceGenderSplit) {
      const labels = influencer?.audienceGenderSplit.map((item) => {
        if (item?.type === "M") {
          return "Male";
        } else {
          return "Female";
        }
      });
      const donuctChartData = influencer?.audienceGenderSplit.map(
        (item) => item?.value
      );
      setLabels(labels);
      setDonutChartData(donuctChartData);
    }
  }, [influencer?.audienceGenderSplit]);

  useEffect(() => {
    if (labels && donuctChartData) {
      setSeries(donuctChartData);
      setOptions({
        chart: {
          type: "donut",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 100,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        labels: labels,
      });
    }
  }, [labels, donuctChartData]);
  return (
    <div className={styles.conatiner}>
      <div className={styles.conatiner_1}>
        <Image src={user} alt="" />
        <p className="text_medium bold">Audience Gender Split</p>
      </div>
      <div style={{ filter: isAdvance ? "none" : "blur(5px)" }}>
        {options && series ? (
          <DonutChart options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AudienceGenderSplit;
