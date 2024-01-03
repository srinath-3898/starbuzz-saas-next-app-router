"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Lists.module.css";
import { useEffect, useState } from "react";
import { fetchListsByBrand } from "@/store/lists/listsActions";
import Loader from "@/components/Loader/Loader";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Empty,
  Popconfirm,
  Table,
  Tooltip,
  message,
} from "antd";
import Pagination from "@/components/Pagination/Pagination";
import { createList, deleteList, updateList } from "@/store/list/listActions";
import { resetCUDListData } from "@/store/list/listSlice";
import Error from "@/components/Error/Error";
import Link from "next/link";
import CreateListModal from "@/components/Modals/CreateListModal/CreateListModal";

const Lists = () => {
  const dispatch = useDispatch();

  const { token, user, isAdmin, organisation } = useSelector(
    (state) => state.auth
  );
  const { brandId } = useSelector((state) => state.globalVariables);
  const { loading, lists, error, errorCode } = useSelector(
    (state) => state.lists
  );
  const [messageApi, contextHolder] = message.useMessage();
  const { cudListLoading, cudListMessage, cudListError } = useSelector(
    (state) => state.list
  );

  const [createListModalOpen, setCreateListModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [list, setList] = useState({ title: "", description: "" });
  const [listId, setListId] = useState(null);
  const [errors, setErrors] = useState({ title: "", description: "" });

  const handleCreateListModalCancel = () => {
    setErrors({ title: "", description: "" });
    setList({ title: "", description: "" });
    setCreateListModalOpen(false);
  };

  const validateSubmit = () => {
    const errors = {};
    if (list.title.length <= 0) {
      errors.title = "Title is required";
      setErrors((prevState) => ({ ...prevState, title: errors.title }));
    }
    // if (list.description.length <= 0) {
    //   errors.description = "Description is required";
    //   setErrors((prevState) => ({
    //     ...prevState,
    //     description: errors.description,
    //   }));
    // }
    return Object.keys(errors).length === 0;
  };

  const handleCreateListSubmit = () => {
    if (validateSubmit()) {
      dispatch(
        list?.id
          ? updateList({
              brandId: isAdmin ? organisation?.brand?.id : brandId,
              listId: list?.id,
              title: list.title,
              description: list.description,
            })
          : createList({
              brandId: isAdmin ? organisation?.brand?.id : brandId,
              title: list.title,
              description: list.description,
            })
      ).then(() => {
        dispatch(
          fetchListsByBrand({
            brandId: brandId,
            size: size,
            page: listId ? page : 1,
          })
        );
        setList({ title: "", description: "" });
        setErrors({ title: "", description: "" });
        setCreateListModalOpen(false);
      });
    }
  };

  const handleDelete = () => {
    dispatch(deleteList({ brandId, listId })).then(() => {
      setListId(null);
      if (lists?.data?.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        dispatch(
          fetchListsByBrand({
            brandId: brandId,
            size: size,
            page: page,
          })
        );
      }
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Link
          href={{
            pathname: `/lists/${record?.id}`,
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className={styles.list_name}>{text}</div>,
    },
    {
      title: "Total influencers",
      dataIndex: "totalInfluencers",
      key: "totalInfluencers",
      align: "center",
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
          <Tooltip title="Edit" placement="top">
            <EditOutlined
              style={{ color: "blue", fontSize: 17 }}
              onClick={() => {
                setList(record);
                setCreateListModalOpen(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            open={listId === record?.id}
            title="Delete the List"
            description="Are you sure to delete this List?"
            onCancel={() => setListId(null)}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
            placement="left"
            okButtonProps={{
              loading: cudListLoading,
              disabled: cudListLoading,
            }}
            cancelButtonProps={{ disabled: cudListLoading }}
          >
            <DeleteOutlined
              style={{ color: "red", fontSize: 17 }}
              onClick={() => setListId(record?.id)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchListsByBrand({ brandId: brandId, size: size, page: page }));
  }, [page, size]);

  useEffect(() => {
    if (cudListMessage || cudListError) {
      messageApi.open({
        key: "updatabale",
        content: cudListMessage ? cudListMessage : cudListError,
        duration: 3,
        icon: cudListMessage ? (
          <CheckCircleOutlined style={{ color: "#fe5900", fontSize: "16px" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
      });
      dispatch(resetCUDListData());
    }
  }, [cudListMessage, cudListError]);

  return token && user ? (
    <>
      {contextHolder}
      <div className={styles.container}>
        {lists && !error ? (
          <div className={styles.container_1}>
            <p className="text_large bold">Lists</p>
            <button
              className="btn_small btn_primary"
              onClick={() => {
                setList({ title: "", description: "" });
                setCreateListModalOpen(true);
              }}
            >
              Create List
            </button>
          </div>
        ) : (
          <></>
        )}
        {loading && page === 1 && !lists ? <Loader size={50} /> : <></>}
        {!loading && !lists && error ? (
          <Error message={error} errorCode={errorCode} />
        ) : (
          <></>
        )}
        {lists && !error ? (
          <>
            <div className={styles.container_2}>
              <ConfigProvider
                renderEmpty={() => (
                  <Empty description={<p>There are no Lists to display</p>} />
                )}
              >
                <Table
                  columns={columns}
                  dataSource={lists?.data}
                  pagination={false}
                  loading={{ indicator: <Loader />, spinning: loading }}
                  rowKey={"id"}
                  scroll={{ y: 350 }}
                />
              </ConfigProvider>
            </div>
            {lists?.total_records > 4 ? (
              <Pagination
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                lastPage={lists?.last_page}
                loading={loading}
                totalRecords={lists?.total_records}
                dataLength={lists?.data?.length}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <CreateListModal
        open={createListModalOpen}
        list={list}
        setList={setList}
        handleCancel={handleCreateListModalCancel}
        handleSubmit={handleCreateListSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  ) : (
    <></>
  );
};

export default Lists;
