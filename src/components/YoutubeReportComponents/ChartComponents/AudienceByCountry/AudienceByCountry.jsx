import React, { useEffect, useState } from "react";
import internet from "./../../../../assets/svgs/internet.svg";
import Image from "next/image";
import styles from "./AudienceByCountry.module.css";
import BarGraph from "@/components/BarGraph/BarGraph";

const AudienceByCountry = ({ influencer }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer?.audience_geo) {
      const categories = influencer?.audience_geo?.map((item) => item?.title);
      const data = influencer?.audience_geo?.map((item) => item?.prc);
      setCategories(categories);
      setData(data);
    }
  }, [influencer?.audience_geo]);

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
          title: {
            text: "Percentage (%)",
          },
        },
        colors: ["#FF5900"],
      });
      setSeries([{ data: data, name: "Value" }]);
    }
  }, [categories, data]);

  console.log(series);

  return influencer?.audience_geo?.length > 0 ? (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={internet} alt="" />
        <p className="text_medium">Audience by Country</p>
      </div>
      <div>
        <BarGraph options={options} series={series} height={300} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AudienceByCountry;
