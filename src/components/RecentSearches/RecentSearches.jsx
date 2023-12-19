"use client";
import styles from "./RecentSearches.module.css";
import { useDispatch, useSelector } from "react-redux";
import Error from "../Error/Error";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Skeleton } from "antd";
import { getRecentSearch } from "@/store/discovery/discoveryActions";
import {
  getInstagramRecentSearches,
  getYoutubeRecentSearches,
} from "@/store/recentSearches/recentSearchesActions";

const RecentSearches = ({ isInstagram }) => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading,
    instagramRecentSearches,
    youtubeRecentSearches,
    error,
    errorCode,
  } = useSelector((state) => state.recentSearches);

  const handleRecentSearchClick = (recentSearchId) => {
    dispatch(getRecentSearch({ brandId, recentSearchId }));
  };

  useEffect(() => {
    if (isInstagram) {
      dispatch(getInstagramRecentSearches({ brandId }));
    } else {
      dispatch(getYoutubeRecentSearches({ brandId }));
    }
  }, [brandId, isInstagram]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Skeleton active={true} paragraph={{ rows: 1, width: "100%" }} />
      ) : (
        <></>
      )}
      {!loading && (
        <p className="text_small bold text_secondary">Recent Searches</p>
      )}
      {error ? (
        <div className={styles.recent_searches_error}>
          <Error message={error} errorCode={errorCode} />
        </div>
      ) : (
        <></>
      )}
      {instagramRecentSearches ? (
        instagramRecentSearches?.length > 0 ? (
          <div className={styles.recent_searches}>
            {instagramRecentSearches?.map((recentSearch) => (
              <div
                key={recentSearch?.id}
                className={styles.recent_search}
                onClick={() => handleRecentSearchClick(recentSearch?.id)}
              >
                <p className="text_small center">
                  Recent search {recentSearch?.id}
                </p>
                <SearchOutlined style={{ fontSize: 16 }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text_small bold center">No data</p>
        )
      ) : youtubeRecentSearches ? (
        youtubeRecentSearches?.length > 0 ? (
          <div className={styles.recent_searches}>
            {youtubeRecentSearches?.map((recentSearch) => (
              <div
                key={recentSearch?.id}
                className={styles.recent_search}
                onClick={() => handleRecentSearchClick(recentSearch?.id)}
              >
                <p className="text_small center">
                  Recent search {recentSearch?.id}
                </p>
                <SearchOutlined style={{ fontSize: 16 }} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text_small bold center">No data</p>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecentSearches;
