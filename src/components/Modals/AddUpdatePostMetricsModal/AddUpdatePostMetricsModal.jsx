"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./AddUpdatePostMetricsModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addPostMetrics,
  getPostMetrics,
  updatePostMetrics,
} from "@/store/postmetrics/postmetricsActions";
import Loader from "@/components/Loader/Loader";

const AddUpdatePostMetricsModal = ({
  type,
  open,
  setOpen,
  postId,
  campaignId,
  username,
  loading,
  postMetricData,
}) => {
  const dispatch = useDispatch();
  const { brandId } = useSelector((state) => state.globalVariables);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.views) {
      errors.views = "View is required";
    }
    if (!formData.likes) {
      errors.likes = "Likes is required";
    }
    if (!formData.comments) {
      errors.comments = "Comments is required";
    }
    if (!formData.shares) {
      errors.shares = "Shares is required";
    }
    if (!formData.saves) {
      errors.saves = "Saves is required";
    }
    if (formData.postdatetime === "") {
      errors.postdatetime = "Date and time is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    setOpen(false);
    if (type === "addpostmetrics") {
      setFormData({
        views: "",
        likes: "",
        comments: "",
        shares: "",
        saves: "",
        postdatetime: "",
      });
    }
  };

  const handleAddPostMetrics = () => {
    if (validateForm()) {
      dispatch(
        addPostMetrics({
          brandId: brandId,
          campaignId: campaignId,
          username: username,
          postId: postId,
          views: formData.views,
          likes: formData.likes,
          comments: formData.comments,
          shares: formData.shares,
          saves: formData.saves,
          timestamp: formatPostDate(formData.postdatetime),
        })
      ).then(() => {
        setOpen(false);
        dispatch(
          getPostMetrics({
            brandId: brandId,
            id: campaignId,
            username: username,
            postId: postId,
          })
        );
        setFormData({
          views: "",
          likes: "",
          comments: "",
          shares: "",
          saves: "",
          postdatetime: "",
        });
      });
    }
  };

  const handleUpdatePostMetrics = () => {
    if (validateForm()) {
      dispatch(
        updatePostMetrics({
          brandId: brandId,
          campaignId: campaignId,
          username: username,
          postId: postId,
          metricsId: postMetricData.id,
          views: Number(formData.views),
          likes: Number(formData.likes),
          comments: Number(formData.comments),
          shares: Number(formData.shares),
          saves: Number(formData.saves),
          timestamp: formatPostDate(formData.postdatetime),
        })
      ).then(() => {
        setOpen(false);
        dispatch(
          getPostMetrics({
            brandId: brandId,
            id: campaignId,
            username: username,
            postId: postId,
          })
        );
        setFormData({
          views: "",
          likes: "",
          comments: "",
          shares: "",
          saves: "",
          postdatetime: "",
        });
      });
    }
  };

  const formatPostDate = (postDate) => {
    const apiDatetime = new Date(postDate);

    if (!isNaN(apiDatetime)) {
      const year = apiDatetime.getUTCFullYear();
      const month = String(apiDatetime.getUTCMonth() + 1).padStart(2, "0");
      const day = String(apiDatetime.getUTCDate()).padStart(2, "0");
      const hours = String(apiDatetime.getUTCHours()).padStart(2, "0");
      const minutes = String(apiDatetime.getUTCMinutes()).padStart(2, "0");
      const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
      return formattedDatetime;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (postMetricData) {
      setFormData({
        views: postMetricData.views,
        likes: postMetricData.likes,
        comments: postMetricData.comments,
        shares: postMetricData.shares,
        saves: postMetricData.saves,
        postdatetime: formatPostDate(postMetricData.timestamp),
      });
    }
  }, [postMetricData]);

  return (
    <>
      <div>
        <Modal
          title={
            type === "addpostmetrics"
              ? "Add Post Metrics"
              : "Update Post Metrics"
          }
          open={open}
          maskClosable={false}
          closable={false}
          footer={[
            <div key={"footer"} className={styles.footer}>
              <button
                className={`btn_small btn_secondary`}
                onClick={() => handleCancel()}
                // disabled={loading}
              >
                Cancel
              </button>
              <button
                className={`btn_small btn_primary`}
                onClick={
                  type === "addpostmetrics"
                    ? handleAddPostMetrics
                    : type === "updatepostmetrics"
                    ? handleUpdatePostMetrics
                    : ""
                }
                disabled={loading}
              >
                {loading ? <Loader size={15} color={"white"} /> : "Submit"}
              </button>
            </div>,
          ]}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={styles.container}>
            <div className={`input_controller`}>
              <p>Views</p>
              <input
                type="number"
                min={0}
                name="views"
                placeholder="Views"
                value={formData.views}
                onChange={handleInputChange}
              />
            </div>
            {errors.views && (
              <div className={`validation_error`}>
                <p>{errors.views}</p>
              </div>
            )}
            <div className={`input_controller`}>
              <p>Likes</p>
              <input
                type="number"
                name="likes"
                min={0}
                placeholder="Likes"
                value={formData.likes}
                onChange={handleInputChange}
              />
            </div>
            {errors.likes && (
              <div className={`validation_error`}>
                <p>{errors.likes}</p>
              </div>
            )}
            <div className={`input_controller`}>
              <p>Comments</p>
              <input
                type="number"
                min={0}
                name="comments"
                placeholder="Comments"
                value={formData.comments}
                onChange={handleInputChange}
              />
            </div>
            {errors.comments && (
              <div className={`validation_error`}>
                <p>{errors.comments}</p>
              </div>
            )}
            <div className={`input_controller`}>
              <p>Shares</p>
              <input
                type="number"
                min={0}
                name="shares"
                placeholder="Shares"
                value={formData.shares}
                onChange={handleInputChange}
              />
            </div>
            {errors.shares && (
              <div className={`validation_error`}>
                <p>{errors.shares}</p>
              </div>
            )}
            <div className={`input_controller`}>
              <p>Saves</p>
              <input
                type="number"
                min={0}
                name="saves"
                placeholder="Saves"
                value={formData.saves}
                onChange={handleInputChange}
              />
            </div>
            {errors.saves && (
              <div className={`validation_error`}>
                <p>{errors.saves}</p>
              </div>
            )}
            <div className={`input_controller`}>
              <p>Date and Time</p>
              <input
                type="datetime-local"
                id="postdatetime"
                name="postdatetime"
                value={formData.postdatetime}
                defaultValue={formatPostDate(postMetricData?.timestamp)}
                onChange={handleInputChange}
                required
              />
            </div>
            {errors.postdatetime && (
              <div className={`validation_error`}>
                <p>{errors.postdatetime}</p>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AddUpdatePostMetricsModal;
