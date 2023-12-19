"use client";
import React, { useEffect, useState } from "react";
import styles from "./CampaignCard.module.css";
import tiktok from "../../.../../assets/svgs/tiktok.svg";
import {
  CalendarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  InstagramOutlined,
  PauseCircleOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Popconfirm, Tooltip, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCampaign } from "@/store/campaign/campaignActions";
import { getCampaigns } from "@/store/campaigns/campaignsActions";
import { resetCUDCampaignData } from "@/store/campaign/campaignSlice";
import Image from "next/image";

const CampaignCard = ({ data }) => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const { cudCampaignLoading, cudCampaignMessage, cudCampaignError } =
    useSelector((state) => state.campaign);

  const [campaignId, setCampaignId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const formatTimeAgo = (isoDate) => {
    const currentDate = new Date();
    const providedDate = new Date(isoDate);
    const timeDifference = currentDate - providedDate;
    const secondsAgo = Math.floor(timeDifference / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const monthsAgo = Math.floor(daysAgo / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);
    if (yearsAgo >= 1) {
      return yearsAgo === 1 ? "1 year ago" : yearsAgo + " years ago";
    } else if (monthsAgo >= 1) {
      return monthsAgo === 1 ? "1 month ago" : monthsAgo + " months ago";
    } else if (daysAgo >= 1) {
      return daysAgo === 1 ? "1 day ago" : daysAgo + " days ago";
    } else if (hoursAgo >= 1) {
      return hoursAgo === 1 ? "1 hour ago" : hoursAgo + " hours ago";
    } else if (minutesAgo >= 1) {
      return minutesAgo === 1 ? "1 minute ago" : minutesAgo + " minutes ago";
    } else {
      return secondsAgo === 1 ? "1 second ago" : secondsAgo + " seconds ago";
    }
  };

  function formatViewCount(viewCount) {
    if (viewCount < 1000) {
      return viewCount.toString();
    } else if (viewCount < 1000000) {
      const formatted = (viewCount / 1000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "K"
        : formatted + "K";
    } else if (viewCount < 1000000000) {
      const formatted = (viewCount / 1000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "M"
        : formatted + "M";
    } else {
      const formatted = (viewCount / 1000000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "B"
        : formatted + "B";
    }
  }

  const handleDeleteCampaign = () => {
    dispatch(deleteCampaign({ brandId, campaignId })).then(() => {
      dispatch(getCampaigns({ brandId, pagae: 1, size: 5 }));
      setCampaignId(null);
    });
  };

  useEffect(() => {
    if (cudCampaignMessage || cudCampaignError) {
      messageApi.open({
        type: cudCampaignMessage ? "success" : "error",
        content: cudCampaignMessage ? cudCampaignMessage : cudCampaignError,
        duration: 3,
      });
      dispatch(resetCUDCampaignData());
    }
  }, [cudCampaignMessage, cudCampaignError]);

  return (
    <>
      {contextHolder}
      <div
        className={styles.container}
        style={{ borderColor: data?.is_automated ? "#ff5900" : "" }}
      >
        <div className={styles.box}>
          <p className="text_small" style={{ color: "blue" }}>
            # {data?.id}
          </p>
          <Link
            href={{
              pathname: `/campaigns/${data?.id}`,
            }}
            className={`text_extra_large ${styles.campaign_name}`}
          >
            <Tooltip title={data?.title}>{data?.title}</Tooltip>
          </Link>
        </div>
        <div className={styles.box}>
          <p className="text_small">Status</p>
          <div className={styles.status}>
            {data?.status === "PLANNING" && (
              <CalendarOutlined
                style={{ fontSize: "13px", color: "steelblue" }}
              />
            )}{" "}
            {data?.status === "ACTIVE" && (
              <div
                style={{
                  backgroundColor: "green",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              ></div>
            )}
            {data?.status === "PAUSED" && (
              <PauseCircleOutlined style={{ fontSize: "13px", color: "red" }} />
            )}
            {data?.status === "COMPLETED" && (
              <CheckCircleOutlined
                style={{ fontSize: "13px", color: "blue" }}
              />
            )}
            <p
              className={`${styles.title} text_small ${
                data?.status === "PLANNING"
                  ? `${styles.planning}`
                  : data?.status === "ACTIVE"
                  ? `${styles.active}`
                  : data?.status === "PAUSED"
                  ? `${styles.paused}`
                  : data?.status === "COMPLETED"
                  ? `${styles.completed}`
                  : ""
              }
              }`}
            >
              {data?.status}
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <p className="text_small">Followers Range</p>
          <p className={`${styles.title} text_small`}>
            {!!data?.followers_range_from
              ? formatViewCount(data?.followers_range_from)
              : "null"}{" "}
            -{" "}
            {!!data?.followers_range_to
              ? formatViewCount(data?.followers_range_to)
              : "null"}
          </p>
        </div>
        <div className={styles.box}>
          <p className="text_small">Platforms:</p>
          <div className={styles.icons}>
            {data?.platforms.map((platform) => (
              <div className={styles.icon} key={platform?.id}>
                {platform?.short_name === "yt" ? (
                  <div className={styles.icon}>
                    <YoutubeOutlined
                      style={{
                        fontSize: "18px",
                        color: "#FF0000",
                      }}
                    />
                  </div>
                ) : platform?.short_name === "ig" ? (
                  <div className={styles.icon}>
                    <InstagramOutlined
                      style={{ fontSize: "18px", color: "#FA0352" }}
                    />
                  </div>
                ) : (
                  <div className={styles.icon}>
                    <Image src={tiktok} alt="tiktok" width={16} height={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.box}>
          <p className="text_small">Budget</p>
          <p className={`${styles.title} text_small`}>
            {!!data?.budget ? formatViewCount(data?.budget) : "null"}
          </p>
        </div>
        <div className={styles.box}>
          <p className="text_small">Type</p>
          <p className={`${styles.title} text_small`}>{data?.type?.name}</p>
        </div>
        <div className={styles.box}>
          <p className="text_small">Posted At</p>
          <p className={`${styles.title} text_small`}>
            {formatTimeAgo(data?.createdAt)}
          </p>
        </div>
        <div className={styles.box}>
          <p className="text_small">Actions</p>
          <div className={styles.actions}>
            <Tooltip title="Edit">
              <Link
                href={{
                  pathname: `/campaigns/createcampaign`,
                  query: { id: data?.id },
                }}
              >
                <EditOutlined style={{ color: "blue", fontSize: "17px" }} />
              </Link>
            </Tooltip>
            <Popconfirm
              open={campaignId === data?.id}
              title={"Delete campaign"}
              description={"Are you sure to delete this campaign?"}
              onCancel={() => setCampaignId(null)}
              onConfirm={handleDeleteCampaign}
              placement="topRight"
              okButtonProps={{
                loading: cudCampaignLoading,
                disabled: cudCampaignLoading,
              }}
              cancelButtonProps={{ disabled: cudCampaignLoading }}
            >
              <DeleteOutlined
                style={{ color: "red", fontSize: "17px" }}
                onClick={() => setCampaignId(data?.id)}
              />
            </Popconfirm>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
