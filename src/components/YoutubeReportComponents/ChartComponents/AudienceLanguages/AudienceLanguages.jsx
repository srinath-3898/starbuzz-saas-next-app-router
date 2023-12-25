import React, { useEffect, useState } from "react";
import styles from "./AudienceLanguages.module.css";
import dynamic from "next/dynamic";

const BarGraph = dynamic(() => import("@/components/BarGraph/BarGraph"));

const AudienceLanguages = ({ influencer }) => {
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (
      influencer?.audience_languages &&
      influencer?.audience_languages?.length > 0
    ) {
      const categories = influencer?.audience_languages?.map(
        (item) => item?.title
      );
      const data = influencer?.audience_languages?.map((item) => item?.prc);
      setCategories(categories);
      setData(data);
    }
  }, [influencer?.audience_languages]);

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

  return (
    influencer?.audience_languages?.length > 0 && (
      <div className={styles.container}>
        <p className="text_medium bold">Audience Languages</p>
        <BarGraph series={series} options={options} height={350} />
      </div>
    )
  );
};

export default AudienceLanguages;
