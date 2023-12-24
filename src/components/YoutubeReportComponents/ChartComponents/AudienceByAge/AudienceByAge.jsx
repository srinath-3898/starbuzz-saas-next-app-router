import BarGraph from "@/components/BarGraph/BarGraph";
import React, { useEffect, useState } from "react";

const AudienceByAge = ({ influencer }) => {
  const [categories, setCategories] = useState(null);
  const [maleData, setMaleData] = useState(null);
  const [femaleData, setFemaleData] = useState(null);
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (influencer?.audience_age_gender) {
      const categories = Object.keys(influencer?.audience_age_gender);
      const maleData = categories?.map(
        (category) => influencer?.audience_age_gender[category]?.male
      );
      const femaleData = categories?.map(
        (category) => influencer?.audience_age_gender[category]?.female
      );
      setCategories(categories);
      setMaleData(maleData);
      setFemaleData(femaleData);
    }
  }, [influencer?.audience_age_gender]);

  useEffect(() => {
    if ((categories, maleData, femaleData)) {
      setOptions({
        chart: {
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            horizontal: false,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
        },
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories,
          title: {
            text: "Age",
          },
        },
        yaxis: {
          title: {
            text: "Percentage (%)",
          },
        },
        colors: ["#FF5900", "#ffac80"],
      });
      setSeries([
        {
          name: "Male",
          data: maleData,
        },
        {
          name: "Female",
          data: femaleData,
        },
      ]);
    }
  }, [categories, maleData, femaleData]);

  return (
    influencer?.audience_age_gender && (
      <>
        <p className="text_medium bold">Audience By Age</p>
        <BarGraph options={options} series={series} />
      </>
    )
  );
};

export default AudienceByAge;
