"use client";
import React, { useEffect, useState } from "react";
import styles from "./PostMetrics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostById } from "@/store/posts/postsActions";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  getPostMetrics,
  removePostMetrics,
} from "@/store/postmetrics/postmetricsActions";
import {
  ConfigProvider,
  Empty,
  Popconfirm,
  Table,
  Tooltip,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  resetAddPostMetricsData,
  resetUpdatePostMetricsData,
} from "@/store/postmetrics/postmetricsSlice";
import InstagramPost from "@/components/InstagramPost/InstagramPost";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import AddUpdatePostMetricsModal from "@/components/Modals/AddUpdatePostMetricsModal/AddUpdatePostMetricsModal";

const PostMetrics = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { id } = useParams();
  const username = useSearchParams().get("username");
  const postId = useSearchParams().get("postId");
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const [metricId, setMetricId] = useState(null);

  const { deletePostLoading } = useSelector((state) => state.posts);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeletePost = (record) => {
    dispatch(
      removePostMetrics({
        brandId: brandId,
        campaignId: id,
        username: username,
        postId: postId,
        metricsId: record?.id,
      })
    ).then(() => {
      dispatch(
        getPostMetrics({
          brandId: brandId,
          id: id,
          username: username,
          postId: postId,
        })
      );
    });
  };

  const { brandId } = useSelector((state) => state.globalVariables);

  const [addPostMetricsModalopen, setAddPostMetricsModalopen] = useState(false);
  const [updatePostMetricsModalopen, setUpdatePostMetricsModalopen] =
    useState(false);

  const [postMetricData, setPostMetricData] = useState(null);

  const { getPostLoading, getPost, getPostMessage } = useSelector(
    (state) => state.posts
  );

  const {
    postMetricsLoading,
    postMetrics,
    postMetricsError,
    addPostMetricsLoading,
    addPostMetricsMessage,
    addPostMetricsError,
    updatePostMetricsLoading,
    updatePostMetricsMessage,
    updatePostMetricsError,
    removePostMetricsLoading,
    removePostMetricsMessage,
    removePostMetricsError,
  } = useSelector((state) => state.postmetrics);

  const handleUpdatePostMetrics = (record) => {
    setUpdatePostMetricsModalopen(true);
    setPostMetricData(record);
  };

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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Views",
      dataIndex: "views",
      width: 150,
      key: "views",
      render: (text) => (
        <p style={{ color: "#666464" }}>{formatViewCount(text)}</p>
      ),
    },
    {
      title: "Likes",
      dataIndex: "likes",
      width: 150,
      key: "likes",
      render: (text) => (
        <p style={{ color: "#666464" }}>{formatViewCount(text)}</p>
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      width: 150,
      key: "comments",
      render: (text) => (
        <p style={{ color: "#666464" }}>{formatViewCount(text)}</p>
      ),
    },
    {
      title: "Shares",
      dataIndex: "shares",
      width: 150,
      key: "shares",
      render: (text) => (
        <p style={{ color: "#666464" }}>{formatViewCount(text)}</p>
      ),
    },

    {
      title: "Posted Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toLocaleString()}</p>
      ),
      width: 250,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (_, record) => {
        return (
          <>
            <div style={{ display: "flex", gap: "10px" }}>
              <Tooltip title="Update">
                <EditOutlined
                  className={styles.edit}
                  onClick={() => handleUpdatePostMetrics(record)}
                />
              </Tooltip>

              <Popconfirm
                open={metricId === record?.id}
                title={"Delete Post Metrics?"}
                description={
                  "Are you sure you want to delete this Post Metrics?"
                }
                onCancel={() => setMetricId(null)}
                onConfirm={() => handleDeletePost(record)}
                placement="topRight"
                okButtonProps={{
                  loading: deletePostLoading,
                  disabled: deletePostLoading,
                }}
                cancelButtonProps={{ disabled: deletePostLoading }}
              >
                <DeleteOutlined
                  className={styles.delete}
                  onClick={() => setMetricId(record?.id)}
                />
              </Popconfirm>
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getPostMetrics({ brandId, id, username, postId, size, page }));
    dispatch(fetchPostById({ brandId, postId, id }));
  }, []);

  useEffect(() => {
    if (
      addPostMetricsMessage ||
      addPostMetricsError ||
      updatePostMetricsMessage ||
      updatePostMetricsError ||
      removePostMetricsMessage ||
      removePostMetricsError
    ) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content:
          (addPostMetricsMessage && addPostMetricsMessage) ||
          (addPostMetricsError && addPostMetricsError) ||
          (updatePostMetricsMessage && updatePostMetricsMessage) ||
          (updatePostMetricsError && updatePostMetricsError) ||
          (removePostMetricsMessage && removePostMetricsMessage) ||
          (removePostMetricsError && removePostMetricsError),
        duration: 3,
        icon:
          addPostMetricsMessage ||
          updatePostMetricsMessage ||
          removePostMetricsMessage ? (
            <CheckCircleOutlined
              style={{ color: "#ff5900", fontSize: "16px" }}
            />
          ) : (
            <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
          ),
        style: {
          fontSize: "16px",
        },
      });
      if (
        addPostMetricsMessage ||
        addPostMetricsError ||
        updatePostMetricsMessage ||
        updatePostMetricsError ||
        removePostMetricsMessage ||
        removePostMetricsError
      ) {
        dispatch(resetAddPostMetricsData());
        dispatch(resetUpdatePostMetricsData());
      }
    }
  }, [
    addPostMetricsMessage,
    addPostMetricsError,
    updatePostMetricsMessage,
    updatePostMetricsError,
    removePostMetricsMessage,
    removePostMetricsError,
  ]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.post_card_a_metrics}>
          <div className={styles.post_card}>
            {!getPostLoading && getPost && getPost?.link && (
              <InstagramPost url={getPost && getPost?.link} />
            )}
          </div>

          <div className={styles.post_metrics}>
            <div className={styles.post_data}>
              <p className={styles.table_top}>
                <span>Post Title: </span>
                <span> {getPost?.title}</span>
              </p>
              {/* <p className={styles.table_top}>
                <span> Post Date : </span>
                <span> {formatTimeAgo(getPost?.postDate)}</span>
              </p> */}
            </div>

            {postMetricsLoading && <Loader />}

            {!postMetricsLoading && !postMetricsError && (
              <div className={styles.postmetrics_table}>
                <ConfigProvider
                  renderEmpty={() => (
                    <Empty
                      description={
                        <div>
                          <p>There are no post metrics to display</p>
                          <span
                            onClick={() => setAddPostMetricsModalopen(true)}
                            style={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              color: "blue",
                              fontSize: "16px",
                              fontWeight: "200",
                            }}
                          >
                            Click here to add post metrics
                          </span>
                        </div>
                      }
                    />
                  )}
                >
                  <Table
                    columns={columns}
                    dataSource={postMetrics?.data}
                    bordered
                    pagination={false}
                    title={() => (
                      <>
                        <div className={styles.postmetrics_title_btn}>
                          <p>Post Metrics</p>
                          <button
                            className={`btn_primary btn_small`}
                            onClick={() => setAddPostMetricsModalopen(true)}
                          >
                            Add Post Metrics
                          </button>
                        </div>
                      </>
                    )}
                  />
                  {postMetrics?.data?.length > 5 && (
                    <Pagination
                      page={page}
                      setPage={setPage}
                      size={size}
                      setSize={setSize}
                      loading={postMetricsLoading}
                      dataLength={postMetrics?.data?.length}
                      totalRecords={postMetrics?.total_records}
                      lastPage={postMetrics?.last_page}
                    />
                  )}
                </ConfigProvider>
              </div>
            )}

            <div>
              <AddUpdatePostMetricsModal
                type={"addpostmetrics"}
                open={addPostMetricsModalopen}
                setOpen={setAddPostMetricsModalopen}
                loading={addPostMetricsLoading}
                postId={postId}
                campaignId={id}
                username={username}
              />
            </div>

            <div>
              <AddUpdatePostMetricsModal
                type={"updatepostmetrics"}
                open={updatePostMetricsModalopen}
                setOpen={setUpdatePostMetricsModalopen}
                loading={updatePostMetricsLoading}
                postMetricData={postMetricData}
                postId={postId}
                campaignId={id}
                username={username}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostMetrics;

// export async function getServerSideProps(context) {
//   const { username, postId, id } = context.query;
//   return {
//     props: { username, postId, id },
//   };
// }
