import Image from "next/image";
import styles from "./Scores1.module.css";
import message from "../../assets/svgs/message.svg";
import like from "../../assets/svgs/like.svg";
import { Tooltip } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import CircularProgessBar from "../CircularProgressBar/CircularProgessBar";
import Link from "next/link";

const Scores1 = ({ influencer }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <Image src={influencer?.profilePic} alt="" width={200} height={200} />
      </div>
      <div className={styles.container_2}>
        <Link href={`https://www.instagram.com/${influencer?.username}/`}>
          <p className="text_medium bold">{influencer.fullName}</p>
        </Link>

        <div className={styles.container_2_box_1}>
          <div>
            <p className="text_small bold">{influencer.followersCount}</p>
            <p className="text_small">Followers</p>
          </div>
          <div>
            <p className="text_small bold">{`${influencer.er} ${"%"}`}</p>
            <p className="text_small">Engagement Rate</p>
          </div>
        </div>
        <div className={styles.container_2_box_2}>
          <div>
            <Image src={message} alt="" />
            <p className="text_small bold">{influencer.avgComments}</p>
            <p className="text_small">Avg.Comments</p>
          </div>
          <div>
            <Image src={like} alt="" />
            <p className="text_small bold">{influencer.avgLikes}</p>
            <p className="text_small">Avg.Likes</p>
          </div>
        </div>
      </div>
      <div className={styles.container_3}>
        <div>
          <CircularProgessBar
            value={influencer.sbScore}
            StrokeColor={"#fe5900"}
          />
        </div>
        <div className={styles.container_3_box_2}>
          <p className="text_small bold center">SB Score</p>
          <Tooltip
            title={` Starbuzz Score is a unique metric calculated on the basis of all the
            other scores. This score represents the overall quality of an
            influencer's profile.`}
          >
            <InfoCircleFilled
              style={{ cursor: "pointer", fontSize: "18px", color: "gray" }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.container_4}>
        <div>
          <CircularProgessBar
            value={influencer.consistencyScore}
            StrokeColor={"#ff9c66"}
            type={"consistencyScore"}
          />
        </div>
        <div className={styles.container_4_box_2}>
          <p className="text_small bold center">Consistency Score</p>
          <Tooltip
            title={`Consistent Score signifies how consistent the influencer is in
            posting his/her content. The higher the score, the better.`}
          >
            <InfoCircleFilled
              style={{ cursor: "pointer", fontSize: "18px", color: "gray" }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Scores1;
