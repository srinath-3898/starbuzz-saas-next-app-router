"use client";
import React from "react";
import styles from "./SubscriptionPlan.module.css";
import { useSelector } from "react-redux";
import Tick from "../../../assets/svgs/Tick.svg";
import Image from "next/image";

const SubscriptionPlan = ({ plan, handleChoosePlan, handleAddons }) => {
  const { subscription } = useSelector((state) => state.auth);

  return (
    <div
      className={`${styles.container} ${
        plan?.name === subscription?.plan?.name ? styles.active : ""
      }`}
    >
      <div className={styles.container_1}>
        <p className="text_large bold center">
          {plan?.name[0]?.toUpperCase() + plan?.name.slice(1)}
        </p>
        {plan?.discount ? (
          <div className={styles.actual_amount}>
            <p className="text_medium bold center">
              <del>&#x20B9; {plan?.amount} </del>
            </p>
            {plan?.discount ? (
              <p className="text_medium bold">
                {plan?.discount?.isPercentage
                  ? plan?.discount?.amount + "% Discount"
                  : "Rupees"}
              </p>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        <p className="text_extra_large bold center">
          &#x20B9; {plan?.discountedPrice}
          <span>{plan?.name === "lite" ? "(Ex.Tax)" : ""}</span>
          {subscription?.planId === plan?.id ? <span> (Active) </span> : <></>}
        </p>
      </div>

      <div>
        {plan?.description?.map((feature) => (
          <div key={feature} className={styles.feature}>
            <Image src={Tick} width={20} height={20} alt="" />
            <p className="text_small">{feature}</p>
          </div>
        ))}
      </div>
      <button
        className={`btn_small ${styles.choose_plan}`}
        onClick={() => {
          subscription?.planId === plan?.id
            ? handleAddons()
            : handleChoosePlan({
                planId: plan?.id,
                priceId: plan?.priceId,
                discountId: plan?.discount?.id ? plan?.discount?.id : null,
              });
        }}
      >
        {subscription?.planId === plan?.id ? "Addons " : "Choose Plan"}
      </button>
    </div>
  );
};

export default SubscriptionPlan;
