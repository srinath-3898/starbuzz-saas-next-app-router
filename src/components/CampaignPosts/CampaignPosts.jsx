"use client";
import React, { useEffect, useState } from "react";
import styles from "./CampaignPosts.module.css";
import { ConfigProvider, Empty, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByCampaign } from "@/store/posts/postsActions";
import Link from "next/link";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const CampaignPosts = ({ campaignId }) => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const { postsByCampaignLoading, postsByCampaign } = useSelector(
    (state) => state.posts
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (text, record) => {
        return (
          <Link
            href={{
              pathname: `/campaigns/${record?.id}/campaignInfluencer/postMetrics`,
              query: {
                id: campaignId,
                postId: record?.id,
                username: record?.influencer?.username,
              },
            }}
          >
            {record?.title}
          </Link>
        );
      },
    },
    {
      title: "Type",
      key: "postType",
      align: "center",
      render: (text, record) => {
        let statusClassName = "";
        switch (record.postType) {
          case "IMAGE":
            statusClassName = styles.image;
            break;
          case "VIDEO":
            statusClassName = styles.video;
            break;
          case "STORY":
            statusClassName = styles.story;
            break;
          default:
            statusClassName = styles.default_status;
            break;
        }
        return (
          <p className={`${statusClassName} ${styles.type}`}>
            {record?.postType}
          </p>
        );
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link
          href={`https://www.instagram.com/${record?.influencer?.username}`}
          target="_blank"
        >
          {record?.influencer?.username}
        </Link>
      ),
    },
    {
      title: "Posted Date",
      dataIndex: "postDate",
      key: "postDate",

      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toDateString()}</p>
      ),
    },
  ];

  useEffect(() => {
    dispatch(
      fetchPostsByCampaign({
        brandId: brandId,
        campaignId: campaignId,
        page: page,
        size: size,
      })
    );
  }, [page, size, brandId, campaignId]);
  return (
    <>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description={<p>There are no Posts to display</p>} />
        )}
      >
        <Table
          dataSource={postsByCampaign?.data}
          columns={columns}
          pagination={false}
          loading={{
            indicator: <Loader size={"30px"} />,
            spinning: postsByCampaignLoading,
          }}
        />
      </ConfigProvider>
      {postsByCampaign?.total_records > size ? (
        <Pagination
          page={page}
          setPage={setPage}
          size={size}
          setSize={setSize}
          dataLength={postsByCampaign?.data?.length}
          loading={postsByCampaignLoading}
          lastPage={postsByCampaign?.last_page}
          totalRecords={postsByCampaign?.total_records}
          resutsPerPage={true}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default CampaignPosts;
