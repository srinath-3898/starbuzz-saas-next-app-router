"use client";
import Image from "next/image";
import styles from "./AudienceInterests.module.css";
import audience from "../../assets/svgs/audience.svg";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ColoumnChart = dynamic(() => import("../ColoumnChart/ColoumnChart"), {
  ssr: false,
});

const AudienceInterests = ({ influencer, isAdvance }) => {
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState(null);
  const [coloumnChartData, setColoumnChartData] = useState(null);

  useEffect(() => {
    if (influencer?.audienceInterests) {
      const categories = influencer?.audienceInterests?.map(
        (item) => item.type
      );
      const coloumnChartData = influencer?.audienceInterests?.map(
        (item) => item.value
      );
      setCategories(categories);
      setColoumnChartData(coloumnChartData);
    }
  }, [influencer?.audienceInterests]);

  useEffect(() => {
    if (categories && coloumnChartData) {
      setSeries([
        {
          name: "Value",
          data: coloumnChartData,
        },
      ]);
      setOptions({
        chart: {
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            dataLabels: {
              position: "center",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          style: {
            fontSize: "12px",
            colors: ["#ffffff"],
          },
        },

        xaxis: {
          categories: categories,
          position: "bottom",
        },
        colors: ["#ff0000"],
      });
    }
  }, [categories, coloumnChartData]);
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={audience} alt="" />
        <p className="text_medium bold">Audience Interests</p>
      </div>
      <div style={{ filter: isAdvance ? "none" : "blur(5px)" }}>
        {options && series ? (
          <ColoumnChart options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AudienceInterests;
