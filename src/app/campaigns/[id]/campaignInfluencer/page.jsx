"use client";
import {
  addPost,
  deletePost,
  fetchPostsByCampaignInfluencer,
  updatePost,
} from "@/store/posts/postsActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfigProvider,
  Empty,
  Image,
  Popconfirm,
  Table,
  Tooltip,
  message,
} from "antd";
import styles from "./CampaignInfluencer.module.css";
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import {
  resetDeletPostData,
  resetUpdatePostData,
} from "@/store/posts/postsSlice";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import AddPostModal from "@/components/Modals/AddPostModal/AddPostModal";
import { useParams, useSearchParams } from "next/navigation";

const CampaignInfluencer = () => {
  const dispatch = useDispatch();

  const username = useSearchParams().get("username");
  const { id } = useParams();
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    postsByCampaignInfluencerLoading,
    postsByCampaignInfluencer,
    postsByCampaignInfluencerError,
    addPostMessage,
    addPostError,
    updatePostMessage,
    updatePostError,
    deletPostLoading,
    deletePostMessage,
    deletePostError,
  } = useSelector((state) => state.posts);

  const [isCopied, setIsCopied] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [post, setPost] = useState({ title: "", link: "", postDate: "" });
  const [postId, setPostId] = useState(null);
  const [addPostModalopen, setAddPostModalopen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCopy = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleAddPostModalCancel = () => {
    setPost({ title: "", link: "", postDate: "", type: "" });
    setAddPostModalopen(false);
  };

  const handleAddPost = () => {
    dispatch(
      addPost({
        brandId,
        campaignId: id,
        username,
        title: post.title,
        link: post.link,
        postDate: post.postDate,
        postType: post?.postType,
      })
    ).then(() => {
      setPost({ title: "", link: "", postDate: "" });
      dispatch(
        fetchPostsByCampaignInfluencer({
          brandId,
          campaignId: id,
          username,
          size,
          page: page,
        })
      );
    });
  };

  const handleEditPost = () => {
    dispatch(
      updatePost({
        brandId,
        campaignId: id,
        username,
        id: post?.id,
        title: post?.title,
        link: post?.link,
        postDate: post?.postDate,
        postType: post?.postType,
      })
    ).then(() => {
      dispatch(
        fetchPostsByCampaignInfluencer({
          brandId,
          campaignId: id,
          username,
          size,
          page: page,
        })
      );
    });
  };

  const handleDeletePost = () => {
    dispatch(
      deletePost({
        brandId: brandId,
        id: id,
        username: username,
        postId: post?.id,
      })
    ).then(() => {
      setPost({ title: "", link: "", postDate: "" });
      dispatch(
        fetchPostsByCampaignInfluencer({
          brandId: brandId,
          campaignId: id,
          username: username,
          size,
          page,
        })
      );
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          href={{
            pathname: `/campaigns/${id}/campaignInfluencer/postMetrics`,
            query: { postId: record?.id, username: username },
          }}
        >
          {text}
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

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toDateString()}</p>
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (link) => (
        <div className={styles.post_link}>
          <Tooltip title={isCopied ? "Copied" : "Copy Link"}>
            <CopyOutlined
              style={{ fontSize: 17 }}
              onClick={() => handleCopy(link)}
            />
          </Tooltip>
          <Link href={link} target="_blank">
            {link}
          </Link>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => {
        return (
          <div className={styles.post_actions}>
            <Tooltip title="Update">
              <EditOutlined
                style={{ color: "blue", fontSize: 17 }}
                onClick={() => {
                  setPost(record);
                  setAddPostModalopen(true);
                }}
              />
            </Tooltip>
            <Popconfirm
              open={record?.id === postId}
              title="Delete post"
              description="Are you sure to delete this post?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeletePost}
              onCancel={() => setPostId(null)}
              okButtonProps={{
                loading: deletPostLoading,
                disabled: deletPostLoading,
              }}
              cancelButtonProps={{ disabled: deletPostLoading }}
              placement="topRight"
            >
              <DeleteOutlined
                style={{ color: "red", fontSize: 17 }}
                onClick={() => setPostId(record?.id)}
              />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      fetchPostsByCampaignInfluencer({
        brandId: brandId,
        campaignId: id,
        username: username,
        size: size,
        page: page,
      })
    );
  }, [page, size]);

  useEffect(() => {
    if (
      addPostMessage ||
      addPostError ||
      updatePostMessage ||
      updatePostError ||
      deletePostMessage ||
      deletePostError
    ) {
      messageApi.open({
        key: "updatable",
        type:
          addPostMessage || updatePostMessage || deletePostMessage
            ? "success"
            : "error",
        content: addPostMessage
          ? addPostMessage
          : addPostError
          ? addPostError
          : updatePostMessage
          ? updatePostMessage
          : updatePostError
          ? updatePostError
          : deletePostMessage
          ? deletePostMessage
          : deletePostError,
        duration: 3,
      });
      dispatch(resetUpdatePostData());
      dispatch(resetUpdatePostData());
      dispatch(resetDeletPostData());
    }
  }, [
    addPostMessage,
    addPostError,
    updatePostMessage,
    updatePostError,
    deletePostMessage,
    deletePostError,
  ]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        {postsByCampaignInfluencerLoading &&
        !postsByCampaignInfluencer &&
        page === 1 &&
        !postsByCampaignInfluencerError ? (
          <Loader size={50} />
        ) : (
          <></>
        )}
        {postsByCampaignInfluencer && !postsByCampaignInfluencerError ? (
          <>
            <div className={styles.container_1}>
              <Image
                src={postsByCampaignInfluencer?.influencer?.avatar_url}
                height={200}
                width={200}
                alt="Influencer Profile pic"
                fallback="data:image/png;base64,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"
                style={{ borderRadius: "50%" }}
              />
              <div className={styles.container_1_box_1}>
                <p className="text_extra_large bold">
                  {postsByCampaignInfluencer?.influencer?.full_name}
                </p>
                <Link
                  href={`https://www.instagram.com/${username}/`}
                  target="_blank"
                  className="text_medium"
                >
                  @{postsByCampaignInfluencer?.influencer?.username}
                  <ExportOutlined />
                </Link>
              </div>
            </div>
            <div className={styles.posts}>
              <div className={styles.posts_container_1}>
                <p className="text_small bold">
                  Posts by {postsByCampaignInfluencer?.influencer?.username}
                </p>
                <button
                  className="btn_small btn_primary"
                  onClick={() => setAddPostModalopen(true)}
                >
                  Add Post
                </button>
              </div>
              <ConfigProvider
                renderEmpty={() => (
                  <Empty description={<p>There are no posts to display</p>} />
                )}
              >
                <Table
                  columns={columns}
                  dataSource={postsByCampaignInfluencer?.data}
                  pagination={false}
                  loading={{
                    indicator: <Loader />,
                    spinning: postsByCampaignInfluencerLoading,
                  }}
                  scroll={{ y: 300 }}
                  rowKey={"id"}
                />
                {postsByCampaignInfluencer?.total_records > size ? (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    lastPage={postsByCampaignInfluencer?.last_page}
                    loading={postsByCampaignInfluencerLoading}
                    totalRecords={postsByCampaignInfluencer?.total_records}
                    dataLength={postsByCampaignInfluencer?.data?.length}
                  />
                ) : (
                  <></>
                )}
              </ConfigProvider>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <AddPostModal
        open={addPostModalopen}
        post={post}
        setPost={setPost}
        handleCancel={handleAddPostModalCancel}
        handleSubmit={post?.id ? handleEditPost : handleAddPost}
      />
    </>
  );
};

export default CampaignInfluencer;
