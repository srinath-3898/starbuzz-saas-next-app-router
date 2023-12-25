import React, { useEffect, useState } from "react";
import styles from "./PartSix.module.css";

const PartSix = ({ influencer }) => {
  const [items, setItems] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (influencer?.brand_safety?.items) {
      const items = Object.keys(influencer?.brand_safety?.items);
      const values = items.map(
        (item) => influencer?.brand_safety?.items[item]?.value
      );

      setItems((prevItems) => [...prevItems, ...items]);
      setValues((prevValues) => [...prevValues, ...values]);
    }
  }, [influencer?.brand_safety?.items]);
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <p className="text_medium bold">Brand Safety Analysis</p>
        <p className="text_medium">
          {influencer?.brand_safety?.mark
            ? influencer?.brand_safety?.mark
            : "NA"}
        </p>
      </div>
      <div className={styles.container_2}>
        <p className="text_medium">Negative content background check:</p>
        {influencer?.brand_safety?.items ? (
          <ul className={styles.container_3}>
            {items?.map((item, index) => (
              <li
                className={`${
                  values[index] ? styles.negative : styles.positive
                }   text_medium`}
                key={index}
              >
                {item[0]?.toUpperCase() + item?.slice(1)}{" "}
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PartSix;
