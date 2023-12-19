"use client";
import { getPlans } from "@/store/subscription/subscriptionActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SubscriptionPlans.module.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import BillingAddressModal from "../Modals/BillingAddressModal/BillingAddressModal";
import { Badge } from "antd";
import {
  resetAddBillingAddressData,
  resetGenerateCheckoutURLData,
} from "@/store/payment/paymentSlice";
import { getUserDetails } from "@/store/auth/authActions";
import { getAddOns } from "@/store/addOns/addOnsActions";
import SubscriptionPlan from "./SubscriptionPlan/SubscriptionPlan";
import AddonsModal from "../Modals/AddonsModal/AddonsModal";

const SubscriptionPlans = () => {
  const dispatch = useDispatch();

  const { subscription } = useSelector((state) => state.auth);
  const { loading, plans, error, errorCode } = useSelector(
    (state) => state.subscription
  );

  const [isAnually, setIsAnually] = useState(false);
  const [monthlyActivePlan, setMonthlyActivePlan] = useState(null);
  const [yearlyActivePlan, setYearlyActivePlan] = useState(null);
  const [monthlyPlans, setMonthlyPlans] = useState([]);
  const [yearlyPlans, setYearlyPlans] = useState([]);
  const [billingAddressModalOpen, setBillingAddressModalOpen] = useState(false);
  const [selectedPlanData, setSelectedPlanData] = useState({});
  const [addonModalOpen, setAddonModalOpen] = useState(false);

  const handleChoosePlan = ({ planId, priceId, discountId }) => {
    dispatch(resetAddBillingAddressData());
    dispatch(resetGenerateCheckoutURLData());
    const selectedPlanData = {
      chargebeesubscriptionId: subscription?.chargebeeSubscriptionId,
      priceId: priceId,
      planId: planId,
      discountId: discountId,
    };
    for (let key in selectedPlanData) {
      if (
        selectedPlanData.hasOwnProperty(key) &&
        selectedPlanData[key] === null
      ) {
        delete selectedPlanData[key];
      }
    }

    setSelectedPlanData(selectedPlanData);
    setBillingAddressModalOpen(true);
  };

  const handleAddons = () => {
    setAddonModalOpen(true);
    dispatch(getAddOns());
  };

  useEffect(() => {
    dispatch(getUserDetails()).then(() => {
      dispatch(getPlans());
    });
  }, []);

  useEffect(() => {
    if (plans) {
      const monthlyPlans = plans.map((plan) => {
        const monthlyPriceIndex = plan?.prices?.findIndex(
          (price) => price?.duration === 30
        );
        if (monthlyPriceIndex !== -1) {
          const {
            id: priceId,
            amount,
            description,
            duration,
            discountedPrice,
            discount,
            features,
          } = plan.prices[monthlyPriceIndex];
          return {
            id: plan?.id,
            name: plan?.name,
            description: plan?.description,
            priceId,
            amount,
            description,
            duration,
            discountedPrice,
            discount,
            features,
          };
        }
        return null;
      });

      setMonthlyPlans(
        monthlyPlans.filter(
          (monthlyPlan) => monthlyPlan !== null && monthlyPlan !== undefined
        )
      );

      const yearlyPlans = plans.map((plan) => {
        const yearlyPriceIndex = plan?.prices?.findIndex(
          (price) => price?.duration === 365
        );
        if (yearlyPriceIndex !== -1) {
          const {
            id: priceId,
            amount,
            duration,
            discountedPrice,
            discount,
            features,
            description,
          } = plan?.prices[yearlyPriceIndex];
          return {
            id: plan?.id,
            name: plan?.name,
            description: plan?.description,
            priceId,
            amount,
            duration,
            discountedPrice,
            discount,
            features,
            description,
          };
        }
        return null;
      });
      setYearlyPlans(
        yearlyPlans?.filter(
          (yearlyPlan) => yearlyPlan !== null && yearlyPlan !== undefined
        )
      );
    }
  }, [plans, subscription]);

  useEffect(() => {
    if (monthlyPlans && yearlyPlans) {
      if (subscription?.price?.duration === 30) {
        setMonthlyActivePlan(
          monthlyPlans?.find(
            (monthlyPlan) => monthlyPlan.name === subscription?.plan?.name
          )
        );
      } else {
        setYearlyActivePlan(
          yearlyPlans?.find(
            (yearlyPlan) => yearlyPlan?.name === subscription?.plan?.name
          )
        );
      }
    } else {
      return;
    }
  }, [monthlyPlans, yearlyPlans, subscription]);

  return (
    <>
      <div className={styles.container}>
        {loading && !plans && !error ? <Loader size={50} /> : <></>}
        {!loading && !plans && error ? (
          <Error message={error} errorCode={errorCode} />
        ) : (
          <></>
        )}
        {!loading && plans && !error ? (
          <>
            <div className={styles.container_1}>
              <p>Choose your plan</p>
              <p className="text_small  center">
                Choose the right plan for your business
              </p>
            </div>
            <div className={styles.container_2}>
              <div
                className={isAnually ? "" : styles.active}
                onClick={() => setIsAnually(false)}
              >
                <p className="text_medium bold">Monthly</p>
              </div>
              <div
                className={isAnually ? styles.active : ""}
                onClick={() => setIsAnually(true)}
              >
                <p className="text_medium bold">Yearly</p>
              </div>
            </div>
            <div className={styles.container_3}>
              {isAnually ? (
                <>
                  {yearlyActivePlan ? (
                    <SubscriptionPlan
                      plan={yearlyActivePlan}
                      handleChoosePlan={handleChoosePlan}
                      handleAddons={handleAddons}
                    />
                  ) : (
                    <></>
                  )}
                  {yearlyPlans?.map((plan) =>
                    plan?.name !== subscription?.plan?.name ? (
                      plan?.name === "standard" ? (
                        <Badge.Ribbon key={plan?.id} text={"Recommended"}>
                          <SubscriptionPlan
                            plan={plan}
                            handleChoosePlan={handleChoosePlan}
                            handleAddons={handleAddons}
                          />
                        </Badge.Ribbon>
                      ) : (
                        <SubscriptionPlan
                          key={plan?.id}
                          plan={plan}
                          handleChoosePlan={handleChoosePlan}
                          handleAddons={handleAddons}
                        />
                      )
                    ) : null
                  )}
                </>
              ) : (
                <>
                  {monthlyActivePlan ? (
                    <SubscriptionPlan
                      plan={monthlyActivePlan}
                      handleChoosePlan={handleChoosePlan}
                      handleAddons={handleAddons}
                    />
                  ) : (
                    <></>
                  )}
                  {monthlyPlans?.map((plan) =>
                    plan?.name !== subscription?.plan?.name ? (
                      plan?.name === "standard" ? (
                        <Badge.Ribbon key={plan?.id} text={"Recommended"}>
                          <SubscriptionPlan
                            plan={plan}
                            handleChoosePlan={handleChoosePlan}
                            handleAddons={handleAddons}
                          />
                        </Badge.Ribbon>
                      ) : (
                        <SubscriptionPlan
                          key={plan?.id}
                          plan={plan}
                          handleChoosePlan={handleChoosePlan}
                          handleAddons={handleAddons}
                        />
                      )
                    ) : null
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <BillingAddressModal
        open={billingAddressModalOpen}
        setOpen={setBillingAddressModalOpen}
        selectedPlanData={
          Object.keys(selectedPlanData).length > 0 ? selectedPlanData : null
        }
        setSelectedPlanData={setSelectedPlanData}
      />
      <AddonsModal open={addonModalOpen} setOpen={setAddonModalOpen} />
    </>
  );
};

export default SubscriptionPlans;
