"use client";
import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInfluencerFromList,
  getInfluencers,
  getList,
} from "@/store/list/listActions";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import {
  ConfigProvider,
  Empty,
  Popconfirm,
  Table,
  Tooltip,
  message,
} from "antd";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";
import { DeleteOutlined, InstagramOutlined } from "@ant-design/icons";
import CampaignsIcon from "@/components/CampaignsIcon/CampaignsIcon";
import { resetDeleteInfluencerFromListData } from "@/store/list/listSlice";
import AddInfluencerModal from "@/components/Modals/AddInfluencerModal/AddInfluencer";
import ExportToCSV from "@/components/ExportToCSV/ExportToCSV";

const List = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading,
    list,
    error,
    errorCode,
    getInfluencersLoading,
    influencers,
    getInfluencersError,
    deleteInfluencerFromListLoading,
    deleteInfluencerFromListMessage,
    deleteInfluencerFromListError,
  } = useSelector((state) => state.list);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [type, setType] = useState(null);
  const [addInfluencerModalOpen, setAddInfluencerModalOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  console.log(influencers);

  const handleRemoveInfluencer = () => {
    dispatch(
      deleteInfluencerFromList({ brandId, username, listId: list?.id })
    ).then(() => {
      setUsername(null);
      dispatch(getInfluencers({ brandId, listId: list?.id, size, page: 1 }));
    });
  };

  const handleExport = () => {
    ExportToCSV(influencers?.influencers, "influencers_list.csv");
  };

  const coloumns = [
    {
      title: "Name",
      key: "name",
      render: (text, record) => (
        <div className={styles.name}>
          <Image
            src={record?.avatar_url}
            alt="Profile pic"
            width={20}
            height={20}
          />
          <p>{record?.full_name}</p>
        </div>
      ),
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
    },
    {
      title: "Scoial media accounts",
      key: "id",
      align: "center",
      render: (text, record) => (
        <Link
          href={`https://www.instagram.com/${record?.username}/`}
          target="_blank"
        >
          <InstagramOutlined style={{ fontSize: "20px", color: "#fe5900" }} />
        </Link>
      ),
    },
    {
      title: "Report",
      align: "center",
      key: "report",
      render: (text, record) => {
        return (
          <Link
            href={{
              pathname: "/report",
              query: {
                profilePic: record?.avatar_url,
                name: record?.full_name,
                username: record?.username,
                followers: record?.metrics?.subscribers_count.value,
                realFollowers: record?.metrics?.real_subscribers_count?.value,
                er: record?.metrics?.er?.value,
                sbScore: record?.features?.aqs?.data?.mark,
              },
            }}
            target="_blank"
            style={{
              textDecoration: "underline",
              color: "#fe5900",
            }}
          >
            View report
          </Link>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div className={styles.actions}>
          <Tooltip title={"Add influencer to campaign"}>
            <div
              className={styles.add_influencer_to_campaign}
              onClick={() => {
                setType("campaign");
                setUsername(record?.username);
                setAddInfluencerModalOpen(true);
              }}
            >
              <CampaignsIcon />
            </div>
          </Tooltip>
          <Popconfirm
            title="Remove influencer"
            description={`Are you sure to remove ${username} from this list?`}
            open={record?.username === username && !type}
            onCancel={() => {
              setUsername(null);
            }}
            onConfirm={handleRemoveInfluencer}
            placement="topLeft"
            okButtonProps={{
              loading: deleteInfluencerFromListLoading,
              disabled: deleteInfluencerFromListLoading,
            }}
            cancelButtonProps={{ disabled: deleteInfluencerFromListLoading }}
          >
            <DeleteOutlined
              style={{ fontSize: 17, color: "red" }}
              onClick={() => setUsername(record?.username)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getList({ brandId, id }));
  }, []);

  useEffect(() => {
    if (list) {
      dispatch(getInfluencers({ brandId, listId: list?.id, size, page }));
    }
  }, [list]);

  useEffect(() => {
    if (deleteInfluencerFromListMessage || deleteInfluencerFromListError) {
      messageApi.open({
        type: deleteInfluencerFromListMessage ? "success" : "error",
        content: deleteInfluencerFromListMessage
          ? deleteInfluencerFromListMessage
          : deleteInfluencerFromListError,
        duration: 3,
      });
      dispatch(resetDeleteInfluencerFromListData());
    } else {
      return;
    }
  }, [deleteInfluencerFromListMessage, deleteInfluencerFromListError]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        {loading && !list && !error ? <Loader size={50} /> : <></>}
        {!loading && !list && error ? (
          <Error message={error} errorCode={errorCode} />
        ) : (
          <></>
        )}
        {!loading && list && !error ? (
          <>
            <div className={styles.container_1}>
              <div className={styles.title}>
                <p className="text_small bold">Title</p>
                <p className="text_medium">{list?.title}</p>
              </div>
              <div className={styles.description}>
                <p className="text_small bold">Description</p>
                <p className="text_small">{list?.description}</p>
              </div>
              <div className={styles.created_at}>
                <p className="text_small bold">Created At</p>
                <p className="text_small">
                  {new Date(list?.createdAt).toDateString()}
                </p>
              </div>
            </div>
            {getInfluencersLoading &&
            !influencers &&
            page === 1 &&
            !getInfluencersError ? (
              <Loader />
            ) : (
              <></>
            )}
            {influencers && !getInfluencersError ? (
              <div className={styles.container_2}>
                <div className={styles.container_2_box_1}>
                  <p className="text_medium bold">Influencers</p>
                  <div
                    className={
                      influencers?.total_records > 0 ? styles.export_btns : ""
                    }
                  >
                    <button
                      className="btn_medium btn_primary"
                      onClick={() => router.push("/discovery")}
                    >
                      Add influencers
                    </button>
                    {influencers?.total_records > 0 ? (
                      <button
                        className={`btn_small btn_secondary ${styles.export_btn_color}`}
                        onClick={handleExport}
                      >
                        Export Influencers
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <ConfigProvider
                  renderEmpty={() => (
                    <Empty
                      description={
                        <div>
                          <p>There are no influencers in this list</p>
                        </div>
                      }
                    />
                  )}
                >
                  <Table
                    columns={coloumns}
                    dataSource={influencers?.influencers}
                    pagination={false}
                    loading={{
                      indicator: <Loader />,
                      spinning: getInfluencersLoading,
                    }}
                    scroll={{ y: 330 }}
                    rowKey={"id"}
                  />
                </ConfigProvider>
                {influencers?.total_recors > size ? (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    lastPage={influencers?.last_page}
                    loading={getInfluencersLoading}
                    totalRecords={influencers?.total_records}
                    dataLength={influencers?.influencers?.length}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <AddInfluencerModal
        type={type}
        setType={setType}
        open={addInfluencerModalOpen}
        setOpen={setAddInfluencerModalOpen}
        username={username}
        setUsername={setUsername}
      />
    </>
  );
};

export default List;
