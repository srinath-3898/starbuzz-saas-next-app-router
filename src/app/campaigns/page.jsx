"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Campaigns.module.css";
import Loader from "@/components/Loader/Loader";
import { useEffect, useState } from "react";
import { getCampaigns } from "@/store/campaigns/campaignsActions";
import Pagination from "@/components/Pagination/Pagination";
import Image from "next/image";
import no_data from "./../../assets/svgs/no_data.svg";
import Link from "next/link";
import Error from "@/components/Error/Error";
import CampaignCard from "@/components/CampaignCard/CampaignCard";
import { useRouter } from "next/navigation";

const Campaigns = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { brandId } = useSelector((state) => state.globalVariables);
  const { loading, campaigns, error, errorCode } = useSelector(
    (state) => state.campaigns
  );

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  useEffect(() => {
    if (brandId) {
      dispatch(getCampaigns({ brandId: brandId, page: page, size: size }));
    }
  }, [brandId, page, size]);

  return (
    <>
      <div className={styles.container}>
        {campaigns ? (
          <div className={styles.container_1}>
            {campaigns && !error && (
              <p className={`text_large bold`}>List of campaigns </p>
            )}
            <button
              onClick={() => router.push(`campaign`)}
              className={`btn_small btn_primary`}
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.container_2}>
          {!loading && campaigns && campaigns?.data.length === 0 && !error && (
            <div className={styles.no_data}>
              <p className={`text_large`}>No campaigns found</p>
              <Image src={no_data} alt="no data" />
              <Link
                style={{
                  textDecoration: "underline",
                  color: "#ff5900",
                  fontSize: "1.6rem",
                }}
                href={"/campaigns/createCampaign"}
              >
                Create campaign
              </Link>
            </div>
          )}
          {!loading && !campaigns && error ? (
            <Error message={error} errorCode={errorCode} />
          ) : (
            <></>
          )}
          {campaigns && campaigns?.data.length > 0 && !error && (
            <div
              className={`${styles.campaigns} ${
                loading ? styles.campaigns_blur : ""
              }`}
            >
              {campaigns?.data.map((campaign) => {
                return <CampaignCard data={campaign} key={campaign?.id} />;
              })}
            </div>
          )}
          {loading && !error ? (
            <div className={styles.loader}>
              <Loader size={50} />
            </div>
          ) : (
            <></>
          )}
          {campaigns && campaigns?.total_records > size && !error ? (
            <Pagination
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
              lastPage={campaigns?.last_page}
              loading={loading}
              totalRecords={campaigns?.total_records}
              dataLength={campaigns?.data?.length}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default Campaigns;
