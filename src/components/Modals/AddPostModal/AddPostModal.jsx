"use client";
import React, { useState } from "react";
import styles from "./AddPostModal.module.css";
import { Modal, Select } from "antd";
import { useSelector } from "react-redux";
import { CloseCircleFilled } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";

const AddPostModal = ({ open, post, setPost, handleCancel, handleSubmit }) => {
  const { addPostLoading, updatePostLoading } = useSelector(
    (state) => state.posts
  );
  const [errors, setErrors] = useState({});

  const options = [
    {
      label: "IMAGE",
      value: "IMAGE",
    },
    {
      label: "STORY",
      value: "STORY",
    },
    {
      label: "VIDEO",
      value: "VIDEO",
    },
  ];

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: null }));
  };

  const validate = () => {
    const errors = {};
    if (!post.title) {
      errors.title = "Title is required";
    }
    if (!post.postType) {
      errors.postType = "Post type is required";
    }
    if (!post.link) {
      errors.link = "Link is required";
    }
    if (!post.postDate) {
      errors.postDate = "Post date is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  return (
    <Modal
      open={open}
      title={post?.id ? "Edit post" : "Add post"}
      onCancel={handleCancel}
      centered
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_small btn_secondary"
            onClick={handleCancel}
            disabled={addPostLoading || updatePostLoading}
          >
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={() => (validate() ? handleSubmit() : null)}
            disabled={addPostLoading || updatePostLoading}
          >
            {addPostLoading || updatePostLoading ? (
              <Loader size={17} color="#ffffff" />
            ) : post?.id ? (
              "Edit"
            ) : (
              "Add"
            )}
          </button>
        </div>,
      ]}
    >
      <div className={styles.container}>
        <div className="input_controller">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Post title"
            name="title"
            value={post?.title}
            onChange={(event) => {
              errors.title = "";
              setPost((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          {errors?.title && (
            <div className={`validation_error`}>
              <p>{errors.title}</p>
              <p onClick={() => handleCloseError("title")}>
                <CloseCircleFilled style={{ fontSize: "10px" }} />
              </p>
            </div>
          )}
        </div>
        <div className="input_controller">
          <label htmlFor="type">Post Type</label>
          <Select
            options={options}
            value={post?.postType}
            onChange={(value) => {
              errors.postType = "";
              setPost((prevState) => ({ ...prevState, ["postType"]: value }));
            }}
          />
          {errors?.postType && (
            <div className={`validation_error`}>
              <p>{errors.postType}</p>
              <p onClick={() => handleCloseError("postType")}>
                <CloseCircleFilled style={{ fontSize: "10px" }} />
              </p>
            </div>
          )}
        </div>
        <div className="input_controller">
          <label htmlFor="post_link">Post Link</label>
          <input
            id="post_link"
            type="text"
            placeholder="Post link"
            name="link"
            value={post?.link}
            onChange={(event) => {
              errors.link = "";
              setPost((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          {errors?.link && (
            <div className={`validation_error`}>
              <p>{errors.link}</p>
              <p onClick={() => handleCloseError("link")}>
                <CloseCircleFilled style={{ fontSize: "10px" }} />
              </p>
            </div>
          )}
        </div>
        <div className="input_controller">
          <label htmlFor="post_date">Post Date</label>
          <input
            id="post_date"
            type="datetime-local"
            name="postDate"
            value={
              post?.postDate
                ? new Date(post?.postDate)?.toISOString().slice(0, 16)
                : ""
            }
            onChange={(event) => {
              errors.postDate = "";
              setPost((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
              }));
            }}
          />
          {errors?.postDate && (
            <div className={`validation_error`}>
              <p>{errors.postDate}</p>
              <p onClick={() => handleCloseError("postDate")}>
                <CloseCircleFilled style={{ fontSize: "10px" }} />
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddPostModal;
