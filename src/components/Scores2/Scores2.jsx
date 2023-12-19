import styles from "./Scores2.module.css";
import { Progress, Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import CircularProgessBar from "../CircularProgressBar/CircularProgessBar";

const Scores2 = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <div className={styles.container_1_box_1}>
          <div>
            <CircularProgessBar
              value={influencer.audienceCredibility}
              StrokeColor={"#fe5900"}
              type={"audienceCredibility"}
            />
          </div>
          <div>
            <p className="text_small center text_secondary">
              Audience Credibility
            </p>
            <Tooltip
              title={`The Audience Credibility Score shows the percentage of the audience
            that can be verified as real people while also showing the
            percentage of Fake Followers`}
            >
              <InfoCircleFilled
                style={{ cursor: "pointer", fontSize: "18px", color: "gray" }}
              />
            </Tooltip>
          </div>
        </div>
        <div className={styles.container_1_box_2}>
          <div>
            <CircularProgessBar
              value={influencer?.paidPostPerformance}
              StrokeColor={"#ff9c66"}
              type={"paidPostPerformance"}
            />
          </div>
          <div>
            <p className="text_small  center text_secondary">
              Paid Post Performance
            </p>
            <Tooltip
              title={`Paid Post Performance Score represents the performance of the
            sponsored posts in the influencer's profile. This helps to analyse
            or predict how upcoming sponsored posts could perform`}
            >
              <InfoCircleFilled
                style={{ cursor: "pointer", fontSize: "18px", color: "gray" }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={styles.container_2}>
        <div className={styles.likes_to_comments_ratio}>
          <p className="text_small  center text_secondary">
            Likes To Comments Ratio
          </p>
          <p className="text_medium bold center ">
            {influencer?.likesToCommentsRatio}
          </p>
        </div>
        <div className={styles.audience_reachability}>
          <div>
            <Progress
              type="circle"
              percent={influencer?.audienceReachability?.value}
              strokeColor={"#fe5900"}
              strokeWidth={10}
              format={(percent) => `${Math.round(percent)}%`}
              size={70}
            />
          </div>
          <p className="text_small  text_secondary">Audience Reachability</p>
        </div>
        <div className={styles.estimated_post_price}>
          <p className="text_small text_secondary">Estimated Post Price</p>
          <p className="text_medium bold">{`${influencer?.estimatedPostPrice?.from} to ${influencer?.estimatedPostPrice?.to}`}</p>
        </div>
        <div className={styles.estimated_story_price}>
          <p className="text_small text_secondary">Estimated Story Price</p>
          <p className="text_medium bold">{`${influencer?.estimatedStoryPrice?.from} to ${influencer?.estimatedStoryPrice?.to}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Scores2;
