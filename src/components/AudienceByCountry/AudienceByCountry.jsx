"use client";
import { useState, useEffect } from "react";
import internet from "../../assets/svgs/internet.svg";
import styles from "./AudienceByCountry.module.css";
import Image from "next/image";
import dynamic from "next/dynamic";

const BarGraph = dynamic(() => import("../BarGraph/BarGraph"), {
  ssr: false,
});

const AudienceByCountry = ({ influencer, isAdvance }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer.audienceByCountry) {
      const categories = influencer?.audienceByCountry?.map(
        (item) => item?.Country
      );
      const data = influencer?.audienceByCountry?.map(
        (item) => item?.Followers
      );
      setCategories(categories);
      setData(data);
    }
  }, [influencer.audienceByCountry]);

  useEffect(() => {
    if ((categories, data)) {
      setOptions({
        chart: {
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
        },
        xaxis: {
          categories,
        },
        colors: ["#FF2345"],
      });
      setSeries([{ data: data, name: "Value" }]);
    }
  }, [categories, data]);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={internet} alt="" />
        <p className="text_small bold">Audience By Country</p>
      </div>
      <div style={{ filter: isAdvance ? "none" : "blur(5px)" }}>
        {options && series ? (
          <BarGraph options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AudienceByCountry;
