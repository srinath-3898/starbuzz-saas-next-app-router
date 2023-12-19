import Link from "next/link";
import styles from "./SearchInfluencers.module.css";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { resetSearchInfluencersData } from "@/store/searchInfluencers/searchInfluencersSlice";
import { searchInfluencersByUsername } from "@/store/searchInfluencers/searchInfluencersActions";
import Loader from "../Loader/Loader";

const SearchInfluencers = () => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);

  const searchInfluencersInputRef = useRef(null);

  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading: searchInfluencersLoading,
    influencers: searchInfluencers,
    error: searchInfluencersError,
  } = useSelector((state) => state.searchInfluencers);

  const onClearSearch = () => {
    searchInfluencersInputRef.current.focus();
    setSelectedInfluencer(null);
    setSearchValue("");
  };

  useEffect(() => {
    if (searchValue.length > 2) {
      const identifier = setTimeout(() => {
        dispatch(searchInfluencersByUsername({ brandId, value: searchValue }));
      }, 500);
      return () => {
        clearTimeout(identifier);
      };
    } else {
      return;
    }
  }, [searchValue]);

  return (
    <div
      className={styles.container_1}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          dispatch(resetSearchInfluencersData());
          setSearchValue("");
        }
      }}
      tabIndex={0}
    >
      <input
        type="text"
        className="input_extra_large"
        placeholder={
          selectedInfluencer
            ? ""
            : "Please Search with a valid instagram username"
        }
        value={searchValue}
        onChange={
          selectedInfluencer
            ? () => {
                return;
              }
            : (event) => setSearchValue(event.target.value)
        }
        ref={searchInfluencersInputRef}
      />
      <Link
        href={{
          pathname: "/report",
          query: {
            name: selectedInfluencer?.title,
            username: selectedInfluencer?.username,
            profilePic: selectedInfluencer?.avatar_url,
            followers: selectedInfluencer?.subscribers_count,
          },
        }}
        target="_blank"
      >
        <button
          className="btn_small btn_primary"
          disabled={selectedInfluencer ? false : true}
        >
          Get Report
        </button>
      </Link>
      <div className={styles.search_icon}>
        {selectedInfluencer ? (
          <CloseCircleFilled
            style={{ fontSize: "14px", color: "#afafaf" }}
            onClick={onClearSearch}
          />
        ) : (
          <SearchOutlined
            style={{ fontSize: "14px" }}
            onClick={() => {
              searchInfluencersInputRef.current.focus();
            }}
          />
        )}
      </div>
      {searchInfluencersLoading &&
      !searchInfluencers &&
      !searchInfluencersError ? (
        <div className={styles.search_influencers}>
          <Loader />
        </div>
      ) : (
        <></>
      )}
      {!searchInfluencersLoading &&
      searchInfluencers &&
      !searchInfluencersError ? (
        <div className={styles.search_influencers}>
          {searchInfluencers?.map((influencer) => (
            <div
              key={influencer?.user_id}
              className={styles.search_influencer}
              onClick={() => {
                setSelectedInfluencer(influencer);
                dispatch(resetSearchInfluencersData());
                setSearchValue("");
              }}
            >
              <Image
                src={influencer?.avatar_url}
                width={40}
                height={40}
                alt="Profile Pictue"
              />
              <p className="text_small">{influencer?.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {!searchInfluencers && searchInfluencersError ? (
        <div className={styles.search_influencers_error}>
          <p className="text_small">{searchInfluencersError}</p>
        </div>
      ) : (
        <></>
      )}
      {selectedInfluencer ? (
        <div className={styles.selected_influencer}>
          <Image
            src={selectedInfluencer?.avatar_url}
            width={20}
            height={20}
            alt="Profile Pic"
          />
          <p className="text_small">{selectedInfluencer?.title}</p>
          <p className="text_small" style={{ color: "gray" }}>
            ({selectedInfluencer?.username})
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchInfluencers;
