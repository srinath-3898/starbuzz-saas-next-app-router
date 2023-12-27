"use client";
import { Select, Skeleton, Tooltip } from "antd";
import styles from "./InstagramFilters.module.css";
import { CloseCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInstagramNiches } from "@/store/taxanomy/taxanomyActions";
import { resetDiscoverInfluencersData } from "@/store/discovery/discoverySlice";
import axios from "axios";
import MultiSelect from "../MultiSelect/MultiSelect";
import SingleSelect from "../SingleSelect/SingleSelect";
import TwoWaySlider from "../TwoWaySlider/TwoWaySlider";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const InstagramFilters = ({
  bodyData,
  setBodyData,
  errors,
  setErrors,
  handleSearch,
}) => {
  const dispatch = useDispatch();

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

  const sortOptions = [
    { value: "subscribers_count", label: "Followers Range" },
  ];

  const { subscription } = useSelector((state) => state.auth);
  const {
    instagramNichesLoading,
    instagramNiches,
    instagramNichesErrorCode,
    instagramNichesError,
  } = useSelector((state) => state.taxanomy);
  const {
    loading: discoverInfluencersLoading,
    recentSearchLoading,

    getFreemiumInfluencersLoading,
  } = useSelector((state) => state.discovery);

  const [nichesDisabled, setNichesDisabled] = useState(false);
  const [influencerCities, setInfluencerCities] = useState(null);
  const [audienceCities, setAudienceCities] = useState(null);
  const [audienceInterestsDisabled, setAudienceInterestsDisabled] =
    useState(false);
  const [locationSearchLoading, setLocationSearchLoading] = useState(false);
  const [locationSearchValue, setLocationSearcValue] = useState(null);

  const onBlur = () => {
    setInfluencerCities([]);
    setAudienceCities([]);
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };
  const SkeletonInputs = Array.from({ length: 12 }, (_, index) => (
    <Skeleton.Input key={index} active={true} style={{ width: "100%" }} />
  ));

  useEffect(() => {
    if (subscription) {
      dispatch(getInstagramNiches());
    }
  }, [subscription]);

  useEffect(() => {
    if (bodyData?.category?.include?.length > 0) {
      setAudienceInterestsDisabled(true);
      setErrors((prevState) => ({ ...prevState, niches: "" }));
    } else if (bodyData.category.include?.length === 0) {
      setAudienceInterestsDisabled(false);
    }
    if (bodyData?.interests?.length > 0) {
      setNichesDisabled(true);
    } else if (bodyData?.interests?.length == 0) {
      setNichesDisabled(false);
    }
  }, [bodyData]);

  useEffect(() => {
    if (locationSearchValue) {
      const identifier = setTimeout(async () => {
        try {
          setLocationSearchLoading(true);
          const response = await axios.get(
            `https://secure.geonames.org/searchJSON?q=${locationSearchValue}&country=IN&username=aravindha_sb`
          );
          setInfluencerCities(response?.data?.geonames);
          setAudienceCities(response?.data?.geonames);
          setLocationSearchLoading(false);
        } catch (error) {
          console.log(error);
          setLocationSearchLoading(false);
        }
      }, 500);
      return () => {
        clearTimeout(identifier);
      };
    }
  }, [locationSearchValue]);

  return subscription ? (
    <div className={styles.container}>
      <p className="text_small bold text_secondary">Search Filters</p>
      {instagramNichesError ? (
        <div className={styles.filters_error}>
          <Error
            message={instagramNichesError}
            errorCode={instagramNichesErrorCode}
          />
        </div>
      ) : (
        <></>
      )}
      <div className={styles.filters}>
        {instagramNichesLoading ? <>{SkeletonInputs}</> : <></>}
        {instagramNiches ? (
          <>
            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className="text_small">Niches</p>
                <Tooltip title={"Category of the influencer"}>
                  <InfoCircleOutlined
                    style={{ fontSize: 16, cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              <MultiSelect
                width={"100%"}
                placeHolder={"Please select your niches"}
                options={instagramNiches}
                optionValue={"niche_id"}
                optionLabel={"title"}
                selectedOptions={bodyData?.category?.include}
                disabled={nichesDisabled}
                onChange={(value) => {
                  if (instagramNichesError) {
                    dispatch(resetDiscoverInfluencersData());
                  }
                  setBodyData((prevState) => ({
                    ...prevState,
                    category: {
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
            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className="text_small">Influencer Cities - India IN</p>
                <Tooltip title={"City/Location of the influencer"}>
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
                <div>
                  <MultiSelect
                    width={"100%"}
                    type={"influencerCities"}
                    placeHolder={"Please enter city name"}
                    options={influencerCities}
                    optionValue={"geonameId"}
                    optionLabel={"name"}
                    selectedOptions={bodyData?.account_geo?.city}
                    loading={locationSearchLoading}
                    onSearch={(value) => setLocationSearcValue(value)}
                    onBlur={onBlur}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        account_geo: { ...prevState.account_geo, city: value },
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className="text_small">Influencer Gender</p>
                <Tooltip title={"Gender of the influencer"}>
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
                <div>
                  <SingleSelect
                    width={"100%"}
                    placeHolder={"Influencer Gender"}
                    options={genders}
                    selectedOption={bodyData?.account_gender}
                    optionValue={"value"}
                    optionLabel={"label"}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        account_gender: value,
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={styles.filter}>
              <div className={styles.heading}>
                <p className={`text_small`}>
                  Influencer Age ({bodyData?.account_age?.from}-
                  {bodyData?.account_age?.to})
                </p>
                <Tooltip title={"Age of the influencer"}>
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
                <div>
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
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Audience Location - India IN</p>
                <Tooltip
                  title={
                    " City/Location of the majority of the audience of influencer"
                  }
                >
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
                <div>
                  <MultiSelect
                    width={"100%"}
                    type={"audienceCities"}
                    placeHolder={"Please enter city name"}
                    options={audienceCities}
                    optionValue={"geonameId"}
                    optionLabel={"name"}
                    selectedOptions={bodyData?.audience_geo?.cities}
                    onSearch={(value) => setLocationSearcValue(value)}
                    loading={locationSearchLoading}
                    onBlur={onBlur}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        audience_geo: { cities: value },
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
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
                <div>
                  <MultiSelect
                    width={"100%"}
                    type={"audienceAgeOptions"}
                    placeHolder={"Audience Age groups"}
                    options={audienceAges}
                    optionLabel={"label"}
                    optionValue={"value"}
                    selectedOptions={bodyData?.audience_age?.groups}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        audience_age: { groups: value, prc: 50 },
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Audience Interests</p>
                <Tooltip
                  title={" Interests of the audience of the influencer "}
                >
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
                <div>
                  <MultiSelect
                    width={"100%"}
                    type={"intrests"}
                    placeHolder={"By Audience Interests"}
                    options={instagramNiches}
                    optionValue={"niche_id"}
                    optionLabel={"title"}
                    selectedOptions={bodyData?.interests}
                    disabled={
                      audienceInterestsDisabled ||
                      subscription?.plan?.name === "free"
                    }
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        interests: value,
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Audience Gender</p>
                <Tooltip
                  title={
                    "Gender of the majority of the audience of the influencer "
                  }
                >
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
                <div>
                  <SingleSelect
                    width={"100%"}
                    placeHolder={"Audience Gender"}
                    options={genders}
                    selectedOption={bodyData?.audience_gender?.gender}
                    optionValue={"value"}
                    optionLabel={"label"}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        audience_gender: { gender: value, prc: 20 },
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
            <div className={`${styles.filter}`}>
              <div className={styles.heading}>
                <p className={`text_small `}>Followers Range</p>
                <Tooltip title={"The followers range of the influencer "}>
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
                <div>
                  <SingleSelect
                    width={"100%"}
                    placeHolder={"Followers Range"}
                    options={followersRanges}
                    optionLabel={"label"}
                    optionValue={"value"}
                    selectedOption={bodyData?.subscribers_count}
                    disabled={subscription?.plan?.name === "free"}
                    onChange={(value) => {
                      setBodyData((prevState) => ({
                        ...prevState,
                        subscribers_count: value,
                      }));
                    }}
                  />
                </div>
              </Tooltip>
            </div>
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
                  style={{ width: "100%" }}
                  options={sortOptions}
                  value={bodyData?.sort?.field}
                  placeholder="Sort by"
                  onChange={(value) => {
                    setBodyData((prevState) => ({
                      ...prevState,
                      sort: { ...prevState?.sort, field: value },
                    }));
                  }}
                  disabled={subscription?.plan?.name === "free"}
                />
              </Tooltip>
            </div>
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
            <div className={styles.search_button}>
              <button
                className="btn_small btn_primary"
                onClick={() => handleSearch(1)}
                disabled={
                  instagramNichesLoading ||
                  discoverInfluencersLoading ||
                  recentSearchLoading ||
                  getFreemiumInfluencersLoading
                }
              >
                {discoverInfluencersLoading ||
                getFreemiumInfluencersLoading ||
                recentSearchLoading ? (
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

export default InstagramFilters;
