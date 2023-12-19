"use client";
import styles from "./GendersByAgeGroup.module.css";
import user from "../../assets/svgs/user.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const StackedColoumnGraph = dynamic(
  () => import("../StackedColoumnGraph/StackedColoumnGraph"),
  { ssr: false }
);

const GendersByAgeGroup = ({ influencer, isAdvance }) => {
  const [categories, setCategories] = useState(null);
  const [maleData, setMaleData] = useState(null);
  const [femaleData, setFemaleData] = useState(null);
  const [options, setOptions] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    if (influencer?.gendersByAgeGroup) {
      const categories = [];
      const maleData = [];
      const femaleData = [];
      for (let i = 0; i < influencer?.gendersByAgeGroup?.length; i++) {
        if (i % 2 === 0) {
          categories.push(influencer?.gendersByAgeGroup[i].label);
        }
        if (influencer?.gendersByAgeGroup[i].type === "Male") {
          maleData.push(influencer?.gendersByAgeGroup[i]?.value);
        } else {
          femaleData.push(influencer?.gendersByAgeGroup[i].value);
        }
      }
      setCategories(categories);
      setMaleData(maleData);
      setFemaleData(femaleData);
    }
  }, [influencer?.gendersByAgeGroup]);
  useEffect(() => {
    if (categories && maleData && femaleData) {
      setOptions({
        chart: {
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },

        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                formatter: function (val) {
                  return val + "%";
                },
                style: {
                  fontSize: "12px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          categories: categories,
        },
        legend: {
          position: "right",
          offsetY: 100,
        },
        fill: {
          opacity: 1,
        },
        colors: ["#FF9000", "#337199"],
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
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={user} alt="" />
        <p className="text_medium bold">Genders By Age Group</p>
      </div>
      <div style={{ filter: isAdvance ? "none" : "blur(5px)" }}>
        {options && series ? (
          <StackedColoumnGraph options={options} series={series} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default GendersByAgeGroup;
