import React, { useEffect, useState } from "react";
import styles from "./AudienceRaces.module.css";
import dynamic from "next/dynamic";

const BarGraph = dynamic(() => import("@/components/BarGraph/BarGraph"));

const AudienceRaces = ({ influencer }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer?.audience_races) {
      const categories = Object.keys(influencer?.audience_races);
      const data = Object.values(influencer?.audience_races);
      setCategories(categories);
      setData(data);
    }
  }, [influencer?.audience_races]);

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

  return influencer?.audience_races ? (
    <div className={styles.container}>
      <div className={styles.container_1}>
        {/* <Image src={internet} alt="" /> */}
        <p className="text_medium">Audience Races</p>
      </div>
      <div>
        <BarGraph options={options} series={series} height={300} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default AudienceRaces;
