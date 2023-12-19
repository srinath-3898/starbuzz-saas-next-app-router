import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from "@ant-design/icons";
import styles from "./Pagination.module.css";
import { Tooltip } from "antd";
const Pagination = ({
  page,
  setPage,
  size,
  setSize,
  lastPage,
  loading,
  totalRecords,
  dataLength,
  resultsPerPage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <p className="text_small">Size per page</p>
        <select
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
            setPage(1);
          }}
        >
          <option value="5">5</option>

          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
      {resultsPerPage ? (
        ""
      ) : (
        <div className={styles.container_2}>
          <p className="text_small">{`Showing ${page * size - size + 1} to ${
            page * size - (size - dataLength)
          } results of ${totalRecords} ${
            totalRecords > 1 ? "results" : "result"
          }`}</p>
        </div>
      )}

      <div className={styles.container_3}>
        <Tooltip title="First Page">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(1)}
            className={styles.pagination_button}
          >
            <VerticalRightOutlined
              style={{ color: loading || page === 1 ? "#cccccc" : "#fe5900" }}
            />
          </button>
        </Tooltip>
        <Tooltip title="Previous Page">
          <button
            className={styles.pagination_button}
            onClick={() => {
              setPage(page - 1);
            }}
            disabled={page === 1 || loading}
          >
            <LeftOutlined
              style={{ color: loading || page === 1 ? "#cccccc" : "#fe5900" }}
            />
          </button>
        </Tooltip>
        <p className="text_small">
          {page} / {lastPage}
        </p>
        <Tooltip title="Next Page">
          <button
            className={styles.pagination_button}
            onClick={() => setPage(page + 1)}
            disabled={page === lastPage || loading || page > lastPage}
          >
            <RightOutlined
              style={{
                color:
                  loading || page === lastPage || page > lastPage
                    ? "#cccccc"
                    : "#fe5900",
              }}
            />
          </button>
        </Tooltip>
        <Tooltip title="Last Page">
          <button
            className={styles.pagination_button}
            onClick={() => setPage(lastPage)}
            disabled={page === lastPage || loading || page > lastPage}
          >
            <VerticalLeftOutlined
              style={{
                color:
                  loading || page === lastPage || page > lastPage
                    ? "#cccccc"
                    : "#fe5900",
              }}
            />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Pagination;
