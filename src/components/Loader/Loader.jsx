import styles from "./Loader.module.css";
import { LoadingOutlined } from "@ant-design/icons";

const Loader = ({ size = 20, color = "#fe5900" }) => {
  return (
    <div className={styles.loader}>
      <LoadingOutlined style={{ fontSize: size, color: color }} />
    </div>
  );
};

export default Loader;
