"use client";
import { Modal } from "antd";
import React from "react";
import styles from "./CreateListModal.module.css";
import { CloseCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";

const CreateListModal = ({
  open,
  list,
  setList,
  handleCancel,
  handleSubmit,
  errors,
  setErrors,
}) => {
  const { cudListLoading } = useSelector((state) => state.list);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setList((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: null }));
  };

  return (
    <Modal
      title={list?.id ? "Edit List" : "Create List"}
      open={open}
      maskClosable={false}
      closable={false}
      centered
      footer={[
        <div key={"footer"} className={styles.footer}>
          <button
            className="btn_small btn_secondary"
            onClick={handleCancel}
            disabled={cudListLoading}
          >
            Cancel
          </button>
          <button
            className="btn_small btn_primary"
            onClick={handleSubmit}
            disabled={cudListLoading}
          >
            {cudListLoading ? (
              <Loader size={15} color="#ffffff" />
            ) : list?.id ? (
              "Edit List"
            ) : (
              "Create List"
            )}
          </button>
        </div>,
      ]}
    >
      <div className={styles.container}>
        <div className={`input_controller`}>
          <p>List Title:</p>
          <input
            type="text"
            value={list.title}
            placeholder="Title"
            name="title"
            onChange={handleInputChange}
          />
          {errors?.title && (
            <div className={`validation_error`}>
              <p>{errors.title}</p>
              <p onClick={() => handleCloseError("title")}>
                <CloseCircleFilled style={{ fontSize: "13px" }} />
              </p>
            </div>
          )}
        </div>
        <div className="input_controller">
          <p>Description:</p>
          <textarea
            onChange={handleInputChange}
            value={list.description}
            name="description"
            id=""
            placeholder="Description"
          />
          {errors?.description && (
            <div className={`validation_error`}>
              <p>{errors.description}</p>
              <p onClick={() => handleCloseError("description")}>
                <CloseCircleFilled style={{ fontSize: "13px" }} />
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateListModal;
