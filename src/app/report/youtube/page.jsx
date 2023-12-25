"use client";
import React, { useEffect, useState } from "react";
import styles from "./youtube.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getYoutubeReport } from "@/store/report/reportActions";
import PartOne from "@/components/YoutubeReportComponents/PartOne/PartOne";
import PartTwo from "@/components/YoutubeReportComponents/PartTwo/PartTwo";
import PartThree from "@/components/YoutubeReportComponents/PartThree/PartThree";
import PartFour from "@/components/YoutubeReportComponents/PartFour/PartFour";
import PartFive from "@/components/YoutubeReportComponents/PartFive/PartFive";
import AudienceLanguages from "@/components/YoutubeReportComponents/ChartComponents/AudienceLanguages/AudienceLanguages";
import AudienceByAge from "@/components/YoutubeReportComponents/ChartComponents/AudienceByAge/AudienceByAge";
import AudienceSentiments from "@/components/YoutubeReportComponents/ChartComponents/AudienceSentiments/AudienceSentiments";
import PartSix from "@/components/YoutubeReportComponents/PartSix/PartSix";
import PushToSubscriptionModal from "@/components/Modals/PushToSubscriptionModal/PushToSubscriptionModal";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";

const page = () => {
  const username = useSearchParams().get("username");
  const dispatch = useDispatch();
  const {
    loading: authLoading,
    subscription,
    error: authError,
  } = useSelector((state) => state.auth);
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    youtubeReportLoading,
    youtubeReport,
    youtubeReportError,
    youtubeReportErrorCode,
    reportMessage,
  } = useSelector((state) => state.report);
  const [youtubeInfluencer, setYoutubeInfluencer] = useState([]);
  const [pushToSubscriptionModalOpen, setPushToSubscriptionModalOpen] =
    useState(false);

  const convertToKorM = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  useEffect(() => {
    dispatch(getYoutubeReport({ brandId, username }));
  }, []);

  useEffect(() => {
    if (youtubeReport) {
      setYoutubeInfluencer({
        username: youtubeReport?.basic?.username || "NA",
        title: youtubeReport?.basic.title || "NA",
        profilePic: youtubeReport?.basic?.avatar_url || "NA",
        description: youtubeReport?.basic?.description || "NA",
        category_name: youtubeReport?.basic?.category_name || "NA",
        is_verified: youtubeReport?.basic?.is_verified || false,
        subscribers_count: youtubeReport?.metrics?.subscribers_count
          ? convertToKorM(youtubeReport?.metrics?.subscribers_count?.value)
          : "NA",
        subscribers_growth_prc_30d: youtubeReport?.metrics
          ?.subscribers_growth_prc?.performance["30d"]
          ? youtubeReport?.metrics?.subscribers_growth_prc?.performance["30d"]
          : "NA",
        videos_per_week: youtubeReport?.metrics?.videos_per_week?.performance[
          "all"
        ]
          ? convertToKorM(
              youtubeReport?.metrics?.videos_per_week?.performance["all"]?.value
            )
          : "NA",
        views_avg: youtubeReport?.metrics?.views_avg?.performance["all"]
          ? convertToKorM(
              youtubeReport?.metrics?.views_avg?.performance["all"]?.value
            )
          : "NA",
        likes_count: youtubeReport?.metrics?.likes_count?.performance["all"]
          ? convertToKorM(
              youtubeReport?.metrics?.likes_count?.performance["all"]?.value
            )
          : "NA",
        comments_count: youtubeReport.metrics.comments_count.performance["all"]
          ? convertToKorM(
              youtubeReport?.metrics?.comments_count?.performance["all"]?.value
            )
          : "NA",
        engagement_avg: convertToKorM(
          (youtubeReport?.metrics?.likes_count?.performance["all"]
            ? youtubeReport?.metrics.likes_count?.performance["all"]?.value
            : 0 + youtubeReport?.metrics?.comments_count?.performance["all"]
            ? youtubeReport?.metrics?.comments_count?.performance["all"]?.value
            : 0) / 2
        ),
        er: youtubeReport?.metrics?.er?.performance["all"]
          ? youtubeReport?.metrics?.er?.performance["all"]
          : {},
        cqs: youtubeReport?.features.cqs
          ? youtubeReport?.features.cqs.data
          : {},
        rankings: youtubeReport?.features?.blogger_rankings
          ? youtubeReport?.features?.blogger_rankings?.data
          : "NA",
        audience_geo: youtubeReport?.features?.audience_geo
          ? youtubeReport?.features?.audience_geo?.data
          : [],
        audience_languages: youtubeReport?.features.audience_languages
          ? youtubeReport?.features.audience_languages?.data
          : [],
        audience_age_gender: youtubeReport?.features?.audience_age_gender
          ? youtubeReport?.features?.audience_age_gender?.data
          : {},
        audience_races: youtubeReport?.features?.audience_races
          ? youtubeReport?.features?.audience_races?.data
          : {},
        video_integration_price: youtubeReport?.video_integration_price
          ? youtubeReport?.video_integration_price?.data
          : {},
        blogger_emv: youtubeReport?.features?.blogger_emv
          ? youtubeReport?.features.blogger_emv?.data
          : {},
        blogger_emails: youtubeReport?.features?.blogger_emails
          ? youtubeReport?.features?.blogger_emails?.data
          : [],
        blogger_languages: youtubeReport?.features?.blogger_languages
          ? youtubeReport?.features?.blogger_languages?.data
          : [],
        brand_safety: youtubeReport?.features?.brand_safety
          ? youtubeReport?.features?.brand_safety?.data
          : {},
        audience_sentiments: youtubeReport?.features?.audience_sentiments
          ? youtubeReport?.features?.audience_sentiments?.data
          : {},
        blogger_views_likes_chart: youtubeReport?.features
          .blogger_views_likes_chart
          ? youtubeReport?.features?.blogger_views_likes_chart?.data
          : [],
      });
    }
  }, [youtubeReport]);
  return subscription ? (
    <>
      {youtubeReportLoading && !youtubeReport && !youtubeReportError ? (
        <Loader size={50} />
      ) : (
        <></>
      )}
      {!youtubeReportLoading && !youtubeReport && youtubeReportError ? (
        <Error
          message={youtubeReportError}
          errorCode={youtubeReportErrorCode}
        />
      ) : (
        <></>
      )}
      {!youtubeReportLoading && youtubeReport && !youtubeReportError ? (
        <div className={styles.container}>
          <>
            <PartOne influencer={youtubeInfluencer} />
            <PartTwo influencer={youtubeInfluencer} />
            <PartThree influencer={youtubeInfluencer} />
            <PartFour influencer={youtubeInfluencer} />
            <PartFive influencer={youtubeInfluencer} />
            <AudienceLanguages influencer={youtubeInfluencer} />
            <AudienceByAge influencer={youtubeInfluencer} />
            <AudienceSentiments influencer={youtubeInfluencer} />
            <PartSix influencer={youtubeInfluencer} />

            {/* push to subscription modal */}
            <PushToSubscriptionModal
              open={pushToSubscriptionModalOpen}
              message={reportMessage}
              handleSubscribe={() => {
                setPushToSubscriptionModalOpen(false);
                router.push("/subscription");
              }}
            />
          </>
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <>
      {authLoading ? <Loader size={50} /> : <></>}
      {authError ? <Error message={authError} errorCode={authError} /> : <></>}
    </>
  );
};

export default page;
