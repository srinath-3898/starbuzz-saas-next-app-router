"use client";
import { Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./AddonsModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { generateAddonCheckoutUrl } from "@/store/payment/paymentActions";
import Loader from "@/components/Loader/Loader";
import { resetGenerateAddonCheckoutUrlData } from "@/store/payment/paymentSlice";
import Error from "@/components/Error/Error";
import { resetAddOnsData } from "@/store/addOns/addOnsSlice";

const AddonsModal = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { loading, addOns, error, errorCode } = useSelector(
    (state) => state.addOns
  );
  const {
    generateAddonCheckoutUrlLoading,
    addonCheckoutURL,
    generateAddonCheckoutUrlError,
    addonErrorCode,
  } = useSelector((state) => state.payment);

  const [id, setId] = useState(null);
  const [discoveryCount, setDiscoveryCount] = useState(0);
  const [reportCount, setReportCount] = useState(0);

  const columns = [
    {
      title: "Title",
      key: "title",
      render: (text, record) => <p>{record?.feature?.name}</p>,
    },

    {
      title: "Unit Price",
      key: "Unit Price",
      render: (text, record) => <p>{record?.unit_price}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (text, record) => (
        <div className={styles.quantity}>
          <button
            onClick={() =>
              record?.feature?.id === 2
                ? setDiscoveryCount(discoveryCount - 1)
                : setReportCount(reportCount - 1)
            }
            disabled={
              record?.feature?.id === 2
                ? discoveryCount === 0
                : reportCount === 0
            }
          >
            -
          </button>
          <input
            style={{ textAlign: "center", width: "50px" }}
            disabled={true}
            value={record?.feature?.id === 2 ? discoveryCount : reportCount}
            onChange={(e) =>
              record?.feature?.id === 2
                ? setDiscoveryCount(e.target.value)
                : setReportCount(e.target.value)
            }
          ></input>
          <button
            onClick={() =>
              record?.feature?.id === 2
                ? setDiscoveryCount(discoveryCount + 1)
                : setReportCount(reportCount + 1)
            }
            disabled={
              record?.feature?.id === 2
                ? discoveryCount === 50
                : reportCount === 10
            }
          >
            +
          </button>
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
      render: (text, record) => (
        <p>
          {record?.feature?.id === 2
            ? record?.unit_price * discoveryCount
            : record?.feature?.id === 3
            ? record?.unit_price * reportCount
            : ""}
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      render: (text, record) => (
        <button
          className="btn_small btn_primary"
          onClick={() => {
            setId(record?.feature?.id);
            handlePayment({ record });
          }}
          disabled={
            (record?.feature?.id === id && generateAddonCheckoutUrlLoading) ||
            (record?.feature?.id === 2 && discoveryCount === 0) ||
            (record?.feature?.id === 3 && reportCount === 0)
          }
        >
          {generateAddonCheckoutUrlLoading && record?.feature?.id === id ? (
            <Loader size={17} color="#ffffff" />
          ) : (
            "Pay"
          )}
        </button>
      ),
    },
  ];

  const getRowClassName = (record) => {
    return record?.feature?.id === 8 ? styles.campaign : "";
  };
  const handlePayment = ({ record }) => {
    if (record?.feature?.id === id) {
      const data = {
        featureId: record?.feature?.id,
        quantity:
          record?.feature?.name === "Discovery" ? discoveryCount : reportCount,
      };
      dispatch(generateAddonCheckoutUrl(data));
    }
  };

  const handleCancel = () => {
    setOpen(false), setDiscoveryCount(0), setReportCount(0), setId(0);
    dispatch(resetAddOnsData());
    dispatch(resetGenerateAddonCheckoutUrlData());
  };

  useEffect(() => {
    if (addonCheckoutURL) {
      window.open(addonCheckoutURL, "_blank");
    }
    dispatch(resetGenerateAddonCheckoutUrlData());
  }, [addonCheckoutURL]);

  return (
    <Modal
      width={"max-content"}
      open={open}
      title="Addons"
      footer={[]}
      centered
      closable={true}
      onCancel={handleCancel}
    >
      <>
        {loading && !error && !generateAddonCheckoutUrlError ? (
          <div style={{ width: "600px" }}>
            <Loader size={30} />
          </div>
        ) : (
          <></>
        )}
        {error || generateAddonCheckoutUrlError ? (
          <Error
            message={error || generateAddonCheckoutUrlError}
            errorCode={addonErrorCode || errorCode}
          />
        ) : (
          <></>
        )}
        {!loading && addOns && !error && !generateAddonCheckoutUrlError ? (
          <Table
            dataSource={addOns?.data}
            columns={columns}
            pagination={false}
            rowClassName={getRowClassName}
          />
        ) : (
          <></>
        )}
      </>
    </Modal>
  );
};

export default AddonsModal;
