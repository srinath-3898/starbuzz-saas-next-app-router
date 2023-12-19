"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import {
  getAddonPayments,
  getPayments,
} from "@/store/payments/paymentsActions";
import { useEffect, useState } from "react";
import { getTransactionsByBrand } from "@/store/transactions/transactionsActions";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import { ConfigProvider, Empty, Table } from "antd";
import Pagination from "@/components/Pagination/Pagination";
import { DownloadOutlined } from "@ant-design/icons";
import ProfileDetails from "@/components/ProfileDetails/ProdileDetails";

const Profile = () => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const { user } = useSelector((state) => state.auth);

  const {
    paymentsLoading,
    addonPaymentsLoading,
    payments,
    addonPayments,
    paymentsError,
    paymentsErrorCode,
    addonPaymentsError,
    addonPaymentsErrorCode,
  } = useSelector((state) => state.payments);

  const {
    loading: transactionsLoading,
    transactions,
    error: transactionsError,
    errorCode: transactionsErrorCode,
  } = useSelector((state) => state.transactions);

  const [active, setActive] = useState("payments");
  const [paymentsSize, setPaymentsSize] = useState(10);
  const [paymentsPage, setPaymentsPage] = useState(1);
  const [transactionsSize, setTransactionsSize] = useState(10);
  const [transactionsPage, setTransactionsPage] = useState(1);
  const [addonPaymentsSize, setAddonPaymentsSize] = useState(10);
  const [addonPaymentsPage, setAddonPaymentsPage] = useState(1);

  const paymentscolumns = [
    {
      title: "Id",
      dataIndex: "payment_id",
      key: "payment_id",
    },
    {
      title: "Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
      render: (text) => <p style={{ color: "#666464" }}>{text}(₹)</p>,
    },
    {
      title: "Tax",
      dataIndex: "tax_amount",
      key: "tax_amount",
    },
    {
      title: "Currency",
      dataIndex: "payment_currency",
      key: "payment_currency",
    },
    {
      title: "Gateway",
      dataIndex: "payment_gateway",
      key: "payment_gateway",
    },
    {
      title: "Through",
      dataIndex: "payment_through",
      key: "payment_through",
    },

    {
      title: "Status",
      dataIndex: "payment_status",
      key: "payment_status",
    },
    {
      title: "Message",
      dataIndex: "payment_message",
      key: "payment_message",
    },
    {
      title: "Date",
      dataIndex: "payment_time",
      key: "payment_time",
      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toLocaleString()}</p>
      ),
    },
    {
      title: "Invoice",
      dataIndex: "invoice_source",
      key: "invoice",
      align: "center",
      render: (text) => {
        return (
          <DownloadOutlined
            style={{ color: "blue", fontSize: "18px" }}
            onClick={() => handleDownloadInvoice(text)}
          />
        );
      },
    },
  ];

  const transactionscolumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Brand Name",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <p style={{ color: "#666464" }}>{text.name}</p>,
    },
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      render: (text) => <p style={{ color: "#666464" }}>{text.name}</p>,
    },
    {
      title: "Credits Used",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Transactions Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: "Status",
      dataIndex: "transaction_status",
      key: "transaction_status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toLocaleString()}</p>
      ),
    },
  ];

  const addonPaymentColumns = [
    { title: "Id", dataIndex: "payment_id", key: "id" },
    {
      title: "Name",
      dataIndex: "feature",
      key: "name",
      render: (text) => <p style={{ color: "#666464" }}>{text.name}</p>,
    },
    {
      title: "Amount",
      dataIndex: "payment_amount",
      key: "amount",
    },
    {
      title: "Currency",
      dataIndex: "payment_currency",
      key: "currency",
    },
    {
      title: "Mode",
      dataIndex: "payment_method",
      key: "mode",
    },
    {
      title: "Status",
      dataIndex: "payment_status",
      key: "status",
    },
    {
      title: "Message",
      dataIndex: "payment_message",
      key: "message",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Date",
      dataIndex: "payment_time",
      key: "date",
      render: (text) => (
        <p style={{ color: "#666464" }}>{new Date(text).toLocaleString()}</p>
      ),
    },

    {
      title: "Invoice",
      dataIndex: "invoice_source",
      key: "invoice",
      align: "center",
      render: (text, record) => {
        return (
          <DownloadOutlined
            style={{ color: "blue", fontSize: "18px" }}
            onClick={() => handleDownloadInvoice(text)}
          />
        );
      },
    },
  ];
  useEffect(() => {
    if (active === "payments") {
      dispatch(getPayments({ size: paymentsSize, page: paymentsPage }));
    } else if (active === "transactions") {
      dispatch(
        getTransactionsByBrand({
          brandId,
          size: transactionsSize,
          page: transactionsPage,
        })
      );
    } else if (active === "addons") {
      dispatch(
        getAddonPayments({ size: addonPaymentsSize, page: addonPaymentsPage })
      );
    }
  }, [
    active,
    paymentsSize,
    paymentsPage,
    transactionsPage,
    transactionsSize,
    brandId,
  ]);

  const handleDownloadInvoice = (pdfSource) => {
    if (pdfSource) {
      window.open(pdfSource, "_self");
    }
  };

  return user ? (
    <div className={styles.container}>
      <ProfileDetails />
      <div className={styles.container_1}>
        <div
          className={active === "payments" ? styles.active : ""}
          onClick={() => setActive("payments")}
        >
          <p className="text_medium bold">Payments</p>
        </div>
        <div
          className={active === "transactions" ? styles.active : ""}
          onClick={() => setActive("transactions")}
        >
          <p className="text_medium bold">Transactions</p>
        </div>
        <div
          className={active === "addons" ? styles.active : ""}
          onClick={() => setActive("addons")}
        >
          <p className="text_medium bold">Addons</p>
        </div>
      </div>

      {(paymentsLoading || transactionsLoading || addonPaymentsLoading) &&
      (paymentsPage === 1 ||
        transactionsPage === 1 ||
        addonPaymentsPage === 1) &&
      (!payments || !transactions || !addonPayments) &&
      (!paymentsError || !transactionsError || !addonPaymentsError) ? (
        <Loader />
      ) : (
        <></>
      )}

      {active === "payments" &&
      !paymentsLoading &&
      !payments &&
      paymentsError ? (
        <Error message={paymentsError} errorCode={paymentsErrorCode} />
      ) : (
        <></>
      )}
      {active === "transactions" &&
      !transactionsLoading &&
      !transactions &&
      transactionsError ? (
        <Error message={transactionsError} errorCode={transactionsErrorCode} />
      ) : (
        <></>
      )}
      {active === "addons" &&
      !addonPaymentsLoading &&
      !addonPayments &&
      addonPaymentsError ? (
        <Error
          message={addonPaymentsError}
          errorCode={addonPaymentsErrorCode}
        />
      ) : (
        <></>
      )}

      {active === "payments" && payments && !paymentsError ? (
        <>
          <ConfigProvider
            renderEmpty={() => (
              <Empty
                description={
                  <div>
                    <p>There are no Payments to display</p>
                  </div>
                }
              />
            )}
          >
            <Table
              columns={paymentscolumns}
              dataSource={payments?.data}
              pagination={false}
              loading={{
                indicator: <Loader />,
                spinning: paymentsLoading,
              }}
              scroll={{ y: 330 }}
              rowKey={"id"}
            />
          </ConfigProvider>
          {payments?.total_records > paymentsSize ? (
            <Pagination
              page={paymentsPage}
              setPage={setPaymentsPage}
              size={paymentsSize}
              setSize={setPaymentsSize}
              lastPage={payments?.last_page}
              loading={paymentsLoading}
              totalRecords={payments?.total_records}
              dataLength={payments?.data?.length}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {active === "transactions" && transactions && !transactionsError ? (
        <>
          <ConfigProvider
            renderEmpty={() => (
              <Empty
                description={
                  <div>
                    <p>There are no Transactions to display</p>
                  </div>
                }
              />
            )}
          >
            <Table
              columns={transactionscolumns}
              dataSource={transactions?.data}
              pagination={false}
              loading={{
                indicator: <Loader />,
                spinning: transactionsLoading,
              }}
              scroll={{ y: 330 }}
              rowKey={"id"}
            />
          </ConfigProvider>
          {transactions?.total_records > transactionsSize ? (
            <Pagination
              page={transactionsPage}
              setPage={setTransactionsPage}
              size={transactionsSize}
              setSize={setTransactionsSize}
              lastPage={transactions?.last_page}
              loading={transactionsLoading}
              totalRecords={transactions?.total_records}
              dataLength={transactions?.data?.length}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}

      {active === "addons" && addonPayments && !addonPaymentsError ? (
        <>
          <ConfigProvider
            renderEmpty={() => (
              <Empty
                description={
                  <div>
                    <p>There are no addons to display</p>
                  </div>
                }
              />
            )}
          >
            <Table
              columns={addonPaymentColumns}
              dataSource={addonPayments?.data}
              pagination={false}
              loading={{
                indicator: <Loader />,
                spinning: addonPaymentsLoading,
              }}
              scroll={{ y: 330 }}
              rowKey={"id"}
            />
          </ConfigProvider>
        </>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Profile;
