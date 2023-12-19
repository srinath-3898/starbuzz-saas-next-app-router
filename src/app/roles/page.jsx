"use client";
import {
  fetchRolesByName,
  getRolesByOrganisation,
} from "@/store/roles/rolesActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Roles.module.css";
import AssignTask from "../../assets/svgs/assignTask.svg";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Empty,
  Popconfirm,
  Table,
  Tooltip,
  message,
} from "antd";
import { deleteRole } from "@/store/role/roleActions";
import { fetchAllUsers, fetchUserByName } from "@/store/users/usersActions";
import { getAllBrands, fetchBrandsbyName } from "@/store/brands/brandsActions";
import {
  assignBrandUserRole,
  getRolesAssignedUsers,
  unassignBrandUserRole,
} from "@/store/brandUserRoles/brandUserRolesActions";
import { resetAssingRoleToUserData } from "@/store/brandUserRoles/brandUserRolesSlice";
import { resetSearchedUsersData } from "@/store/users/usersSlice";
import { resetSearchedRolesData } from "@/store/roles/rolesSlice";
import Image from "next/image";
import Error from "@/components/Error/Error";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import CreateRoleModal from "@/components/Modals/CreateRoleModal/CreateRoleModal";
import { useRouter } from "next/navigation";

const Roles = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { organisation } = useSelector((state) => state.auth);
  const {
    loading,
    roles,
    searchedRolesLoading,
    searchedRoles,
    error,
    getRolesByOrganisationErrorCode,
  } = useSelector((state) => state.roles);

  const {
    loading: usersLoading,
    users,
    searchedusersLoading,
    searchedUsers,
    error: usersError,
  } = useSelector((state) => state.users);

  const {
    loading: brandsLoading,
    brands,
    searchedbrands,
    searchedbrandsLoading,
    error: brandsError,
  } = useSelector((state) => state.brands);

  const {
    loading: brandUserRolesLoading,
    assignLoading,
    unassignLoading,
    message: brandUserRolesMessage,
    error: brandUserRolesError,
    assignedroles,
    errorCode,
  } = useSelector((state) => state.brandUserRoles);

  const [createRoleModalOpen, setCreateRoleModalOpen] = useState(false);
  const [roleName, setRoleName] = useState(null);
  const [usersOptions, setUsersOptions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [roleId, setRoleId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [unassignSize, setUnassignSize] = useState(5);
  const [unassignPage, setUnassignPage] = useState(1);

  const handleCreateRole = () => {
    setRoleId(null);
    setRoleName(null);
    setCreateRoleModalOpen(true);
  };

  const handleUpdateRole = (roleId, roleName) => {
    setRoleId(roleId);
    setRoleName(roleName);
    setCreateRoleModalOpen(true);
  };

  const handleDeletRole = (roleId) => {
    dispatch(deleteRole(roleId)).then(() => {
      setRolesOptions([]);
      dispatch(getRolesByOrganisation({ size: 5, page: 1 }));
    });
  };

  const handleAssignRole = () => {
    if (userId && brandId && roleId) {
      dispatch(assignBrandUserRole({ userId, roleId, brandId })).then(() => {
        dispatch(
          getRolesAssignedUsers({ size: size, page: unassignPage })
        ).then(() => {
          setBrandId(null);
          setUserId(null);
          setRoleId(null);
        });
      });
    }
  };

  const onUsersPopupScroll = (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      if (
        users &&
        users?.current_page < users?.last_page &&
        usersOptions?.length < users?.total_records
      ) {
        dispatch(fetchAllUsers({ size: 5, page: users?.current_page + 1 }));
      }
    }
  };

  const onBrandsPopupScroll = (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      if (
        brands &&
        brands?.current_page < brands?.last_page &&
        brandsOptions?.length < brands?.total_records
      ) {
        dispatch(getAllBrands({ size: 5, page: brands?.current_page + 1 }));
      }
    }
  };

  const hanedleUnAssign = (brandId, userId, roleId) => {
    dispatch(unassignBrandUserRole({ brandId, userId, roleId })).then(() => {
      dispatch(getRolesAssignedUsers({ size: size, page: unassignPage }));
    });
  };

  const handleRedirectToUsers = () => {
    router.push("/users");
  };

  const handleOnSearch = (value) => {
    if (value.length > 1) {
      dispatch(fetchBrandsbyName({ search: value }));
    }
  };

  const handleOnSearchUsers = (value) => {
    if (value.length > 1) {
      dispatch(fetchUserByName({ search: value }));
    }
  };

  const handleOnSearchRoles = (value) => {
    if (value.length > 1) {
      dispatch(fetchRolesByName({ search: value }));
    }
  };

  const handleMouseLeave = () => {
    dispatch(resetSearchedUsersData());
    dispatch(resetSearchedRolesData());
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "dataIndex",
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
      width: 200,
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className={styles.actions}>
          <div className={`${styles.cell}`}>
            <Tooltip title={"Update Role"}>
              <div onClick={() => handleUpdateRole(record?.id, record?.name)}>
                <EditOutlined style={{ color: "#ff5900" }} />
              </div>
            </Tooltip>
          </div>

          <div className={`${styles.cell}`}>
            <Popconfirm
              description="Are you sure to delete this role?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeletRole(record?.id)}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
        </div>
      ),
      width: 200,
    },
  ];

  const unassigncolumns = [
    {
      title: "Brand Name",
      dataIndex: "brandname",
      key: "brandname",
      width: 100,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 100,
    },

    {
      title: "Role Name",
      dataIndex: "rolename",
      key: "rolename",
      width: 200,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <div className={styles.actions}>
          <div>
            <Popconfirm
              description="Are you sure to unassign this role?"
              okText="Yes"
              cancelText="No"
              onConfirm={() =>
                hanedleUnAssign(record?.brandId, record?.userId, record?.roleId)
              }
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <button className={`btn_small btn_primary`}>Unassign</button>
            </Popconfirm>
          </div>
        </div>
      ),
      width: 200,
    },
  ];

  useEffect(() => {
    dispatch(getRolesByOrganisation({ size: size, page: page }));
    dispatch(fetchAllUsers({ size: 5, page: 1 }));
    dispatch(getAllBrands({ size: 5, page: 1 }));
  }, [size, page]);

  useEffect(() => {
    if (roles && roles?.current_page === 1 && rolesOptions?.length === 0) {
      const rolesOptions = roles?.data;
      setRolesOptions([...rolesOptions]);
    } else if (
      roles &&
      roles?.current_page > 1 &&
      rolesOptions?.length < roles?.total_records
    ) {
      const rolesOptions = roles?.data;
      setRolesOptions((prevState) => [...prevState, ...rolesOptions]);
    }
  }, [roles]);

  useEffect(() => {
    if (users && users?.current_page === 1 && usersOptions?.length === 0) {
      const usersOptions = users?.data;
      setUsersOptions([...usersOptions]);
    } else if (
      users &&
      users?.current_page > 1 &&
      usersOptions?.length < users?.total_records
    ) {
      const usersOptions = users?.data;
      setUsersOptions((prevState) => [...prevState, ...usersOptions]);
    }
  }, [users]);

  useEffect(() => {
    if (organisation?.isBrand === false) {
      setBrandsOptions(JSON.parse(localStorage.getItem("brands")));
    }
  }, [brands]);

  useEffect(() => {
    dispatch(getRolesAssignedUsers({ size: unassignSize, page: unassignPage }));
  }, [unassignSize, unassignPage]);

  useEffect(() => {
    if (organisation?.isBrand) {
      setBrandId(localStorage.getItem("brandId"));
    }
  }, [organisation]);

  useEffect(() => {
    if (brandUserRolesMessage) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: brandUserRolesMessage && brandUserRolesMessage,
        duration: 3,
        icon: brandUserRolesMessage ? (
          <CheckCircleOutlined style={{ color: "#ff5900", fontSize: "16px" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetAssingRoleToUserData());
    }
  }, [brandUserRolesMessage]);

  return (
    <>
      {contextHolder}
      {!loading && !roles && error ? (
        <Error message={error} errorCode={getRolesByOrganisationErrorCode} />
      ) : (
        <></>
      )}
      {loading && !roles && !error ? (
        <Loader color={"#ff5900"} size={"50px"} />
      ) : (
        <></>
      )}
      {!loading && roles && !error ? (
        <>
          <div className={styles.roles_a_createroles}>
            <div className={styles.createroles}>
              <div className={styles.data_table}>
                <div className={styles.create_role}>
                  <p
                    className={`text_large bold ${styles.text_color_1} ${styles.extra_margin1}`}
                  >
                    Create and Update Roles
                  </p>
                  <div id="createrole" className={styles.assign_btn}>
                    <button
                      className={`btn_small btn_primary`}
                      onClick={handleCreateRole}
                    >
                      Create Role
                    </button>
                  </div>
                </div>
                <div>
                  <ConfigProvider
                    renderEmpty={() => (
                      <Empty
                        description={
                          <div>
                            <p>There are no Roles to display</p>
                            <p
                              onClick={handleCreateRole}
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "blue",
                                fontSize: "16px",
                                fontWeight: "200",
                              }}
                            >
                              Click here to Create Roles
                            </p>
                          </div>
                        }
                      />
                    )}
                  >
                    <Table
                      columns={columns}
                      dataSource={roles?.data}
                      pagination={false}
                      loading={{
                        indicator: <Loader size={"30px"} />,
                        spinning: loading,
                      }}
                      scroll={{ y: 300 }}
                      style={{ height: "350px" }}
                    />
                  </ConfigProvider>
                </div>

                {/* Pagination */}
                {roles?.total_records > 3 ? (
                  <Pagination
                    page={page}
                    setPage={setPage}
                    size={size}
                    setSize={setSize}
                    lastPage={roles?.last_page}
                    loading={loading}
                    totalRecords={roles?.total_records}
                    dataLength={roles?.data?.length}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={styles.assign}>
              <div className={styles.assign_title}>
                {organisation?.isBrand ? (
                  <p
                    className={`text_large bold ${styles.text_color_1} ${styles.extra_margin}`}
                  >
                    Assign Roles to Users
                  </p>
                ) : (
                  <p
                    className={`text_large bold ${styles.text_color_1} ${styles.extra_margin}`}
                  >
                    Assign Roles and Brands to Users
                  </p>
                )}
              </div>
              <div className={styles.assign_roles_to_user}>
                <div className={styles.assign_inputs}>
                  <div className={styles.assign_input1}>
                    <p className={`text_medium bold ${styles.text_color}`}>
                      Select Role
                    </p>
                    <SingleSelect
                      width={"100%"}
                      placeHolder={"Please select a role"}
                      options={
                        !!searchedRoles?.data
                          ? searchedRoles?.data
                          : rolesOptions
                      }
                      optionValue={"id"}
                      optionLabel={"name"}
                      selectedOption={roleId}
                      onChange={(value) => {
                        setRoleId(value);
                      }}
                      loading={searchedRolesLoading || loading}
                      // onPopupScroll={onRolesPopupScroll}
                      showSearch={true}
                      onSearch={(value) => handleOnSearchRoles(value)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                  <div className={styles.assign_input2}>
                    <p className={`text_medium bold ${styles.text_color}`}>
                      Select User
                    </p>
                    <SingleSelect
                      width={"100%"}
                      placeHolder={"Please select a user"}
                      options={
                        !!searchedUsers?.data
                          ? searchedUsers?.data
                          : usersOptions
                      }
                      optionValue={"id"}
                      optionLabel={"fullName"}
                      selectedOption={userId}
                      onChange={(value) => {
                        setUserId(value);
                      }}
                      loading={searchedusersLoading || usersLoading}
                      onPopupScroll={onUsersPopupScroll}
                      showSearch={true}
                      onSearch={(value) => handleOnSearchUsers(value)}
                      onMouseLeave={handleMouseLeave}
                    />
                  </div>
                  {!organisation?.isBrand ? (
                    <div className={styles.assign_input3}>
                      <p className={`text_medium bold ${styles.text_color}`}>
                        Select Brand
                      </p>
                      <SingleSelect
                        width={"100%"}
                        placeHolder={"Please select a brand"}
                        options={
                          !!searchedbrands
                            ? searchedbrands?.data
                            : brandsOptions
                        }
                        optionValue={"id"}
                        optionLabel={"name"}
                        selectedOption={brandId}
                        onChange={(value) => {
                          setBrandId(value);
                        }}
                        loading={searchedbrandsLoading || usersLoading}
                        onPopupScroll={onBrandsPopupScroll}
                        showSearch={true}
                        onSearch={(value) => handleOnSearch(value)}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={styles.assign_btn}>
                    <button
                      className={`btn_small btn_primary`}
                      onClick={handleAssignRole}
                      disabled={assignLoading}
                    >
                      {assignLoading ? (
                        <Loader color={"#FF5900"} size={"16px"} />
                      ) : (
                        "Assign"
                      )}
                    </button>
                  </div>
                  <div className={styles.assigntask}>
                    <Image
                      // src="https://cdni.iconscout.com/illustration/premium/thumb/assignment-deadline-4036122-3345603.png"
                      src={AssignTask}
                      height={140}
                      width={250}
                      alt="assign"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.unassign}>
            <div className={styles.unassign_title}>
              {organisation?.isBrand ? (
                <p className={`text_large bold ${styles.text_color_1} `}>
                  Unassign Roles to Users
                </p>
              ) : (
                <p className={`text_large bold ${styles.text_color_1}`}>
                  Unassign Roles and Brands to Users
                </p>
              )}
            </div>
            {!loading && !assignedroles && brandUserRolesError ? (
              <Error message={brandUserRolesError} errorCode={errorCode} />
            ) : (
              <></>
            )}

            {!error && assignedroles && !unassignLoading && (
              <div className={styles.unassign_roles_table}>
                <div>
                  <ConfigProvider
                    renderEmpty={() => (
                      <Empty
                        description={
                          <div>
                            <p>
                              There are no roles and brands assigned to users to
                              display
                            </p>
                            <span
                              onClick={
                                users?.data?.length > 0
                                  ? handleCreateRole
                                  : handleRedirectToUsers
                              }
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "blue",
                                fontSize: "16px",
                                fontWeight: "200",
                              }}
                            >
                              {users?.data?.length > 0 &&
                              brands?.data?.length > 0
                                ? "Click here to Create and Assign Roles"
                                : "Click here to Create Users"}
                            </span>
                          </div>
                        }
                      />
                    )}
                  >
                    <Table
                      columns={unassigncolumns}
                      dataSource={assignedroles?.data}
                      pagination={false}
                      loading={{
                        indicator: <Loader size={"30px"} />,
                        spinning: brandUserRolesLoading,
                      }}
                      scroll={{ y: 300 }}
                    />
                  </ConfigProvider>
                </div>

                {assignedroles?.total_records > 5 ? (
                  <Pagination
                    page={unassignPage}
                    setPage={setUnassignPage}
                    size={unassignSize}
                    setSize={setUnassignSize}
                    lastPage={assignedroles?.last_page}
                    loading={brandUserRolesLoading}
                    totalRecords={assignedroles?.total_records}
                    dataLength={assignedroles?.data?.length}
                  />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
      <CreateRoleModal
        open={createRoleModalOpen}
        setOpen={setCreateRoleModalOpen}
        roleId={roleId}
        roleName={roleName}
      />
    </>
  );
};

export default Roles;
