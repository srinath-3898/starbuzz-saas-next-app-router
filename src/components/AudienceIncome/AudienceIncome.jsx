import { useEffect, useState } from "react";
import styles from "./AudienceIncome.module.css";
import dynamic from "next/dynamic";
const DonutChart = dynamic(() => import("../DonutChart/DonutChart"), {
  ssr: false,
});

const AudienceIncome = ({ influencer, isAdvance }) => {
  const [labels, setLabels] = useState([]);
  const [donuctChartData, setDonutChartData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer?.audienceIncome) {
      const labels = Object.keys(influencer?.audienceIncome);
      const donuctChartData = Object.values(influencer?.audienceIncome);
      setLabels(labels);
      setDonutChartData(donuctChartData);
    }
  }, [influencer?.audienceIncome]);

  useEffect(() => {
    if (donuctChartData && labels) {
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
  }, [donuctChartData, labels]);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <p className="text_small bold" style={{ marginBottom: "30px" }}>
          Audience Income
        </p>
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

export default AudienceIncome;
