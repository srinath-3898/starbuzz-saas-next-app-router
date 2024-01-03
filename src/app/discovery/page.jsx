"use client";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Discovery.module.css";
import { useEffect, useRef, useState } from "react";
import { ConfigProvider, Empty, Radio, Table, Tooltip } from "antd";
import {
  InstagramOutlined,
  LeftOutlined,
  MoreOutlined,
  RightOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import {
  resetDiscoverInfluencersData,
  resetDiscoverYoutubeInfluencerData,
  resetFreemiumInfluencersData,
  resetFreemiumYoutubeInfluencersData,
  resetRecentSearchData,
} from "@/store/discovery/discoverySlice";
import { useRouter } from "next/navigation";
import {
  discoverInfluencers,
  discoverYoutubeInfluencers,
  getFreemiumInfluencers,
  getFreemiumYoutubeInfluencers,
} from "@/store/discovery/discoveryActions";

const ListsIcon = dynamic(() => import("@/components/ListsIcon/ListsIcon"));
const CampaignsIcon = dynamic(() =>
  import("../../components/CampaignsIcon/CampaignsIcon")
);
const CustomDropdown = dynamic(() =>
  import("@/components/CustomDropdown/CustomDropdown")
);
const RecentSearches = dynamic(
  () => import("@/components/RecentSearches/RecentSearches"),
  { ssr: false }
);
const InstagramFilters = dynamic(
  () => import("@/components/InstagramFilters/InstagramFilters"),
  { ssr: false }
);
const YoutubeFilters = dynamic(
  () => import("@/components/YoutubeFilters/YoutubeFilters"),
  { ssr: false }
);
const Loader = dynamic(() => import("../../components/Loader/Loader"));
const Error = dynamic(() => import("../../components/Error/Error"), {
  ssr: false,
});
const PushToSubscriptionModal = dynamic(() =>
  import(
    "../../components/Modals/PushToSubscriptionModal/PushToSubscriptionModal"
  )
);
const AddInfluencerModal = dynamic(() =>
  import("../../components/Modals/AddInfluencerModal/AddInfluencer")
);

const Discovery = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { subscription } = useSelector((state) => state.auth);
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading,
    hasEnoughCredits,
    influencers,
    message,
    error,
    errorCode,
    getFreemiumInfluencersLoading,
    freemiumInfluencers,
    getFreemiumInfluencersError,
    getFreemiumInfluencersErrorCode,
    getFreemiumYoutubeInfluencersLoading,
    freemiumYoutubeInfluencers,
    getFreemiumYoutubeInfluencersError,
    getFreemiumYoutubeInfluencersErrorCode,
    youtubeInfluencersLoading,
    youtubeInfluencers,
    youtubeInfluencersMessage,
    youtubeInfluencersError,
    youtubeInfluencersErrorCode,
    recentSearchLoading,
    recentSearchInfluencers,
    recentSearchBody,
    recentSearchError,
    recentSearchErrorCode,
  } = useSelector((state) => state.discovery);

  const [isInstagram, setIsInstagram] = useState(true);
  const [instaBodyData, setInstaBodyData] = useState({
    account_age: { from: 0, to: 0 },
    account_gender: "",
    account_geo: { country: ["in"], city: [] },
    account_languages: ["en"],
    account_type: "human",
    aqs: { from: 0, to: 0 },
    audience_age: { groups: [], prc: 50 },
    audience_gender: { gender: [], prc: 20 },
    audience_geo: { cities: [] },
    category: { include: null },
    er: { from: 0, to: 0 },
    interests: [],
    social_network: "instagram",
    sort: { field: null, order: "asc" },
    subscribers_count: null,
  });
  const [youtubeBodyData, setYoutubeBodyData] = useState({
    social_network: "youtube",
    thematics: { include: null },
    account_geo: { country: "in" },
    account_age: { from: 0, to: 0 },
    account_languages: ["en"],
    blogger_prices: { post_price: { from: 0, to: 0 } },
    audience_gender: { gender: [] },
    audience_age: { groups: [], prc: 50 },
    subscribers_count: null,
    sort: { field: null, order: "asc" },
  });
  const [instaErrors, setInstaErrors] = useState({
    niches: "",
    cities: "",
    location: "",
  });
  const [youtubeErrors, setYoutubeErrors] = useState({});
  const [pushToSubscriptionModalOpen, setPushToSubscriptionModalOpen] =
    useState(false);
  const [addInfluencerModalOpen, setAddInfluencerModalOpen] = useState(false);
  const [type, setType] = useState(null);
  const [username, setUsername] = useState(null);

  const tableRef = useRef(null);
  const errorRef = useRef(null);
  const items = [
    {
      key: "1",
      label: (
        <div
          className={styles.item}
          onClick={() => {
            setType("list");
            setAddInfluencerModalOpen(true);
          }}
        >
          <ListsIcon />
          <p className="text_small">Add influencer to list</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className={styles.item}
          onClick={() => {
            setType("campaign");
            setAddInfluencerModalOpen(true);
          }}
        >
          <CampaignsIcon />
          <p className="text_small">Add influencer to Campaign</p>
        </div>
      ),
    },
  ];

  const coloumns = [
    {
      title: "Name",
      render: (text, record) => (
        <div className={styles.influencer_name}>
          <Image
            src={record?.avatar_url}
            width={30}
            height={30}
            alt="Profile pic"
          />
          <p>{record?.full_name}</p>
        </div>
      ),
    },
    {
      title: isInstagram ? "Insta ID" : "Youtube ID",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Scoial media accounts",
      key: "id",
      align: "center",
      render: (text, record) => (
        <Link
          href={
            isInstagram
              ? `https://www.instagram.com/${record?.username}/`
              : `https://www.youtube.com/@${record?.username}/`
          }
          target="_blank"
        >
          {isInstagram ? (
            <InstagramOutlined style={{ fontSize: "20px", color: "#fe5900" }} />
          ) : (
            <YoutubeFilled style={{ fontSize: "20px", color: "#ff0000" }} />
          )}
        </Link>
      ),
    },
    {
      title: "Report",
      align: "center",
      key: "report",
      render: (text, record) => {
        if (isInstagram) {
          return (
            <Link
              href={{
                pathname: "/report",
                query: {
                  profilePic: record?.avatar_url,
                  name: record?.name,
                  username: record?.username,
                  followers: record?.followers,
                  realFollowers: record?.realFollowers,
                  er: record?.er,
                  sbScore: record?.sbScore,
                },
              }}
              target="_blank"
              style={{
                textDecoration: "underline",
                color: "#fe5900",
              }}
            >
              View report
            </Link>
          );
        } else {
          return (
            <Link
              href={{
                pathname: "/report/youtube",
                query: {
                  username: record?.username,
                },
              }}
              target="_blank"
              style={{
                textDecoration: "underline",
                color: "#fe5900",
              }}
            >
              View report
            </Link>
          );
        }
      },
    },
    {
      title: "Actions",
      align: "center",
      render: (text, record) => {
        return (
          <CustomDropdown
            buttonItem={
              <MoreOutlined
                style={{ fontSize: "20px" }}
                onClick={() => setUsername(record?.username)}
              />
            }
            items={items}
          />
        );
      },
    },
  ];

  const validateInstaFilters = () => {
    if (instaBodyData.category.include || instaBodyData.interests.length > 0) {
      return true;
    } else {
      setInstaErrors((prevState) => ({
        ...prevState,
        niches: "Please select atleast one niche",
      }));
      return false;
    }
  };

  const validateYotubeFilters = () => {
    if (youtubeBodyData.thematics.include) {
      return true;
    } else {
      setYoutubeErrors((prevState) => ({
        ...prevState,
        niches: "Please select atleast one niche",
      }));
      return false;
    }
  };

  const handleInstaClick = () => {
    setIsInstagram(true);
    dispatch(resetFreemiumYoutubeInfluencersData());
    dispatch(resetDiscoverYoutubeInfluencerData());
    dispatch(resetRecentSearchData());
    setYoutubeBodyData({
      social_network: "youtube",
      thematics: { include: [] },
      account_geo: { country: "in" },
      account_age: { from: 0, to: 0 },
      account_languages: ["en"],
      blogger_prices: { post_price: { from: 0, to: 0 } },
      audience_gender: { gender: [] },
      audience_age: { groups: [], prc: 50 },
      subscribers_count: null,
      sort: { field: null, order: "asc" },
    });
  };

  const handleYoutubeClick = () => {
    setIsInstagram(false);
    dispatch(resetFreemiumInfluencersData());
    dispatch(resetDiscoverInfluencersData());
    dispatch(resetRecentSearchData());
    setInstaBodyData({
      account_age: { from: 0, to: 0 },
      account_gender: "",
      account_geo: { country: ["in"], city: [] },
      account_languages: ["en"],
      account_type: "human",
      aqs: { from: 0, to: 0 },
      audience_age: { groups: [], prc: 50 },
      audience_gender: { gender: [], prc: 20 },
      audience_geo: { cities: [] },
      category: { include: [] },
      er: { from: 0, to: 0 },
      interests: [],
      social_network: "instagram",
      sort: { field: null, order: "asc" },
      subscribers_count: null,
    });
  };

  const handleSearch = (page) => {
    if (validateInstaFilters()) {
      dispatch(resetRecentSearchData());
      if (subscription && subscription?.plan?.name === "free") {
        dispatch(
          getFreemiumInfluencers({
            brandId,
            niches: [instaBodyData.category.include],
            size: 20,
            page,
          })
        );
      } else {
        const discoverInfluencersBody = {
          bodyData: {
            account_age:
              instaBodyData?.account_age?.to > 0
                ? {
                    from: instaBodyData?.account_age?.from,
                    to: instaBodyData?.account_age?.to,
                  }
                : null,
            account_gender: instaBodyData?.account_gender
              ? instaBodyData.account_gender
              : null,
            account_geo:
              instaBodyData?.account_geo?.city?.length > 0
                ? {
                    city: instaBodyData?.account_geo?.city,
                  }
                : {
                    country: ["in"],
                  },
            account_languages: ["en"],
            account_type: "human",
            aqs:
              instaBodyData.aqs.to > 0
                ? {
                    from: instaBodyData.aqs.from,
                    to: instaBodyData.aqs.to,
                  }
                : null,
            audience_age:
              instaBodyData?.audience_age?.groups?.length > 0
                ? {
                    groups: instaBodyData?.audience_age?.groups,
                    prc: 50,
                  }
                : null,
            audience_gender: instaBodyData?.audience_gender?.gender
              ? {
                  gender: instaBodyData.audience_gender.gender,
                  prc: 20,
                }
              : null,
            audience_geo:
              instaBodyData?.audience_geo?.cities?.length > 0
                ? {
                    cities: instaBodyData.audience_geo.cities.map((city) => ({
                      id: city,
                      prc: 20,
                    })),
                  }
                : null,
            category: instaBodyData?.category?.include
              ? { include: [instaBodyData.category.include] }
              : null,
            er:
              instaBodyData?.er.to > 0
                ? {
                    from: instaBodyData.er.from,
                    to: instaBodyData.er.to,
                  }
                : null,
            interests:
              instaBodyData?.interests?.length > 0
                ? instaBodyData.interests?.map((interest) => ({
                    id: interest,
                    prc: 20,
                  }))
                : null,
            page,
            social_network: "instagram",
            sort: instaBodyData?.sort?.order
              ? {
                  field: instaBodyData.sort.field,
                  order: instaBodyData.sort.order,
                }
              : { field: "subscribers_count", order: "desc" },
            subscribers_count: instaBodyData?.subscribers_count
              ? JSON.parse(instaBodyData.subscribers_count)
              : null,
          },
          page,
        };
        for (let key in discoverInfluencersBody.bodyData) {
          if (
            discoverInfluencersBody.bodyData.hasOwnProperty(key) &&
            discoverInfluencersBody.bodyData[key] === null
          ) {
            delete discoverInfluencersBody.bodyData[key];
          }
        }
        dispatch(
          discoverInfluencers({ brandId, body: discoverInfluencersBody })
        );
      }
    }
  };

  const handleYoutubeSearch = (page) => {
    if (validateYotubeFilters()) {
      dispatch(resetRecentSearchData());
      if (subscription && subscription?.plan?.name === "free") {
        dispatch(
          getFreemiumYoutubeInfluencers({
            brandId,
            niches: [youtubeBodyData.thematics.include],
            size: 20,
            page,
          })
        );
      } else {
        const discoverYoutubeInfluencerBody = {
          page,
          bodyData: {
            social_network: "youtube",
            thematics: youtubeBodyData?.thematics?.include
              ? {
                  include: [youtubeBodyData.thematics.include],
                }
              : null,
            account_geo: { country: ["in"] },
            account_age:
              youtubeBodyData?.account_age?.to > 0
                ? {
                    from: youtubeBodyData?.account_age?.from,
                    to: youtubeBodyData?.account_age?.to,
                  }
                : null,
            account_languages: ["en"],
            blogger_prices:
              youtubeBodyData?.blogger_prices?.post_price?.to > 0
                ? {
                    post_price: {
                      from: youtubeBodyData?.blogger_prices?.post_price?.from,
                      to: youtubeBodyData?.blogger_prices?.post_price?.to,
                    },
                  }
                : null,

            audience_gender: youtubeBodyData?.audience_gender?.gender
              ? {
                  gender: youtubeBodyData.audience_gender.gender,
                  prc: 20,
                }
              : null,
            audience_age:
              youtubeBodyData?.audience_age?.groups?.length > 0
                ? {
                    groups: youtubeBodyData?.audience_age?.groups,
                    prc: 50,
                  }
                : null,

            subscribers_count: youtubeBodyData?.subscribers_count
              ? JSON.parse(youtubeBodyData.subscribers_count)
              : null,

            sort: youtubeBodyData?.sort?.order
              ? {
                  field: "subscribers_count",
                  order: youtubeBodyData.sort.order,
                }
              : { field: "subscribers_count", order: "desc" },
            page,
          },
        };
        for (let key in discoverYoutubeInfluencerBody.bodyData) {
          if (
            discoverYoutubeInfluencerBody.bodyData.hasOwnProperty(key) &&
            discoverYoutubeInfluencerBody.bodyData[key] === null
          ) {
            delete discoverYoutubeInfluencerBody.bodyData[key];
          }
        }
        dispatch(
          discoverYoutubeInfluencers({
            brandId,
            body: discoverYoutubeInfluencerBody,
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(resetFreemiumInfluencersData());
    dispatch(resetDiscoverInfluencersData());
    dispatch(resetFreemiumYoutubeInfluencersData());
    dispatch(resetDiscoverYoutubeInfluencerData());
    dispatch(resetRecentSearchData());
  }, []);
  useEffect(() => {
    if (
      (influencers ||
        youtubeInfluencers ||
        recentSearchInfluencers ||
        freemiumInfluencers ||
        freemiumYoutubeInfluencers) &&
      tableRef.current
    ) {
      tableRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      return;
    }
  }, [
    influencers,
    youtubeInfluencers,
    recentSearchInfluencers,
    freemiumInfluencers,
    freemiumYoutubeInfluencers,
  ]);

  useEffect(() => {
    if (hasEnoughCredits === false) {
      dispatch(resetDiscoverInfluencersData());
      dispatch(resetRecentSearchData());
      dispatch(resetFreemiumYoutubeInfluencersData());
      dispatch(resetDiscoverYoutubeInfluencerData());
      setPushToSubscriptionModalOpen(true);
    } else {
      return;
    }
  }, [hasEnoughCredits]);

  useEffect(() => {
    if (recentSearchBody && recentSearchInfluencers) {
      if (isInstagram) {
        setInstaBodyData((prevState) => ({
          ...prevState,
          ...recentSearchBody,
          interests:
            recentSearchBody?.interests?.length > 0
              ? recentSearchBody?.interests?.map((interest) => interest?.id)
              : [],
          audience_age: {
            groups:
              recentSearchBody?.audience_age?.groups?.length > 0
                ? recentSearchBody?.audience_age?.groups
                : [],
            prc: 50,
          },
          account_geo: {
            city:
              recentSearchBody?.account_geo?.city?.length > 0
                ? recentSearchBody?.account_geo?.city
                : [],
          },
          audience_geo: {
            cities:
              recentSearchBody?.audience_geo?.cities?.length > 0
                ? recentSearchBody?.audience_geo?.cities?.map((city) => city.id)
                : [],
          },
          subscribers_count: recentSearchBody?.subscribers_count
            ? JSON.stringify(recentSearchBody?.subscribers_count)
            : null,
        }));
      } else {
        setYoutubeBodyData((prevState) => ({
          ...prevState,
          ...recentSearchBody,
          audience_age: {
            groups:
              recentSearchBody?.audience_age?.groups?.length > 0
                ? recentSearchBody?.audience_age?.groups
                : [],
            prc: 50,
          },
          subscribers_count: recentSearchBody?.subscribers_count
            ? JSON.stringify(recentSearchBody?.subscribers_count)
            : null,
        }));
      }
    }
  }, [recentSearchBody, recentSearchInfluencers]);

  useEffect(() => {
    if (errorRef.current) {
      errorRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [
    error,
    youtubeInfluencersError,
    getFreemiumInfluencersError,
    getFreemiumYoutubeInfluencers,
  ]);

  return subscription ? (
    <>
      <div className={styles.container}>
        <div className={styles.container_1}>
          <p className="text_medium bold">Choose Platform</p>
          <Radio checked={isInstagram} onChange={handleInstaClick}>
            Instagram
          </Radio>
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
            <Radio
              checked={!isInstagram}
              onChange={handleYoutubeClick}
              disabled={subscription?.plan?.name === "free"}
            >
              Youtube
            </Radio>
          </Tooltip>
        </div>
        {subscription && subscription?.plan?.name !== "free" ? (
          <RecentSearches isInstagram={isInstagram} />
        ) : (
          <></>
        )}
        {isInstagram ? (
          <InstagramFilters
            bodyData={instaBodyData}
            setBodyData={setInstaBodyData}
            errors={instaErrors}
            setErrors={setInstaErrors}
            handleSearch={handleSearch}
          />
        ) : (
          <YoutubeFilters
            bodyData={youtubeBodyData}
            setBodyData={setYoutubeBodyData}
            errors={youtubeErrors}
            setErrors={setYoutubeErrors}
            handleSearch={handleYoutubeSearch}
          />
        )}
        {(loading ||
          youtubeInfluencersLoading ||
          getFreemiumInfluencersLoading ||
          recentSearchLoading ||
          getFreemiumYoutubeInfluencersLoading) &&
        !influencers &&
        !freemiumInfluencers &&
        !youtubeInfluencers &&
        !freemiumYoutubeInfluencers &&
        !recentSearchInfluencers ? (
          <Loader />
        ) : (
          <> </>
        )}

        {influencers ||
        youtubeInfluencers ||
        freemiumInfluencers ||
        recentSearchInfluencers ||
        freemiumYoutubeInfluencers ? (
          <div ref={tableRef} className={styles.influencers_table}>
            <ConfigProvider
              renderEmpty={() => {
                return (
                  <Empty
                    // image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <p className="text_medium">
                        No Influencers found with above filters, please try
                        applying different filters.
                      </p>
                    }
                  />
                );
              }}
            >
              <Table
                scroll={{ y: 350 }}
                columns={coloumns}
                dataSource={
                  influencers
                    ? influencers?.search_results?.map((influencer) => ({
                        avatar_url: influencer?.basic?.avatar_url,
                        full_name: influencer?.basic?.title,
                        username: influencer?.basic?.username,
                        followers:
                          influencer?.metrics?.subscribers_count?.value,
                        realFollowers:
                          influencer?.metrics?.real_subscribers_count?.value,
                        er: influencer?.metrics?.er?.value,
                        sbScore: influencer?.features?.aqs?.data?.mark,
                      }))
                    : youtubeInfluencers
                    ? youtubeInfluencers?.search_results?.map((influencer) => ({
                        avatar_url: influencer?.basic?.avatar_url,
                        full_name: influencer?.basic?.title,
                        username: influencer?.basic?.username,
                        followers:
                          influencer?.metrics?.subscribers_count?.value,
                        realFollowers:
                          influencer?.metrics?.real_subscribers_count?.value,
                        sbScore: influencer?.features?.cqs?.data?.mark,
                      }))
                    : freemiumInfluencers
                    ? freemiumInfluencers?.data
                    : recentSearchInfluencers
                    ? recentSearchInfluencers?.search_results?.map(
                        (influencer) => ({
                          avatar_url: influencer?.basic?.avatar_url,
                          full_name: influencer?.basic?.title,
                          username: influencer?.basic?.username,
                          followers:
                            influencer?.metrics?.subscribers_count?.value,
                          realFollowers:
                            influencer?.metrics?.real_subscribers_count?.value,
                          er: influencer?.metrics?.er?.value,
                          sbScore: influencer?.features?.aqs?.data?.mark,
                        })
                      )
                    : freemiumYoutubeInfluencers?.data
                }
                rowKey={"username"}
                pagination={false}
                loading={{
                  indicator: <Loader />,
                  spinning:
                    loading ||
                    youtubeInfluencersLoading ||
                    getFreemiumInfluencersLoading ||
                    getFreemiumYoutubeInfluencersLoading,
                }}
              />
            </ConfigProvider>

            <div className={styles.pagination}>
              <Tooltip title="Previous Page">
                <button
                  onClick={() => {
                    if (isInstagram) {
                      handleSearch(
                        influencers
                          ? influencers?.current_page - 1
                          : freemiumInfluencers
                          ? freemiumInfluencers?.current_page - 1
                          : recentSearchInfluencers?.current_page - 1
                      );
                    } else {
                      handleYoutubeSearch(
                        youtubeInfluencers
                          ? youtubeInfluencers?.current_page - 1
                          : freemiumYoutubeInfluencers
                          ? freemiumYoutubeInfluencers?.current_page - 1
                          : recentSearchInfluencers?.current_page - 1
                      );
                    }
                  }}
                  disabled={
                    getFreemiumInfluencersLoading ||
                    recentSearchLoading ||
                    loading ||
                    youtubeInfluencersLoading ||
                    getFreemiumInfluencersLoading ||
                    getFreemiumYoutubeInfluencersLoading ||
                    recentSearchInfluencers?.current_page === 1 ||
                    influencers?.current_page === 1 ||
                    youtubeInfluencers?.current_page === 1 ||
                    freemiumInfluencers?.current_page === 1 ||
                    freemiumYoutubeInfluencers?.current_page === 1
                  }
                >
                  <LeftOutlined
                    style={{
                      color:
                        recentSearchLoading ||
                        loading ||
                        youtubeInfluencersLoading ||
                        getFreemiumInfluencersLoading ||
                        getFreemiumYoutubeInfluencersLoading ||
                        recentSearchInfluencers?.current_page === 1 ||
                        influencers?.current_page === 1 ||
                        youtubeInfluencers?.current_page === 1 ||
                        freemiumYoutubeInfluencers?.current_page === 1 ||
                        freemiumInfluencers?.current_page === 1
                          ? "#cccccc"
                          : "#fe5900",
                    }}
                  />
                </button>
              </Tooltip>
              <div>
                <p className="text_small bold">
                  Page{" "}
                  {influencers
                    ? influencers?.current_page
                    : youtubeInfluencers
                    ? youtubeInfluencers?.current_page
                    : freemiumInfluencers
                    ? freemiumInfluencers?.current_page
                    : recentSearchInfluencers
                    ? recentSearchInfluencers.current_page
                    : freemiumYoutubeInfluencers?.current_page}{" "}
                  of{" "}
                  {influencers
                    ? influencers?.total_pages
                    : youtubeInfluencers
                    ? youtubeInfluencers?.total_pages
                    : freemiumInfluencers
                    ? freemiumInfluencers?.last_page
                    : recentSearchInfluencers
                    ? recentSearchInfluencers?.total_pages
                    : freemiumYoutubeInfluencers?.last_page}
                </p>
              </div>
              <Tooltip title="Next Page">
                <button
                  onClick={() => {
                    if (isInstagram) {
                      handleSearch(
                        influencers
                          ? influencers?.current_page + 1
                          : freemiumInfluencers
                          ? freemiumInfluencers?.current_page + 1
                          : recentSearchInfluencers?.current_page + 1
                      );
                    } else {
                      handleYoutubeSearch(
                        youtubeInfluencers
                          ? youtubeInfluencers?.current_page + 1
                          : freemiumYoutubeInfluencers
                          ? freemiumYoutubeInfluencers?.current_page + 1
                          : recentSearchInfluencers?.current_page + 1
                      );
                    }
                  }}
                  disabled={
                    recentSearchLoading ||
                    loading ||
                    youtubeInfluencersLoading ||
                    getFreemiumInfluencersLoading ||
                    getFreemiumYoutubeInfluencersLoading ||
                    (recentSearchInfluencers &&
                      recentSearchInfluencers?.current_page >=
                        recentSearchInfluencers?.total_pages) ||
                    (influencers &&
                      influencers?.current_page >= influencers?.total_pages) ||
                    (youtubeInfluencers &&
                      youtubeInfluencers?.current_page >=
                        youtubeInfluencers?.total_pages) ||
                    (freemiumInfluencers &&
                      freemiumInfluencers?.current_page >=
                        freemiumInfluencers?.last_page) ||
                    (freemiumYoutubeInfluencers &&
                      freemiumYoutubeInfluencers?.current_page >=
                        freemiumYoutubeInfluencers?.last_page)
                  }
                >
                  <RightOutlined
                    style={{
                      color:
                        recentSearchLoading ||
                        loading ||
                        youtubeInfluencersLoading ||
                        getFreemiumInfluencersLoading ||
                        (recentSearchInfluencers &&
                          recentSearchInfluencers?.current_page >=
                            recentSearchInfluencers?.total_pages) ||
                        (influencers &&
                          influencers?.current_page >=
                            influencers?.total_pages) ||
                        (youtubeInfluencers &&
                          youtubeInfluencers?.current_page >=
                            youtubeInfluencers?.total_pages) ||
                        (freemiumYoutubeInfluencers &&
                          freemiumYoutubeInfluencers?.current_page >=
                            freemiumYoutubeInfluencers?.last_page) ||
                        (freemiumInfluencers &&
                          freemiumInfluencers?.current_page >=
                            freemiumInfluencers?.last_page)
                          ? "#cccccc"
                          : "#fe5900",
                    }}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ) : (
          <></>
        )}
        {error ||
        getFreemiumInfluencersError ||
        recentSearchError ||
        youtubeInfluencersError ||
        getFreemiumYoutubeInfluencersError ? (
          <div className={styles.discover_influencers_error} ref={errorRef}>
            <Error
              message={
                error
                  ? error
                  : youtubeInfluencersError
                  ? youtubeInfluencersError
                  : getFreemiumInfluencersError
                  ? getFreemiumInfluencersError
                  : recentSearchError
                  ? recentSearchError
                  : getFreemiumYoutubeInfluencersError
              }
              errorCode={
                errorCode
                  ? errorCode
                  : youtubeInfluencersErrorCode
                  ? youtubeInfluencersErrorCode
                  : getFreemiumInfluencersErrorCode
                  ? getFreemiumInfluencersErrorCode
                  : recentSearchErrorCode
                  ? recentSearchErrorCode
                  : getFreemiumYoutubeInfluencersErrorCode
              }
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <PushToSubscriptionModal
        open={pushToSubscriptionModalOpen}
        setOpen={setPushToSubscriptionModalOpen}
        message={message || youtubeInfluencersMessage}
        handleSubscribe={() => {
          setPushToSubscriptionModalOpen(false);
          dispatch(resetDiscoverInfluencersData());
          router.push("/subscription");
        }}
      />
      <AddInfluencerModal
        type={type}
        setType={setType}
        open={addInfluencerModalOpen}
        setOpen={setAddInfluencerModalOpen}
        username={username}
        setUsername={setUsername}
      />
    </>
  ) : (
    <></>
  );
};

export default Discovery;
