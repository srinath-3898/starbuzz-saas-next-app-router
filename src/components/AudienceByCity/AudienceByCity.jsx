"use client";
import { useEffect, useState } from "react";
import styles from "./AudienceByCity.module.css";
import Image from "next/image";
import city from "../../assets/svgs/city.svg";
import dynamic from "next/dynamic";

const BarGraph = dynamic(() => import("../BarGraph/BarGraph"), {
  ssr: false,
});

const AudienceByCity = ({ influencer, isAdvance }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer.audienceByCity) {
      const categories = influencer?.audienceByCity?.map((item) => item?.City);
      const data = influencer?.audienceByCity?.map((item) => item?.Followers);
      setCategories(categories);
      setData(data);
    }
  }, [influencer.audienceByCity]);

  useEffect(() => {
    if (categories && data) {
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
        colors: ["#FF3913"],
      });
      setSeries([{ data: data, name: "Value" }]);
    }
  }, [categories, data]);
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={city} alt="" />
        <p className="text_small bold">Audience By City</p>
      </div>
      <div className={isAdvance ? "" : styles.container_2}>
        {options && series ? (
          <BarGraph options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AudienceByCity;
