"use client";
import React, { useEffect, useState } from "react";
import styles from "./CreateCampaign.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  getCampaign,
  updateCampaign,
} from "@/store/campaign/campaignActions";
import {
  getInstagramNiches,
  getTaxanomy,
} from "@/store/taxanomy/taxanomyActions";
import { message } from "antd";
import { resetCUDCampaignData } from "@/store/campaign/campaignSlice";
import Loader from "@/components/Loader/Loader";
import MultiSelect from "@/components/MultiSelect/MultiSelect";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import { useRouter, useSearchParams } from "next/navigation";

const CreateCampaign = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const id = useSearchParams().get("id");

  console.log(id);

  const { instagramNiches, platforms } = useSelector((state) => state.taxanomy);
  const { loading, campaign, error, cudCampaignLoading, cudCampaignError } =
    useSelector((state) => state.campaign);
  const { brandId } = useSelector((state) => state.globalVariables);

  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedFollowersRange, setSelectedFollowersRange] = useState();
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    scope: "",
    type: "",
    niche_ids: "",
    platform_ids: "",
    followers_range: "",
    budget: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scope: "",
    type_id: 1,
    niche_ids: "",
    platform_ids: "",
    followers_range_from: "",
    followers_range_to: "",
    budget: "",
  });

  const followersRangeOptions = [
    {
      key: 1,
      value: JSON.stringify({
        followers_range_from: 1000,
        followers_range_to: 10000,
      }),
      label: "NANO (1K - 10K)",
    },
    {
      key: 2,
      value: JSON.stringify({
        followers_range_from: 10000,
        followers_range_to: 50000,
      }),
      label: "MICRO (10K - 50K)",
    },
    {
      key: 3,
      value: JSON.stringify({
        followers_range_from: 50000,
        followers_range_to: 500000,
      }),
      label: "MID (50K - 500K)",
    },
    {
      key: 4,
      value: JSON.stringify({
        followers_range_from: 500000,
        followers_range_to: 1000000,
      }),
      label: "MACRO (500K - 1M)",
    },
    {
      key: 5,
      value: JSON.stringify({
        followers_range_from: 1000000,
        followers_range_to: 10000000,
      }),
      label: "MEGA (1M - 10M)",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData((prevFormData) => ({
      ...prevFormData,
      niche_ids: selectedNiches,
      platform_ids: selectedPlatforms,
    }));
    if (validateForm()) {
      if (id) {
        dispatch(
          updateCampaign({
            brandId: brandId,
            campaignId: id,
            data: formData,
          })
        ).then((data) => {
          if (data?.payload?.data?.status) {
            router.push("/campaigns");
          }
        });
      } else {
        dispatch(createCampaign({ brandId: brandId, data: formData })).then(
          (data) => {
            if (data?.payload?.data?.status) {
              router.push("/campaigns");
            }
          }
        );
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) {
      errors.title = "please enter title";
    }
    if (!formData.description) {
      errors.description = "please enter description of campaign";
    }
    if (!formData.scope) {
      errors.scope = "please enter influencer task ";
    }
    if (!formData.type_id) {
      errors.type = "please select type of campaign";
    }
    if (formData.niche_ids.length === 0) {
      errors.niche_ids = "please select atleast one niche";
    }
    if (formData.platform_ids.length === 0) {
      errors.platform_ids = "please enter platform of campaign";
    }
    if (!formData.followers_range_from) {
      errors.followers_range = "please select followers range";
    }
    if (!formData.followers_range_to) {
      errors.followers_range = "please select followers range";
    }
    if (!formData.budget) {
      errors.budget = "please enter budget";
    } else {
      const numberRegex = /^[0-9]+$/;
      if (!numberRegex.test(formData.budget)) {
        errors.budget = "please enter valid budget";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "type_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: Number(value),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    dispatch(getTaxanomy());
    dispatch(getInstagramNiches());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getCampaign({ brandId, campaignId: id }));
    }
  }, []);

  useEffect(() => {
    if (campaign) {
      setFormData((prev) => ({
        ...prev,
        title: campaign?.title,
        description: campaign?.description,
        scope: campaign?.scope,
        type_id: campaign?.type?.id,
        followers_range_from: campaign?.followers_range_from,
        followers_range_to: campaign?.followers_range_to,
        budget: campaign?.budget,
      }));
      setSelectedNiches((prev) => [
        ...(prev.nicheIds || []),
        ...(campaign?.niches?.map((niche) => niche.id) || []),
      ]);
      setSelectedPlatforms((prev) => [
        ...(prev.platformIds || []),
        ...(campaign?.platforms?.map((platform) => platform.id) || []),
      ]);
      setSelectedFollowersRange(
        JSON.stringify({
          followers_range_from: campaign?.followers_range_from,
          followers_range_to: campaign?.followers_range_to,
        })
      );
    }
  }, [campaign]);

  useEffect(() => {
    if (selectedNiches || selectedPlatforms) {
      setFormData((prev) => ({
        ...prev,
        niche_ids: selectedNiches,
        platform_ids: selectedPlatforms,
      }));
    }
  }, [selectedNiches, selectedPlatforms]);

  useEffect(() => {
    if (cudCampaignError) {
      messageApi.open({
        type: "error",
        content: cudCampaignError,
      });
      dispatch(resetCUDCampaignData());
    }
  }, [cudCampaignError]);

  useEffect(() => {
    if (!id) {
      setFormData((prev) => ({
        ...prev,

        title: "",
        description: "",
        scope: "",
        type_id: 1,
        niche_ids: [],
        platform_ids: [],
        followers_range_from: "",
        followers_range_to: "",
        budget: "",
      }));
      setSelectedNiches([]);
      setSelectedPlatforms([]);
      setSelectedFollowersRange("");
    }
  }, [id]);

  return (
    <>
      {contextHolder}
      {loading && !error && (
        <div className={styles.container}>
          <Loader size={50} color={"#ff5900"} />
        </div>
      )}
      {!loading && !error && (
        <form action="" className={styles.campaign_form}>
          <div className={styles.heading}>
            <p className={`text_large bold`}>
              {id ? "Update" : "Create"} Campaign
            </p>
            <div>
              {id ? (
                <div className={styles.btn}>
                  <button
                    className={`btn_secondary`}
                    onClick={() => router.push(`/campaigns`)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`btn_primary`}
                    onClick={handleSubmit}
                    disabled={cudCampaignLoading}
                  >
                    {cudCampaignLoading ? (
                      <Loader size={13} color="#ffffff" />
                    ) : id ? (
                      "Update"
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="title"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number} `}
              >
                Title:
              </label>
              <p className={`text_small ${styles.note}`}>
                This will help you to identify your campaign easily
              </p>
            </div>
            <div>
              <input
                className={`${styles.input}`}
                type="text"
                name="title"
                id="title"
                value={formData.title}
                placeholder="Eg. Diwali Campaign "
                onChange={handleChange}
              />
              {errors.title && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.title}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            {" "}
            <p className={`text_large bold`}>Description</p>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="description"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Tell us about your campaign:
              </label>
              <p className={`text_small ${styles.note}`}>
                This will help the creator understand your requirement. Mention
                in detail about the campaign and the theme of the campaign
              </p>
            </div>
            <div>
              <textarea
                className={styles.input}
                name="description"
                id="description"
                cols="30"
                rows="5"
                value={formData.description}
                placeholder={`Eg. We are planning to run a campaign for Diwali.\nThe theme of this campaign is “This Diwali - Be a Star”.\nThe selected creators are required to upload a reel with content done around this theme.\nHashtags to be used - #Diwaliwithbrand #examplehashtags`}
                onChange={handleChange}
              ></textarea>
              {errors.description && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="scope"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Tell us about the influencers task:
              </label>
              <p className={`text_small ${styles.note}`}>
                Mention in detail about the deliverables you expect from an
                influencer and the number of social media handles he/she should
                be posting on. Include content rights, exclusivity if any
              </p>
            </div>
            <div>
              <textarea
                className={styles.input}
                name="scope"
                id="scope"
                cols="30"
                rows="5"
                value={formData.scope}
                placeholder={`Each influencer has to create a video around the theme explained.\nIt should be posted in the form of a reel in instagram and shorts in YT.\nEach influencer should post a story of the same reel on their stories.\nDeliverables - 1 insta reel + 1 YT short + 1 story\nContent rights - 1 year`}
                onChange={handleChange}
              ></textarea>
              {errors.scope && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.scope}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.heading}>
            <p className={`text_large bold`}>General Information</p>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                What type of campaign do you want to run?
              </label>
              <p className={`text_small ${styles.note}`}>
                Mention if this is a paid campaign or a barter campaign
              </p>
            </div>
            <div>
              <div className={styles.input_radio_container}>
                <div className={styles.input_controller}>
                  <input
                    type="radio"
                    name={"type_id"}
                    id={"paid"}
                    value={1}
                    checked={formData.type_id === 1}
                    onChange={handleChange}
                  />
                  <label htmlFor={"paid"} className={styles.custom_radio}>
                    <label
                      htmlFor={"paid"}
                      className={`text_small bold `}
                      style={{ cursor: "pointer" }}
                    >
                      Paid Promotion
                    </label>
                    <p className={`text_small ${styles.note}`}>
                      Create paid collaboration with influencers
                    </p>
                  </label>
                </div>
                <div className={styles.input_controller}>
                  <input
                    type="radio"
                    name={"type_id"}
                    id={"barter"}
                    value={2}
                    checked={formData.type_id === 2}
                    onChange={handleChange}
                  />
                  <label htmlFor={"barter"} className={styles.custom_radio}>
                    <label
                      htmlFor={"barter"}
                      className={`text_small bold `}
                      style={{ cursor: "pointer" }}
                    >
                      Free Giveaway
                    </label>
                    <p className={`text_small ${styles.note}`}>
                      Run a free promotional giveaway campaign
                    </p>
                  </label>
                </div>
              </div>
              {errors.type && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.type}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="niche"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Niche:
              </label>
              <p className={`text_small ${styles.note}`}>
                Select the category of the influencers based on your brand and
                the theme
              </p>
            </div>
            <div>
              <MultiSelect
                width={"100%"}
                placeHolder={"Niche"}
                options={instagramNiches}
                optionValue={"id"}
                optionLabel={"title"}
                selectedOptions={selectedNiches}
                onChange={(value) => setSelectedNiches(value)}
              />
              {errors.niche_ids && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.niche_ids}</p>
                </div>
              )}
            </div>
          </div>

          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="social media"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Social media:
              </label>
              <p className={`text_small ${styles.note}`}>
                select the social media channels where you’d be collaborating
                with the influencers
              </p>
            </div>
            <div>
              <MultiSelect
                width={"100%"}
                placeHolder={"Social media"}
                options={platforms}
                optionValue={"id"}
                optionLabel={"name"}
                selectedOptions={selectedPlatforms}
                onChange={(value) => setSelectedPlatforms(value)}
              />
              {errors.platform_ids && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.platform_ids}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="followers range"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Followers range:
              </label>
              <p className={`text_small ${styles.note}`}>
                select the influencer’s follower range that you’d like to work
                with
              </p>
            </div>
            <div>
              <SingleSelect
                width={"100%"}
                placeHolder={"Followers range"}
                options={followersRangeOptions}
                selectedOption={selectedFollowersRange}
                optionLabel={"label"}
                optionValue={"value"}
                onChange={(value) => {
                  if (typeof value === "string") {
                    setSelectedFollowersRange(
                      followersRangeOptions.find(
                        (option) => option.value === value
                      )
                    );
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      ...JSON.parse(value),
                    }));
                  } else {
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      followers_range_from: null,
                      followers_range_to: null,
                    }));
                  }
                }}
              />
              {errors.followers_range && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.followers_range}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.inputfield}>
            <div className={styles.input_name}>
              <label
                htmlFor="budget"
                className={`text_medium bold ${styles.heading_color} ${styles.serial_number}`}
              >
                Budget:
              </label>
              <p className={`text_small ${styles.note}`}>
                The budget you have set aside for this influencer marketing
                campaign
              </p>
            </div>
            <div>
              <input
                type="text"
                id="budget"
                name="budget"
                placeholder="Eg. 50,000"
                className={styles.input}
                value={formData?.budget}
                onChange={handleChange}
              />
              {errors.budget && (
                <div className={`validation_error `}>
                  <p className={`text_small `}>*{errors.budget}</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.btn}>
            <button
              className={`btn_secondary btn_small`}
              onClick={() => router.push(`/campaigns`)}
            >
              Cancel
            </button>
            <button
              className={`btn_primary btn_small`}
              onClick={handleSubmit}
              disabled={cudCampaignLoading}
            >
              {cudCampaignLoading ? (
                <Loader size={13} color="#ffffff" />
              ) : id ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateCampaign;
