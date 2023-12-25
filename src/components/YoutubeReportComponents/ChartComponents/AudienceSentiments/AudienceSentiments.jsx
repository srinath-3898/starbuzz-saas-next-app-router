import DonutChart from "@/components/DonutChart/DonutChart";
import React, { useEffect, useState } from "react";

const AudienceSentiments = ({ influencer }) => {
  const [labels, setLabels] = useState([]);
  const [donuctChartData, setDonutChartData] = useState([]);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (influencer?.audience_sentiments) {
      const labels = Object.keys(influencer?.audience_sentiments?.sentiments);
      const donuctChartData = labels.map(
        (label) => influencer?.audience_sentiments?.sentiments[label]?.prc
      );
      setLabels(labels);
      setDonutChartData(donuctChartData);
    }
  }, [influencer?.audience_sentiments]);

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
    influencer?.audience_sentiments && (
      <>
        <p className="text_medium bold">Audience sentiments</p>
        <DonutChart series={series} options={options} height={250} />
      </>
    )
  );
};

export default AudienceSentiments;
