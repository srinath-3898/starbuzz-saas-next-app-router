"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Reports.module.css";
import {
  fetchReportsByBrand,
  generateReportPDF,
} from "@/store/reports/reportsAction";
import { useEffect, useState } from "react";
import { ConfigProvider, Empty, Table, Tooltip, message } from "antd";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { resetGenerateReportPDFData } from "@/store/reports/reportsSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import Pagination from "@/components/Pagination/Pagination";

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
    generateReportPDFLoading,
    pdfSource,
    generateReportPDFMessage,
    generateReportPDFError,
    fetchReportsByBrandErrorCode,
    generateReportPDFErrorCode,
  } = useSelector((state) => state.reports);

  const handleDownload = (pdfSource) => {
    if (pdfSource) {
      window.open(pdfSource, "_self");
    }
  };

  const handleGenerateReport = (record) => {
    if (record?.pdf_source === null) {
      dispatch(generateReportPDF({ brandId: brandId, username: record?.name }));
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
      title: "Actions",
      dataIndex: "",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <div className={styles.actions}>
          {generateReportPDFLoading && report?.id === record?.id ? (
            <LoadingOutlined />
          ) : (
            <Tooltip
              title={
                record?.platform?.short_name === "yt"
                  ? "Youtube download report is comming soon"
                  : "Download Report PDF"
              }
              placement="top"
            >
              <button
                className={styles.download_btn}
                onClick={() => setReport(record)}
                style={{ padding: 0 }}
                disabled={record?.platform?.short_name === "yt"}
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
    }
  }, [pdfSource]);

  useEffect(() => {
    if (report && report?.pdf_source) {
      handleDownload(report?.pdf_source);
    } else if (report && !report?.pdfSource) {
      handleGenerateReport(report);
    }
  }, [report]);

  useEffect(() => {
    if (generateReportPDFMessage || generateReportPDFError) {
      messageApi.open({
        key: "updatable",
        type: generateReportPDFMessage ? "success" : "error",
        content: generateReportPDFMessage || generateReportPDFError,
        duration: 5,
      });
    }
    dispatch(resetGenerateReportPDFData());
  }, [generateReportPDFMessage, generateReportPDFError]);

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
