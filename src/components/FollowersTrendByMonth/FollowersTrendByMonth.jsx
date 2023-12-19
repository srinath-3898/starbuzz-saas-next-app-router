"use client";
import Image from "next/image";
import styles from "./FollowersTrendByMonth.module.css";
import diary from "../../assets/svgs/diary.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AreaChart = dynamic(() => import("../AreaChart/AreaChart"), {
  ssr: false,
});

const FollowersTrendByMonth = ({ influencer, isAdvance }) => {
  const [labels, setLables] = useState(null);
  const [values, setValues] = useState(null);
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    if (influencer?.followersChart) {
      const labels = influencer?.followersChart?.map((item) => item.date);
      const values = influencer?.followersChart?.map((item) => item.Followers);
      setLables(labels);
      setValues(values);
    }
  }, [influencer?.followersChart]);

  useEffect(() => {
    if (labels && values) {
      setOptions({
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
          colors: ["#fe5900"],
        },
        fill: {
          colors: ["#fe5900"],
        },
        labels: labels,
        markers: {
          colors: ["#fe5900"],
        },
        tooltip: {
          theme: "dark",
          markers: {
            colors: ["FF5900"],
          },
        },
      });
      setSeries([
        {
          name: "Followers",
          data: values,
        },
      ]);
    }
  }, [labels, values]);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={diary} alt="" />
        <p className="text_medium bold">Followers Trend By Month</p>
      </div>
      <div style={{ filter: isAdvance ? "none" : "blur(5px)" }}>
        {options && series ? (
          <AreaChart options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FollowersTrendByMonth;
