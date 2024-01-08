"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Reports.module.css";
import {
  fetchReportsByBrand,
  generateInstaReportPDF,
  generateYoutubeReportPDF,
} from "@/store/reports/reportsAction";
import { useEffect, useState } from "react";
import { ConfigProvider, Empty, Table, Tooltip, message } from "antd";
import {
  DownloadOutlined,
  InstagramOutlined,
  LoadingOutlined,
  YoutubeFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
import {
  resetGenerateInstaReportPDFData,
  resetGenerateYoutubeReportPDFData,
} from "@/store/reports/reportsSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

const Reports = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [report, setReport] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { brandId } = useSelector((state) => state.globalVariables);

  const {
    reportsByBrandLoading,
    reportsByBrand,
    reportsByBrandError,
    generateInstaReportPDFLoading,
    pdfSource,
    generateInstaReportPDFMessage,
    generateInstaReportPDFError,
    fetchReportsByBrandErrorCode,
    generateInstaReportPDFErrorCode,
    generateYoutubeReportPDFLoading,
    youtubePDFSource,
    generateYoutubeReportPDFMessage,
    generateYoutubeReportPDFError,
    generateYoutubeReportPDFErrorCode,
  } = useSelector((state) => state.reports);

  const handleDownload = (pdfSource) => {
    if (pdfSource) {
      window.open(pdfSource, "_self");
    }
  };

  const handleGenerateReport = (record) => {
    if (record?.pdf_source === null && record?.platform?.short_name === "ig") {
      dispatch(
        generateInstaReportPDF({ brandId: brandId, username: record?.name })
      );
    } else if (
      record?.pdf_source === null &&
      record?.platform?.short_name === "yt"
    ) {
      dispatch(
        generateYoutubeReportPDF({ brandId: brandId, username: record?.name })
      );
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        record?.platform?.short_name === "ig" ? (
          <a href={`https://www.instagram.com/${text}/`} target="_blank">
            {text}
          </a>
        ) : (
          <a href={`https://www.youtube.com/@${text}`} target="_blank">
            {text}
          </a>
        ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "dataIndex",
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      align: "center",
      render: (platform) =>
        platform?.short_name === "yt" ? (
          <Tooltip title="Youtube">
            <YoutubeFilled
              alt="Youtube Icon"
              style={{ fontSize: "20px", color: "#ff0000" }}
            />
          </Tooltip>
        ) : (
          <Tooltip title="Instagram">
            <InstagramOutlined className={styles.logo} alt="instagram Icon" />
          </Tooltip>
        ),
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className={styles.actions}>
          {record?.platform?.short_name === "ig" ? (
            <Link
              href={{
                pathname: "/report",
                query: {
                  profilePic: record?.avatar_url,
                  name: record?.full_name,
                  username: record?.name,
                },
              }}
              style={{
                color: "#ff5900",
              }}
            >
              view report
            </Link>
          ) : record?.platform?.short_name === "yt" ? (
            <Link
              href={{
                pathname: "/report/youtube",
                query: {
                  username: record?.name,
                },
              }}
              target="_blank"
              style={{
                color: "#ff5900",
              }}
            >
              view report
            </Link>
          ) : (
            ""
          )}

          {(generateInstaReportPDFLoading || generateYoutubeReportPDFLoading) &&
          report?.id === record?.id ? (
            <LoadingOutlined />
          ) : (
            <Tooltip title={"Download Report PDF"} placement="top">
              <button
                className={styles.download_btn}
                onClick={() => setReport(record)}
                style={{ padding: 0 }}
              >
                <DownloadOutlined style={{ fontSize: "18px" }} />
              </button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchReportsByBrand({ brandId, size, page }));
  }, [size, page, brandId]);

  useEffect(() => {
    if (pdfSource) {
      handleDownload(pdfSource);
    } else if (youtubePDFSource) {
      handleDownload(youtubePDFSource);
    }
  }, [pdfSource, youtubePDFSource]);

  useEffect(() => {
    if (report && report?.pdf_source) {
      handleDownload(report?.pdf_source);
    } else if (report && !report?.pdfSource) {
      handleGenerateReport(report);
    }
  }, [report]);

  useEffect(() => {
    if (
      generateInstaReportPDFMessage ||
      generateInstaReportPDFError ||
      generateYoutubeReportPDFMessage ||
      generateYoutubeReportPDFError
    ) {
      messageApi.open({
        key: "updatable",
        type:
          generateInstaReportPDFMessage || generateYoutubeReportPDFMessage
            ? "success"
            : "error",
        content:
          generateInstaReportPDFMessage ||
          generateInstaReportPDFError ||
          generateYoutubeReportPDFMessage ||
          generateYoutubeReportPDFError,
        duration: 5,
      });
    }
    dispatch(resetGenerateInstaReportPDFData());
    dispatch(resetGenerateYoutubeReportPDFData());
  }, [
    generateInstaReportPDFMessage,
    generateInstaReportPDFError,
    generateYoutubeReportPDFMessage,
    generateYoutubeReportPDFError,
  ]);

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <p className="text_large bold">List of Reports</p>
        {reportsByBrandLoading &&
        !reportsByBrand &&
        page === 1 &&
        !reportsByBrandError ? (
          <Loader size={50} />
        ) : (
          <></>
        )}
        {!reportsByBrandLoading && !reportsByBrand && reportsByBrandError ? (
          <div className={styles.error}>
            <Error
              message={reportsByBrandError}
              errorCode={fetchReportsByBrandErrorCode}
            />
          </div>
        ) : (
          <></>
        )}
        {reportsByBrand && !reportsByBrandError ? (
          <>
            <div className={styles.container_2}>
              <ConfigProvider
                renderEmpty={() =>
                  reportsByBrandError ? (
                    <Error message={reportsByBrandError} />
                  ) : (
                    <Empty
                      description={
                        <div>
                          <p>There are no Reports to display</p>
                          <p>
                            <span
                              onClick={() => {
                                router.push("/discovery");
                              }}
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "blue",
                                fontSize: "16px",
                              }}
                            >
                              {" "}
                              Click here{" "}
                            </span>{" "}
                            to Discover Influencers and Download Reports
                          </p>
                        </div>
                      }
                    />
                  )
                }
              >
                <Table
                  columns={columns}
                  dataSource={reportsByBrand?.data}
                  pagination={false}
                  loading={{
                    indicator: <Loader />,
                    spinning: reportsByBrandLoading,
                  }}
                  scroll={{ y: 300 }}
                  style={{ height: "350px" }}
                  rowKey={"id"}
                />
              </ConfigProvider>
            </div>
            {reportsByBrand?.total_records > 5 ? (
              <Pagination
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                lastPage={reportsByBrand?.last_page}
                loading={reportsByBrandLoading}
                totalRecords={reportsByBrand?.total_records}
                dataLength={reportsByBrand?.data?.length}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Reports;
