"use client";
import styles from "./Report.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { resetReportData } from "@/store/report/reportSlice";
import {
  checkReportGenerated,
  getFreemiumReport,
  getReport,
} from "@/store/report/reportActions";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import CircularProgessBar from "@/components/CircularProgressBar/CircularProgessBar";
import Scores1 from "@/components/Scores1/Scores1";
import Scores2 from "@/components/Scores2/Scores2";
import FollowersTrendByMonth from "@/components/FollowersTrendByMonth/FollowersTrendByMonth";
import GendersByAgeGroup from "@/components/GendersByAgeGroup/GendersByAgeGroup";
import AudienceInterests from "@/components/AudienceInterests/AudienceInterests";
import AudienceGenderSplit from "@/components/AudienceGenderSplit/AudienceGenderSplit";
import PushToSubscriptionModal from "@/components/Modals/PushToSubscriptionModal/PushToSubscriptionModal";
import AudienceByCountry from "@/components/AudienceByCountry/AudienceByCountry";
import AudienceByCity from "@/components/AudienceByCity/AudienceByCity";
import AudienceIncome from "@/components/AudienceIncome/AudienceIncome";

const Report = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const profilePic = useSearchParams().getAll("profilePic");
  const name = useSearchParams().getAll("name");
  const username = useSearchParams().getAll("username");
  const followers = useSearchParams().getAll("followers");
  const realFollowers = useSearchParams().getAll("realFollowers");
  const er = useSearchParams().getAll("er");
  const sbScore = useSearchParams().getAll("sbScore");

  const {
    loading: authLoading,
    subscription,
    error: authError,
  } = useSelector((state) => state.auth);
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading,
    report,
    isReportGenerated,
    hasEnoughCredits,
    reportMessage,
    error,
    errorCode,
  } = useSelector((state) => state.report);

  const [influencer, setInfluencer] = useState(null);
  const [isAdvance, setIsAdvance] = useState(false);
  const [pushToSubscriptionModalOpen, setPushToSubscriptionModalOpen] =
    useState(false);

  const handleUnlock = () => {
    dispatch(resetReportData());
    dispatch(getReport({ brandId, username })).then(() => {
      setIsAdvance(true);
    });
  };

  const convertToKorM = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const covertToDate = (timeStamp) => {
    let day = new Date(timeStamp * 1000);
    return day.toDateString();
  };

  const getFollowersChart = (data) => {
    let filterdData = data.filter((item, i) => i < 100);
    filterdData = filterdData.map((item) => ({
      date: covertToDate(item.date),
      Followers: item.count,
    }));
    return filterdData.reverse();
  };

  const getGendersByAgeGroup = (data) => {
    let maleData = data[0]?.by_age_group;
    let femaleData = data[1]?.by_age_group;
    let filteredData = [];
    for (var i = 0; i < maleData?.length; i++) {
      let m = {
        label: maleData[i]?.group.slice(3),
        type: "Male",
        value: maleData[i]?.value,
      };

      let f = {
        label: femaleData[i]?.group.slice(3),
        type: "Female",
        value: femaleData[i]?.value,
      };
      filteredData.push(m);
      filteredData.push(f);
    }
    return filteredData;
  };

  const getAudienceByCity = (data) => {
    let filteredData = data?.map((item) => ({
      City: item?.name,
      Followers: item?.value,
    }));
    return filteredData;
  };

  const getAudienceByCountry = (data) => {
    let filteredData = data?.map((item) => ({
      Country: item?.name,
      Followers: item?.value,
    }));
    return filteredData;
  };

  const getAudienceInterests = (data) => {
    data = data.filter((item, i) => i < data?.length / 2);
    let filteredData = data.map((item) => ({
      type: item[0],
      value: item[1],
    }));
    return filteredData;
  };

  const getAudienceGenderSplit = (data) => {
    let filterdData = data.map((item) => ({
      type: item.gender,
      value: item.value,
    }));
    return filterdData;
  };

  const createInfluencer = () => {
    if (report) {
      const influencer = report;
      setInfluencer({
        profilePic: influencer.photo_url,
        fullName: influencer.full_name,
        followersCount: convertToKorM(influencer.followers_count),
        location: influencer?.location,
        er: influencer?.er?.value,
        sbScore: influencer.aqs,
        paidPostPerformance: influencer?.advertising_data?.avg_ad_er,
        consistencyScore: influencer?.post_frequency,
        audienceCredibility: influencer.audience_authenticity?.value,
        avgLikes: convertToKorM(influencer.avg_likes),
        avgComments: convertToKorM(influencer.avg_comments),
        followersChart: getFollowersChart(influencer.followers_chart),
        gendersByAgeGroup: getGendersByAgeGroup(influencer.demography_by_age),
        audienceByCity: getAudienceByCity(
          influencer.audience_geography?.cities
        ),
        audienceByCountry: getAudienceByCountry(
          influencer.audience_geography?.countries
        ),
        audienceInterests: getAudienceInterests(influencer.audience_interests),
        audienceGenderSplit: getAudienceGenderSplit(influencer.demography),
        notableFollowers: influencer?.features?.report?.notable_audience?.data,
        audienceIncome: influencer?.audience_income,
        likesToCommentsRatio: influencer?.likes_comments_ratio?.title,
        audienceReachability: {
          value: influencer?.audience_reachability?.value,
          title: influencer?.audience_reachability?.title,
        },
        estimatedPostPrice: {
          from: influencer?.blogger_prices?.post_price_from,
          to: influencer?.blogger_prices?.post_price_to,
        },
        estimatedStoryPrice: {
          from: influencer?.blogger_prices?.stories_price_from,
          to: influencer?.blogger_prices?.stories_price_to,
        },
      });
    }
  };

  useEffect(() => {
    dispatch(checkReportGenerated({ brandId, username }));
  }, []);

  useEffect(() => {
    if (subscription && isReportGenerated) {
      dispatch(getReport({ brandId, username })).then(() => {
        setIsAdvance(true);
      });
    } else if (isReportGenerated == false) {
      dispatch(
        getFreemiumReport({
          brandId,
        })
      );
    }
  }, [isReportGenerated, subscription]);

  useEffect(() => {
    if (report) {
      createInfluencer();
    }
  }, [report]);

  useEffect(() => {
    if (!hasEnoughCredits) {
      setPushToSubscriptionModalOpen(true);
    } else {
      return;
    }
  }, [hasEnoughCredits]);

  return subscription ? (
    <>
      <div className={styles.container}>
        {loading && !report && !error ? <Loader size={50} /> : <></>}
        {!loading && !report && error ? (
          <Error message={error} errorCode={errorCode} />
        ) : (
          <></>
        )}
        {!loading && report && influencer && !error ? (
          <>
            {!isAdvance && isReportGenerated === false ? (
              <div className={styles.basic_report}>
                <div className={styles.profile_pic}>
                  <Image
                    src={profilePic}
                    height={200}
                    width={200}
                    alt="Profile Picture"
                  />
                </div>
                <div className={styles.basic_report_container_1}>
                  <div>
                    <p className="text_medium bold">Name</p>
                    <p className="text_small">{name ? name : username}</p>
                  </div>
                  <div>
                    <p className="text_medium bold">Username</p>
                    <p className="text_small">{username}</p>
                  </div>
                  <div>
                    <p className="text_medium bold">Followers</p>
                    <p className="text_small">
                      {subscription?.plan?.name !== "free"
                        ? convertToKorM(followers)
                        : "10 M"}
                    </p>
                  </div>
                </div>
                <div className={styles.basic_report_container_2}>
                  {subscription?.plan?.name !== "free" &&
                  realFollowers !== null &&
                  realFollowers !== undefined ? (
                    <div>
                      <p className="text_medium bold">
                        Fake followers percentage
                      </p>
                      <CircularProgessBar
                        value={((followers - realFollowers) / followers) * 100}
                        StrokeColor={"#fe5900"}
                        max={100}
                        type={"fakeFollowers"}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text_medium bold">
                        Fake followers percentage
                      </p>
                      <div style={{ filter: "blur(10px)" }}>
                        <CircularProgessBar
                          value={90}
                          StrokeColor={"#fe5900"}
                          max={100}
                          type={"fakeFollowers"}
                        />
                      </div>
                    </div>
                  )}
                  {subscription?.plan?.name !== "free" &&
                  er !== null &&
                  er !== undefined ? (
                    <div>
                      <p className="text_medium bold">Engagement rate</p>
                      <CircularProgessBar
                        type={"er"}
                        value={parseFloat(er)}
                        StrokeColor={"#fe5900"}
                        max={10}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text_medium bold">Engagement rate</p>
                      <div style={{ filter: "blur(10px)" }}>
                        <CircularProgessBar
                          value={9}
                          StrokeColor={"#fe5900"}
                          max={10}
                        />
                      </div>
                    </div>
                  )}
                  {subscription?.plan?.name !== "free" &&
                  sbScore !== null &&
                  sbScore !== undefined ? (
                    <div>
                      <p className="text_medium bold">SB Score</p>
                      <p
                        className="text_small bold"
                        style={{
                          color:
                            sbScore === "good"
                              ? "darkgreen"
                              : sbScore === "average"
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {sbScore[0].toUpperCase() + sbScore.slice(1)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text_medium bold">SB Score</p>
                      <p
                        style={{ filter: "blur(10px)" }}
                        className="text_small bold"
                      >
                        Excellent
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <Scores1 influencer={influencer} />
                <Scores2 influencer={influencer} />
              </>
            )}
            {influencer?.followersChart?.length > 0 ? (
              <FollowersTrendByMonth
                influencer={influencer}
                isAdvance={isAdvance}
              />
            ) : (
              <></>
            )}
            <div className={styles.container_1}>
              {influencer?.gendersByAgeGroup?.length > 0 ? (
                <GendersByAgeGroup
                  influencer={influencer}
                  isAdvance={isAdvance}
                />
              ) : (
                <></>
              )}
              {influencer?.audienceInterests?.length > 0 ? (
                <AudienceInterests
                  influencer={influencer}
                  isAdvance={isAdvance}
                />
              ) : (
                <></>
              )}
            </div>
            <div className={styles.container_2}>
              {influencer?.audienceGenderSplit?.length > 0 ? (
                <AudienceGenderSplit
                  influencer={influencer}
                  isAdvance={isAdvance}
                />
              ) : (
                <></>
              )}
              {influencer?.audienceByCountry?.length > 0 ? (
                <AudienceByCountry
                  influencer={influencer}
                  isAdvance={isAdvance}
                />
              ) : (
                <></>
              )}
            </div>
            <div className={styles.container_3}>
              {influencer?.audienceByCity?.length > 0 ? (
                <AudienceByCity influencer={influencer} isAdvance={isAdvance} />
              ) : (
                <></>
              )}
              {Object.keys(influencer?.audienceIncome)?.length > 0 ? (
                <AudienceIncome influencer={influencer} isAdvance={isAdvance} />
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <></>
        )}
        {!loading && report && !isAdvance ? (
          <button
            className={`btn_small btn_primary ${styles.unlock}`}
            onClick={handleUnlock}
          >
            Unlock Report
          </button>
        ) : (
          <></>
        )}
      </div>
      <PushToSubscriptionModal
        open={pushToSubscriptionModalOpen}
        message={reportMessage}
        handleSubscribe={() => {
          setPushToSubscriptionModalOpen(false);
          router.push("/subscription");
        }}
      />
    </>
  ) : (
    <>
      {authLoading ? <Loader size={50} /> : <></>}
      {authError ? <Error message={authError} errorCode={authError} /> : <></>}
    </>
  );
};

export default Report;
