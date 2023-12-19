"use client";
import { Select, Skeleton, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./YoutubeFilters.module.css";
import { CloseCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { getYoutubeNiches } from "@/store/taxanomy/taxanomyActions";
import Link from "next/link";
import Error from "../Error/Error";
import TwoWaySlider from "../TwoWaySlider/TwoWaySlider";
import SingleSelect from "../SingleSelect/SingleSelect";
import Loader from "../Loader/Loader";

const YoutubeFilters = ({
  bodyData,
  setBodyData,
  errors,
  setErrors,
  handleSearch,
}) => {
  const { subscription } = useSelector((state) => state.auth);
  const {
    youtubeNichesLoading,
    youtubeNiches,
    youtubeNichesError,
    youtubeNichesErroCode,
  } = useSelector((state) => state.taxanomy);
  const { getFreemiumYoutubeInfluencersLoading, youtubeInfluencersLoading } =
    useSelector((state) => state.discovery);
  const dispatch = useDispatch();

  const sortOptions = [
    { value: "subscribers_count", label: "Subscribers Count" },
  ];

  const followersRanges = [
    {
      value: JSON.stringify({ from: 1000, to: 10000 }),
      label: "Nano (1K - 10K)",
    },
    {
      value: JSON.stringify({ from: 10000, to: 50000 }),
      label: "Micro (10K - 50K)",
    },
    {
      value: JSON.stringify({ from: 50000, to: 500000 }),
      label: "Mid (50K - 500K)",
    },
    {
      value: JSON.stringify({ from: 500000, to: 1000000 }),
      label: "Macro (500K - 1M)",
    },
    {
      value: JSON.stringify({ from: 1000000, to: 100000000 }),
      label: "Mega (1M - 10M)",
    },
  ];

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "", label: "Any" },
  ];

  const audienceAges = [
    { value: "13_17", label: "13 - 17" },
    { value: "18_24", label: "18 - 24" },
    { value: "25_34", label: "25 - 34" },
    { value: "35_44", label: "35 - 44" },
    { value: "45_54", label: "45 - 54" },
    { value: "55_64", label: "55 - 64" },
    { value: "65", label: "65+" },
  ];

  const SkeletonInputs = Array.from({ length: 12 }, (_, index) => (
    <Skeleton.Input key={index} active={true} style={{ width: "100%" }} />
  ));

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const onBlur = () => {
    setInfluencerCities([]);
    setAudienceCities([]);
  };

  useEffect(() => {
    if (subscription) {
      dispatch(getYoutubeNiches());
    }
  }, [subscription]);

  return subscription ? (
    <div className={styles.container}>
      <p className="text_small bold text_secondary">Search Filters</p>
      {youtubeNichesError ? (
        <div className={styles.filters_error}>
          <Error
            message={youtubeNichesError}
            errorCode={youtubeNichesErroCode}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.filters}>
        {youtubeNichesLoading ? <>{SkeletonInputs}</> : <></>}
        {youtubeNiches ? (
          <>
            {/* niche filter */}

            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className="text_small">Niches</p>
                <Tooltip title={"Category of the influencer"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Select
                mode="multiple"
                allowClear
                placeholder="Please select your niches"
                options={youtubeNiches?.map((item) => ({
                  label: item.title,
                  value: item.niche_id,
                }))}
                value={bodyData?.thematics?.include}
                onChange={(value) => {
                  if (youtubeNichesError) {
                    dispatch(resetDiscoverInfluencersData());
                  }
                  setBodyData((prevState) => ({
                    ...prevState,
                    thematics: {
                      include: value,
                    },
                  }));
                }}
              />
              {errors.niches ? (
                <div className="validation_error">
                  <p className="text_small">{errors.niches}</p>
                  <CloseCircleFilled
                    style={{ fontSize: "14px", color: "red" }}
                    onClick={() => handleCloseError("niches")}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>

            {/* influnecer Age slider */}

            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>
                  Influencer Age ({bodyData?.account_age?.from}-
                  {bodyData?.account_age?.to})
                </p>
                <Tooltip title={"Age groups of the audience of the influencer"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <TwoWaySlider
                  disabled={subscription?.plan?.name === "free"}
                  value={[
                    bodyData?.account_age?.from,
                    bodyData?.account_age?.to,
                  ]}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      account_age: { from: value[0], to: value[1] },
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* audience gender select */}

            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Audience Gender</p>
                <Tooltip title={" Audience Gender"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please select gender"
                  options={genders}
                  value={bodyData?.audience_gender?.gender}
                  disabled={subscription?.plan?.name === "free"}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      audience_gender: { gender: value },
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* Audience age group select */}

            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Audience Age groups</p>
                <Tooltip title={"Age groups of the audience of the influencer"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <Select
                  mode="multiple"
                  placeholder="Audience Age groups"
                  allowClear
                  options={audienceAges?.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  value={bodyData?.audience_age?.groups}
                  disabled={subscription?.plan?.name === "free"}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      audience_age: { groups: value, prc: 50 },
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* Subscribers Range */}

            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Subscribers Range</p>
                <Tooltip title={"The Subscribers range of the influencer "}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <SingleSelect
                  options={followersRanges}
                  placeHolder={"Subscribers Range"}
                  selectedOption={bodyData?.subscribers_count}
                  optionLabel={"label"}
                  optionValue={"value"}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      subscribers_count: value,
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* Post Price Slider */}

            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>
                  Post Price ({bodyData?.blogger_prices?.post_price?.from} -{" "}
                  {bodyData?.blogger_prices?.post_price?.to})
                </p>
                <Tooltip title={"The price of the post"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <TwoWaySlider
                  disabled={subscription?.plan?.name === "free"}
                  value={[
                    bodyData?.blogger_prices?.post_price?.from,
                    bodyData?.blogger_prices?.post_price?.to,
                  ]}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      blogger_prices: {
                        post_price: { from: value[0], to: value[1] },
                      },
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* Sort by select */}

            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className={`text_small`}>Sort by</p>
                <Tooltip title={``}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <Select
                  placeholder="Sort by"
                  options={sortOptions}
                  value={bodyData?.sort?.field}
                  disabled={subscription?.plan?.name === "free"}
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      sort: { ...prevState?.sort, field: value },
                    }));
                  }}
                />
              </Tooltip>
            </div>

            {/* Sort Order Radio Button */}

            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className={`text_small`}>Sort Order</p>
              </div>
              <Tooltip
                title={
                  subscription?.plan?.name === "free" ? (
                    <span>
                      Please{" "}
                      <Link href="/subscription" style={{ color: "#fe5900" }}>
                        Upgrade
                      </Link>{" "}
                      your plan to unlock this filter.
                    </span>
                  ) : (
                    ""
                  )
                }
              >
                <div className={styles.sort_order}>
                  <div className={styles.radio}>
                    <input
                      id="asc"
                      type="radio"
                      checked={bodyData?.sort?.order === "asc"}
                      onChange={() =>
                        setBodyData((prevState) => ({
                          ...prevState,
                          sort: { ...prevState?.sort, order: "asc" },
                        }))
                      }
                      disabled={subscription?.plan?.name === "free"}
                    />
                    <label htmlFor="asc" className="text_small">
                      Ascending
                    </label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      id="desc"
                      type="radio"
                      checked={bodyData?.sort?.order === "desc"}
                      onChange={() =>
                        setBodyData((prevState) => ({
                          ...prevState,
                          sort: { ...prevState?.sort, order: "desc" },
                        }))
                      }
                      disabled={subscription?.plan?.name === "free"}
                    />
                    <label htmlFor="desc" className="text_small">
                      Descending{" "}
                    </label>
                  </div>
                </div>
              </Tooltip>
            </div>

            {/* Search Button */}

            <div className={styles.search_button}>
              <button
                className="btn_small btn_primary"
                onClick={() => handleSearch(1)}
                disabled={
                  youtubeNichesLoading ||
                  getFreemiumYoutubeInfluencersLoading ||
                  youtubeInfluencersLoading
                }
              >
                {youtubeNichesLoading ||
                getFreemiumYoutubeInfluencersLoading ||
                youtubeInfluencersLoading ? (
                  <Loader size={13} color="#ffffff" />
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default YoutubeFilters;
