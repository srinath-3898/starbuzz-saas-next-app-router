"use client";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Users.module.css";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "@/store/users/usersActions";
import { ConfigProvider, Empty, Popconfirm, Table, message } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { deleteUser } from "@/store/user/userActions";
import { resetCUDUserData } from "@/store/user/userSlice";
import { useRouter } from "next/navigation";
// import Loader from "@/components/Loader/Loader";
// import Error from "@/components/Error/Error";
// import Pagination from "@/components/Pagination/Pagination";
// import PushToSubscriptionModal from "@/components/Modals/PushToSubscriptionModal/PushToSubscriptionModal";
// import CreateUpdateUserModal from "@/components/Modals/CreateUpdateUserModal/CreateUpdateUserModal";

const Loader = dynamic(() => import("../../components/Loader/Loader"));
const Error = dynamic(() => import("../../components/Error/Error"), {
  ssr: false,
});
const Pagination = dynamic(() =>
  import("../../components/Pagination/Pagination")
);
const PushToSubscriptionModal = dynamic(() =>
  import(
    "../../components/Modals/PushToSubscriptionModal/PushToSubscriptionModal"
  )
);
const CreateUpdateUserModal = dynamic(
  () =>
    import(
      "../../components/Modals/CreateUpdateUserModal/CreateUpdateUserModal"
    ),
  { ssr: false }
);

const Users = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, users, error, errorCode } = useSelector(
    (state) => state.users
  );
  const { cudUserloading, hasEnoughCredits, cudUserMessage, cudUsererror } =
    useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [editUserData, setEditUserData] = useState(null);
  const [deletePopConfirmOpen, setDeletePopConfirmOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [pushToSubscriptionModalOpen, setPushToSubscriptionModalOpen] =
    useState(false);

  const handleDeleteUser = (record) => {
    dispatch(deleteUser({ userId: record?.id })).then(() => {
      setEditUserData(null); // reset edit
      if (users?.data?.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        dispatch(fetchAllUsers({ size: size, page: page }));
      }
    });
  };
  useEffect(() => {
    dispatch(fetchAllUsers({ size: size, page: page }));
  }, []);

  useEffect(() => {
    if (
      (hasEnoughCredits === true && cudUserMessage) ||
      (hasEnoughCredits === null && cudUserMessage)
    ) {
      messageApi.open({
        key: "updatabale",
        type: "success",
        content: cudUserMessage,

        duration: 3,
        icon: (
          <CheckCircleOutlined style={{ color: "#ff5900", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetCUDUserData());
    } else if (cudUsererror) {
      messageApi.open({
        key: "updatabale",
        type: "error",
        content: cudUsererror,
        duration: 3,
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetCUDUserData());
    }
  }, [cudUserMessage, cudUsererror]);

  useEffect(() => {
    if (hasEnoughCredits === false) {
      setPushToSubscriptionModalOpen(true);
    }
  }, [hasEnoughCredits]);

  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text) => (text == null ? "--" : text),
      key: "phone",
      // align: "center",
    },
    {
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <div className={styles.actions}>
          <EditOutlined
            onClick={() => {
              setOpen(true);
              setEditUserData(record);
            }}
          />
          <Popconfirm
            open={record?.id === editUserData?.id && deletePopConfirmOpen}
            title="Delete the User"
            description="Are you sure to delete this user ?"
            placement="left"
            onConfirm={() => handleDeleteUser(record)}
            onCancel={() => {
              setEditUserData(null);
              setDeletePopConfirmOpen(false);
            }}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            okButtonProps={{
              loading: cudUserloading,
              disabled: cudUserloading,
            }}
            cancelButtonProps={{
              disabled: cudUserloading,
            }}
          >
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => {
                setEditUserData(record);
                setDeletePopConfirmOpen(true);
              }}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <div className={styles.container_1}>
          <p className="text_large bold">List of Users</p>
          <button
            className="btn_small btn_primary"
            onClick={() => setOpen(true)}
          >
            Create User
          </button>
        </div>

        {loading && page === 1 && !users && !error ? (
          <Loader size={50} />
        ) : (
          <></>
        )}
        {!loading && !users && error ? (
          <div className={styles.error}>
            <Error message={error} errorCode={errorCode} />
          </div>
        ) : (
          <></>
        )}
        {users && !error && (
          <div className={styles.container_2}>
            <ConfigProvider
              renderEmpty={() => (
                <Empty description={<p>There are no users to display</p>} />
              )}
            >
              <Table
                columns={columns}
                dataSource={users?.data}
                scroll={{ y: 350 }}
                pagination={false}
                loading={{ indicator: <Loader />, spinning: loading }}
              />
            </ConfigProvider>
            {users?.total_records > size && (
              <Pagination
                page={page}
                setPage={setPage}
                size={size}
                setSize={setSize}
                dataLength={users?.data?.length}
                lastPage={users?.last_page}
                totalRecords={users?.total_records}
              />
            )}
          </div>
        )}
      </div>
      <CreateUpdateUserModal
        open={open}
        setOpen={setOpen}
        editUserData={editUserData}
        cudUserloading={cudUserloading}
        setEditUserData={setEditUserData}
      />

      <PushToSubscriptionModal
        open={pushToSubscriptionModalOpen}
        message={cudUserMessage}
        handleSubscribe={() => {
          setPushToSubscriptionModalOpen(false);
          dispatch(resetCUDUserData());
          router.push("/subscription");
        }}
      />
    </>
  );
};

export default Users;
