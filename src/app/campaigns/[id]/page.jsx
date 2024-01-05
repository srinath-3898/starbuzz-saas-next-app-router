"use client";
import {
  deleteInfluencerFromCampaign,
  getCampaign,
  getInfluencers,
  updateCampaignDetails,
} from "@/store/campaign/campaignActions";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Campaign.module.css";
import GroupProfile from "../../../assets/svgs/GroupProfile.svg";
import TotalPosts from "../../../assets/svgs/totalPosts.svg";
import Budget from "../../../assets/svgs/budget.svg";
import calender from "../../../assets/svgs/edit_date.svg";
import socialmedia from "../../../assets/svgs/social-media.svg";
import {
  ConfigProvider,
  Empty,
  Modal,
  Popconfirm,
  Select,
  Table,
  Tooltip,
  message,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import CampaignAutomation from "../../../assets/images/campaignAutomation.png";
import Link from "next/link";
import {
  resetCampaignDetailsData,
  resetCampaignStartData,
  resetDeleteInfluencerFromCampaignData,
  resetUpdateCampaignInfluencerData,
} from "@/store/campaign/campaignSlice";
import { getAddOns } from "@/store/addOns/addOnsActions";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import CampaignOverviewCard from "@/components/CampaignOverviewCard/CampaignOverviewCard";
import CampaignPosts from "@/components/CampaignPosts/CampaignPosts";
import Error from "@/components/Error/Error";
import Pagination from "@/components/Pagination/Pagination";
import BillingAddressModal from "@/components/Modals/BillingAddressModal/BillingAddressModal";
import UpdateCampaignInfluencerModal from "@/components/Modals/UpdateCampaignInfluencerModal/UpdateCampaignInfluencerModal";
import CampaignAutomationInfoModal from "@/components/Modals/CampaignAutomationInfoModal/CampaignAutomationInfoModal";
import StartCampaignManuallyModal from "@/components/Modals/startCampaignManuallyModal/StartCampaignManuallyModal";
import EditCampaignEndDateModal from "@/components/Modals/editCampaignEndDateModal/EditCampaignEndDateModal";
import ManualCampaignInfoModal from "@/components/Modals/manualCampaignInfoModal/ManualCampaignInfoModal";

const Campaign = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { addOns } = useSelector((state) => state.addOns);

  const { id } = useParams();

  const {
    loading,
    campaign,
    error,
    getInfluencersLoading,
    influencers,
    getInfluencersError,
    getInfluencersErrorCode,
    deleteInfluencerFromCampaignLoading,
    deleteInfluencerFromCampaignMessage,
    deleteInfluencerFromCampaignError,
    updateCampaignInfluencerMessage,
    updateCampaignInfluencerError,
    is_automated,
    campaignStartError,
    campaignStartMessage,
    updateCampaignDetailsLoading,
    updateCampaignDetailsError,
    updateCampaignDetailsMessage,
  } = useSelector((state) => state.campaign);

  const { brandId } = useSelector((state) => state.globalVariables);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [influencerUsername, setInfluencerUsername] = useState(null);
  const [influencer, setInfluencer] = useState(null);
  const [automationPrice, setAutomationPrice] = useState(0);
  const [automationId, setAutomationId] = useState(null);
  const [campaignAutomationInfoModalOpen, setCampaignAutomationInfoModalOpen] =
    useState(false);
  const [billingAddressModalOpen, setBillingAddressModalOpen] = useState(false);
  const [
    campaignInfluencerBudgetModalOpen,
    setCampaignInfluencerBudgetModalOpen,
  ] = useState(false);
  const [campaignStatus, setCampaignStatus] = useState(null);
  const [startCampaignManuallyModalOpen, setStartCampaignManuallyModalOpen] =
    useState(false);
  const [editCampaignEndDateModalOpen, setEditCampaignEndDateModalOpen] =
    useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [manualCampaignInfoModalOpen, setManualCampaignInfoModalOpen] =
    useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [notes, setNotes] = useState("");

  function formatNumber(number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      const formatted = (number / 1000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "K"
        : formatted + "K";
    } else if (number < 1000000000) {
      const formatted = (number / 1000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "M"
        : formatted + "M";
    } else {
      const formatted = (number / 1000000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "B"
        : formatted + "B";
    }
  }

  const statusOptions = [
    {
      label: "ACTIVE",
      value: "ACTIVE",
    },
    {
      label: "PAUSE",
      value: "PAUSED",
    },
    {
      label: "COMPLETED",
      value: "COMPLETED",
    },
  ];

  const handleDelete = () => {
    dispatch(
      deleteInfluencerFromCampaign({
        brandId,
        campaignId: campaign?.id,
        username: influencerUsername,
      })
    ).then(() => {
      setInfluencerUsername(null);
      dispatch(
        getInfluencers({
          brandId,
          campaignId: campaign?.id,
          size,
          page,
        })
      );
    });
  };

  const handleSelect = (value) => {
    const data = {
      status: value,
    };
    dispatch(
      updateCampaignDetails({ brandId: brandId, campaignId: id, data: data })
    ).then(() => {
      dispatch(getCampaign({ brandId, campaignId: id }));
      setCampaignStatus(value);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link
          href={{
            pathname: `/campaigns/${campaign?.id}/campaignInfluencer`,
            query: { username: record.username },
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Social Media",
      dataIndex: "platform",
      key: "platform",
      render: (type) => <p style={{ color: "#666464" }}>{type?.name}</p>,
    },
    {
      title: "Budget",
      dataIndex: "CampaignInfluencers",
      key: "CampaignInfluencers",
      render: (budget) => (
        <p style={{ color: "#666464" }}>{formatNumber(budget?.budget)}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "CampaignInfluencers",
      key: "CampaignInfluencers",
      render: (status) => {
        let statusClassName = "";
        switch (status?.status) {
          case "ACCEPTED":
            statusClassName = styles.status_accepted;
            break;
          case "PENDING":
            statusClassName = styles.status_pending;
            break;
          case "REJECTED":
            statusClassName = styles.status_rejected;
            break;
          case "NEGOTIATED":
            statusClassName = styles.status_negotiated;
            break;
          default:
            statusClassName = styles.default_status;
            break;
        }
        return (
          <div className={statusClassName}>
            <p className="text_small center">{status?.status}</p>
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "dataIndex",
      render: (text) => (
        <p style={{ color: "#666464" }}>
          {new Date(text).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => {
        return (
          <div className={styles.actions}>
            <Tooltip title="View report">
              <Link
                href={{
                  pathname: "/report",
                  query: {
                    profilePic: record?.avatar_url,
                    name: record?.full_name,
                    username: record?.username,
                  },
                }}
                target="_blank"
              >
                <FileTextOutlined style={{ fontSize: 17 }} />
              </Link>
            </Tooltip>
            <Tooltip title="Update campaign influencer status and budget">
              <EditOutlined
                style={{ color: "blue", fontSize: 17 }}
                onClick={() => {
                  setInfluencer(record);
                  setCampaignInfluencerBudgetModalOpen(true);
                }}
              />
            </Tooltip>
            <Popconfirm
              title="Remove influencerUsername"
              description="Are you sure to remove this influencerUsername from this campaign?"
              open={influencerUsername === record?.username}
              okText="Yes"
              cancelText="No"
              placement="left"
              onConfirm={handleDelete}
              onCancel={() => {
                setInfluencerUsername(null);
              }}
              okButtonProps={{
                loading: deleteInfluencerFromCampaignLoading,
                disabled: deleteInfluencerFromCampaignLoading,
              }}
              cancelButtonProps={{
                disabled: deleteInfluencerFromCampaignLoading,
              }}
            >
              <Tooltip title="Delete influencer from this campaign">
                <DeleteOutlined
                  onClick={() => setInfluencerUsername(record?.username)}
                  style={{ color: "red", fontSize: 17 }}
                />
              </Tooltip>
            </Popconfirm>
          </div>
        );
      },
    },
    {
      title: "Notes",
      dataIndex: "CampaignInfluencers",
      key: "notes",
      align: "center",
      render: (value) => (
        <InfoCircleOutlined
          onClick={() => {
            setNotes(value?.notes);
            setNotesModalOpen(true);
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getCampaign({ brandId, campaignId: id }));
  }, [brandId, id]);

  useEffect(() => {
    if (campaign && !campaignInfluencerBudgetModalOpen) {
      dispatch(
        getInfluencers({
          brandId,
          campaignId: campaign?.id,
          size,
          page,
        })
      );
    } else {
      return;
    }
  }, [brandId, page, size, campaign, campaignInfluencerBudgetModalOpen]);

  useEffect(() => {
    if (
      deleteInfluencerFromCampaignMessage ||
      deleteInfluencerFromCampaignError ||
      updateCampaignInfluencerMessage ||
      updateCampaignInfluencerError ||
      campaignStartMessage ||
      campaignStartError ||
      updateCampaignDetailsMessage ||
      updateCampaignDetailsError
    ) {
      messageApi.open({
        key: "updatable",
        type:
          deleteInfluencerFromCampaignMessage ||
          updateCampaignInfluencerMessage ||
          campaignStartMessage ||
          updateCampaignDetailsMessage
            ? "success"
            : "error",
        content: deleteInfluencerFromCampaignMessage
          ? deleteInfluencerFromCampaignMessage
          : deleteInfluencerFromCampaignError
          ? deleteInfluencerFromCampaignError
          : updateCampaignInfluencerMessage
          ? updateCampaignInfluencerMessage
          : updateCampaignInfluencerError
          ? updateCampaignInfluencerError
          : campaignStartMessage
          ? campaignStartMessage
          : campaignStartError
          ? campaignStartError
          : updateCampaignDetailsMessage
          ? updateCampaignDetailsMessage
          : updateCampaignDetailsError
          ? updateCampaignDetailsError
          : "",
        duration: 3,
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetDeleteInfluencerFromCampaignData());
      dispatch(resetUpdateCampaignInfluencerData());
      dispatch(resetCampaignStartData());
      dispatch(resetCampaignDetailsData());
      dispatch(resetUpdateCampaignInfluencerData());
    } else {
      return;
    }
  }, [
    deleteInfluencerFromCampaignMessage,
    deleteInfluencerFromCampaignError,
    updateCampaignInfluencerMessage,
    updateCampaignInfluencerError,
    campaignStartMessage,
    campaignStartError,
    updateCampaignDetailsMessage,
    updateCampaignDetailsError,
  ]);

  useEffect(() => {
    dispatch(getAddOns());
  }, []);

  useEffect(() => {
    if (addOns) {
      addOns?.data?.filter((addon) => {
        if (addon?.feature?.name === "CampaignAutomation") {
          setAutomationPrice(addon?.unit_price);
          setAutomationId(addon?.feature?.id);
        }
      });
    }
  }, [addOns]);

  useEffect(() => {
    if (campaign) {
      setCampaignStatus(campaign?.status);
    }
  }, [campaign]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        {loading && !campaign && !error ? (
          <Loader color={"#FF5900"} size={50} />
        ) : (
          <></>
        )}
        {!loading && campaign && !error ? (
          <>
            <div className={styles.container_1}>
              <div className={styles.container_1_box_1}>
                <p className="text_large bold">
                  {campaign?.title ? campaign?.title : "--"}
                </p>
                <p className={`text_large bold ${styles.campaign_duration}`}>
                  [Duration]:{" "}
                  {campaign?.start_date && campaign?.end_date
                    ? `${new Date(
                        campaign?.start_date
                      ).toLocaleDateString()} to ${new Date(
                        campaign?.end_date
                      ).toLocaleDateString()}`
                    : "N/A"}
                </p>
              </div>
              {campaign?.status !== "PLANNING" &&
              campaign?.status !== "COMPLETED" ? (
                <>
                  <div className={styles.container_1_box_3}>
                    <p className={`text_small bold`}>change status</p>
                    <Select
                      loading={updateCampaignDetailsLoading}
                      style={{ width: 120 }}
                      options={statusOptions}
                      value={campaignStatus}
                      onChange={(value) => {
                        handleSelect(value);
                      }}
                    />
                    <p className={`text_small bold `}>Change End Date :</p>
                    <Image
                      onClick={() => {
                        setEditCampaignEndDateModalOpen(true);
                      }}
                      src={calender}
                      alt={"calender"}
                      style={{
                        width: "25px",
                        height: "25px",
                      }}
                    />
                  </div>

                  <div className={styles.change_date}></div>
                </>
              ) : (
                <></>
              )}{" "}
              <div className={styles.container_1_box_2}>
                <Link
                  href={{
                    pathname: `/campaigns/createCampaign`,
                    query: { id: campaign?.id },
                  }}
                >
                  <button className={`btn_small btn_primary`}>Edit</button>
                </Link>
              </div>
            </div>
            <div className={styles.container_2}>
              <div className={styles.container_2_box_1}>
                <div className={styles.description_and_scope}>
                  <div className={styles.description}>
                    <p className="text_medium bold">Description</p>
                    <p className="text_small">
                      {campaign?.description ? campaign?.description : "--"}
                    </p>
                  </div>
                  <div className={styles.scope}>
                    <p className={`text_medium bold`}> Scope</p>
                    <p className="text_small">
                      {campaign?.scope ? campaign?.scope : "--"}
                    </p>
                  </div>
                </div>
                <div className={styles.campaign_cards}>
                  <CampaignOverviewCard
                    title={"Total Influencers"}
                    image={GroupProfile}
                    value={campaign?.total_influencers}
                    color={"#ffe9c9"}
                  />
                  <CampaignOverviewCard
                    title={"Participants"}
                    image={GroupProfile}
                    value={campaign?.total_participants}
                    color={"#C9DCFB"}
                  />
                  <CampaignOverviewCard
                    title={"Budget"}
                    image={Budget}
                    value={campaign?.budget}
                    color={"#ece9ff"}
                  />
                  <CampaignOverviewCard
                    title={"Influencers Budget"}
                    image={GroupProfile}
                    value={campaign?.influencers_budget}
                    color={"#ffd2f0"}
                  />
                  <CampaignOverviewCard
                    title={"Platforms"}
                    image={socialmedia}
                    value={campaign?.platforms}
                    color={"#C9DCFB"}
                  />
                  <CampaignOverviewCard
                    title={"Total Posts"}
                    image={TotalPosts}
                    value={campaign?.total_posts}
                    color={"#C9DCFB"}
                  />
                </div>
              </div>
              <div className={styles.container_2_box_2}>
                <Image
                  onClick={() => {
                    setEditCampaignEndDateModalOpen(true);
                  }}
                  src={CampaignAutomation}
                  alt="CampaignAutomation"
                  height={250}
                />

                <div className={styles.campaign_automation}>
                  {is_automated ? (
                    <>
                      <p className={"text_medium"}>
                        This campaign is Automated
                      </p>
                      <div className={styles.campaign_automation_details}>
                        {" "}
                        <p className="text_medium">
                          Please Contact to your Campaign Manager
                        </p>{" "}
                        <Link
                          href={{ pathname: "https://wa.me/+919000134357" }}
                          target="_blank"
                        >
                          <button className={`btn_small btn_primary`}>
                            Call Now
                          </button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      {!is_automated && campaign?.status === "COMPLETED" && (
                        <p className="text_medium">This campaign is ended</p>
                      )}
                      {!is_automated && campaign?.status !== "COMPLETED" && (
                        <>
                          <div className={styles.campaign_automation_btns}>
                            <button
                              className={`btn_medium ${styles.manual_campaign_btn}`}
                              onClick={() => {
                                setManualCampaignInfoModalOpen(true);
                              }}
                              disabled={
                                campaign?.status === "PAUSED" ||
                                campaign?.status === "ACTIVE"
                              }
                            >
                              Start Campaign Manually
                            </button>
                            <button
                              className="btn_medium btn_primary"
                              onClick={() =>
                                setCampaignAutomationInfoModalOpen(true)
                              }
                            >
                              {`Pay ₹ ${automationPrice} + Tax & \n Automate Campaign `}
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.container_3}>
              <div className={styles.container_3_box_1}>
                <div>
                  <p className="text_medium bold">Influencers list</p>
                  <button
                    onClick={() => router.push("/discovery")}
                    className="btn_medium btn_primary"
                  >
                    Add More Influencers
                  </button>
                </div>
                <ConfigProvider
                  renderEmpty={() =>
                    getInfluencersError ? (
                      <Error
                        message={getInfluencersError}
                        errorCode={getInfluencersErrorCode}
                      />
                    ) : (
                      <Empty
                        description={
                          <div>
                            <p>There are no Influencers to display</p>
                            <p
                              onClick={() => {
                                router.push("/discovery");
                              }}
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "blue",
                                fontSize: "16px",
                              }}
                            >
                              Click here to Add Influencers
                            </p>
                          </div>
                        }
                      />
                    )
                  }
                >
                  <Table
                    columns={columns}
                    dataSource={influencers?.result}
                    pagination={false}
                    loading={{
                      indicator: <Loader />,
                      spinning: getInfluencersLoading,
                    }}
                    rowKey={"username"}
                  />
                </ConfigProvider>
                {influencers?.total_records >= size ? (
                  <Pagination
                    dataLength={influencers?.result?.length}
                    lastPage={influencers?.last_page}
                    loading={getInfluencersLoading}
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    totalRecords={influencers?.total_records}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.container_3_box_2}>
                <p className="text_medium bold">Posts</p>
                <CampaignPosts campaignId={id && id} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <StartCampaignManuallyModal
        open={startCampaignManuallyModalOpen}
        setOpen={setStartCampaignManuallyModalOpen}
      />
      <Modal
        title="Notes"
        open={notesModalOpen}
        onCancel={() => {
          setNotesModalOpen(false);
          setNotes("");
        }}
        footer={[]}
      >
        <p className="text_medium">{notes ? notes : "No notes added"}</p>
      </Modal>
      <EditCampaignEndDateModal
        open={editCampaignEndDateModalOpen}
        setOpen={setEditCampaignEndDateModalOpen}
        enddate={campaign?.end_date}
      />
      <ManualCampaignInfoModal
        open={manualCampaignInfoModalOpen}
        setOpen={setManualCampaignInfoModalOpen}
        startCampaignManuallyModalOpen={setStartCampaignManuallyModalOpen}
      />
      <UpdateCampaignInfluencerModal
        open={campaignInfluencerBudgetModalOpen}
        setOpen={setCampaignInfluencerBudgetModalOpen}
        influencer={influencer}
        setInfluencer={setInfluencer}
        campaign={campaign}
      />
      <CampaignAutomationInfoModal
        open={campaignAutomationInfoModalOpen}
        setOpen={setCampaignAutomationInfoModalOpen}
        billingAddressModalOpen={billingAddressModalOpen}
        setBillingAddressModalOpen={setBillingAddressModalOpen}
      />
      <BillingAddressModal
        open={billingAddressModalOpen}
        setOpen={setBillingAddressModalOpen}
        selectedPlanData={null}
        setSelectedPlanData={null}
        featureId={automationId}
        campaignId={id}
        quantity={1}
      />
    </>
  );
};

export default Campaign;
