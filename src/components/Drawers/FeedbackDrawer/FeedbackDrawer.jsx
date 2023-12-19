import React, { useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  FrownOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Drawer, Slider, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "@/store/feedback/feedbackActions";
import styles from "./FeedbackDrawer.module.css";
import { resetFeedBackData } from "@/store/feedback/feedbackSlice";
import Loader from "@/components/Loader/Loader";

const FeedbackDrawer = ({ feedbackDrawerOpen, setFeedbackDrawerOpen }) => {
  const dispatch = useDispatch();

  const {
    loading,
    message: feedbackMessage,
    error,
  } = useSelector((state) => state.feedback);

  const [convenience, setConvenience] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [suggestions, setSuggestions] = useState("");
  const [performance, setPerformance] = useState(false);
  const [experience, setExperience] = useState(0);
  const [mid, setMid] = useState(2.5);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmitFeedback = () => {
    dispatch(
      submitFeedback({
        accuracy: accuracy,
        convenience: convenience,
        issues: performance,
        suggestions: suggestions,
        experience: experience,
      })
    ).then(() => {
      setConvenience(0);
      setAccuracy(0);
      setSuggestions("");
      setExperience(0);
      setFeedbackDrawerOpen(false);
    });
  };

  useEffect(() => {
    if (feedbackMessage || error) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: feedbackMessage ? "Thank you for your feedback" : error,
        duration: 3,
        icon: feedbackMessage ? (
          <CheckCircleOutlined style={{ color: "#ff5900", fontSize: "16px" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
    }
    dispatch(resetFeedBackData());
  }, [feedbackMessage]);
  return (
    <Drawer
      title="Feedback"
      placement="right"
      closable={true}
      onClose={() => setFeedbackDrawerOpen(false)}
      open={feedbackDrawerOpen}
      size="large"
    >
      {!error && (
        <>
          {contextHolder}
          <div className={styles.container}>
            <div className={styles.sub_container}>
              <div className={styles.item}>
                <p className={`text_medium bold ${styles.text_color}`}>
                  How convenient is it for you to use the software ?
                </p>
                <div className={styles.slider}>
                  <FrownOutlined
                    style={{
                      fontSize: "25px",
                      color:
                        convenience >= mid ? "rgba(0, 0, 0, 0.25)" : "black",
                    }}
                  />
                  <div className={styles.box_1}>
                    <Slider
                      min={0}
                      max={5}
                      value={convenience}
                      onChange={(value) => setConvenience(value)}
                    />
                  </div>
                  <SmileOutlined
                    style={{
                      fontSize: "25px",
                      color:
                        convenience <= mid ? "rgba(0, 0, 0, 0.25)" : "#ff5900",
                    }}
                  />
                </div>
                <div className={styles.score}>
                  <p className={`text_medium bold ${styles.text_color_2}`}>
                    {convenience} of 5
                  </p>
                </div>
              </div>
              <div>
                <p className={`text_medium bold ${styles.text_color}`}>
                  How accurate were the results of your search ?
                </p>
                <div className={styles.slider}>
                  <FrownOutlined
                    style={{
                      fontSize: "25px",
                      color: accuracy >= mid ? "rgba(0, 0, 0, 0.25)" : "black",
                    }}
                  />
                  <div className={styles.box_1}>
                    <Slider
                      min={0}
                      max={5}
                      value={accuracy}
                      onChange={(value) => setAccuracy(value)}
                    />
                  </div>
                  <SmileOutlined
                    style={{
                      fontSize: "25px",
                      color:
                        accuracy <= mid ? "rgba(0, 0, 0, 0.25)" : "#ff5900",
                    }}
                  />
                </div>
                <div className={styles.score}>
                  <p className={`text_medium bold ${styles.text_color_2}`}>
                    {accuracy} of 5
                  </p>
                </div>
              </div>
              <div className={styles.performance}>
                <p className={`text_medium bold ${styles.text_color}`}>
                  Did you experience any performance issues or delays while
                  using the platform?
                </p>
                <div>
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      name="performance"
                      id="yes"
                      onChange={() => setPerformance(true)}
                      checked={performance}
                    />
                    <label
                      htmlFor="yes"
                      className={`text_small ${styles.text_color_2}`}
                    >
                      Yes
                    </label>
                  </div>
                  <div className={styles.radio}>
                    <input
                      type="radio"
                      name="performance"
                      id="no"
                      onChange={() => setPerformance(false)}
                      checked={!performance}
                    />
                    <label
                      htmlFor="no"
                      className={`text_small ${styles.text_color_2}`}
                    >
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p className={`text_medium bold ${styles.text_color}`}>
                  Would you like to give any suggestions/ improvements ?
                </p>
                <p className={`text-extra-small ${styles.text_color_1}`}>
                  (Feel free to share any ideas, such as filters you would like
                  us to add or any features that would enhance the overall
                  polish of the product...)
                </p>
                <textarea
                  className={styles.suggestions}
                  placeholder="Please provide any suggestions"
                  onChange={(event) => setSuggestions(event.target.value)}
                  value={suggestions}
                ></textarea>
              </div>

              <div>
                <p className={`text_medium bold ${styles.text_color}`}>
                  How would you rate your overall experience using our SaaS
                  platform?
                </p>
                <div className={styles.slider}>
                  <FrownOutlined
                    style={{
                      fontSize: "25px",
                      color:
                        experience >= mid ? "rgba(0, 0, 0, 0.25)" : "black",
                    }}
                  />
                  <div className={styles.box_1}>
                    <Slider
                      min={0}
                      max={5}
                      value={experience}
                      onChange={(value) => setExperience(value)}
                    />
                  </div>
                  <SmileOutlined
                    style={{
                      fontSize: "25px",
                      color:
                        experience <= mid ? "rgba(0, 0, 0, 0.25)" : "#ff5900",
                    }}
                  />
                </div>
                <div className={styles.score}>
                  <p className={`text_medium bold ${styles.text_color_2}`}>
                    {experience} of 5
                  </p>
                </div>
              </div>
            </div>
            <button
              className={`btn_medium ${styles.submit_btn}`}
              onClick={handleSubmitFeedback}
              disabled={loading}
            >
              {loading ? <Loader color={"white"} size={16} /> : "Submit"}
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default FeedbackDrawer;
