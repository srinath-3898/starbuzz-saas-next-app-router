"use client";
import {
  getAllFeatures,
  getFeaturesByOrgRole,
} from "@/store/features/featuresActions";
import {
  CheckCircleOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CreateRoleModal.module.css";
import { createRole, updateRole } from "@/store/role/roleActions";
import { resetRoleData } from "@/store/role/roleSlice";
import {
  resetAllFeaturesData,
  resetOrgRoleFeaturesData,
} from "@/store/features/featuresSlice";
import { getRolesByOrganisation } from "@/store/roles/rolesActions";
import Loader from "@/components/Loader/Loader";

const CreateRoleModal = ({ open, setOpen, roleId, roleName }) => {
  const dispatch = useDispatch();

  const {
    loading: featuresLoading,
    allFeatures,
    orgRoleFeatures,
    error,
  } = useSelector((state) => state.features);

  const { loading, cudRoleMessage, cudRoleError } = useSelector(
    (state) => state.role
  );

  const [createRoleData, setCreateRoleData] = useState({
    role: "",
    permissions: [],
  });
  const [errors, setErrors] = useState({ roleName: "", permissions: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const handleRoleNameChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevState) => ({ ...prevState, roleName: "" }));
    setCreateRoleData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCloseError = (name) => {
    setErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleAddFeature = (id) => {
    let updatedPermissions = createRoleData?.permissions?.map((permission) => {
      if (id === permission.featureId) {
        return { ...permission, selected: !permission?.selected };
      }
      return permission;
    });
    updatedPermissions = updatedPermissions.map((permission) => {
      if (permission.featureId === id && permission.selected === false) {
        return { ...permission, read: false, write: false, remove: false };
      }
      return permission;
    });
    setCreateRoleData((prevState) => ({
      ...prevState,
      permissions: updatedPermissions,
    }));
    setErrors((prevState) => ({ ...prevState, permissions: "" }));
  };

  const handleAddPermission = (id, name) => {
    const updatedPermissions = createRoleData?.permissions?.map(
      (permission) => {
        if (id === permission?.featureId) {
          return { ...permission, [name]: !permission[name] };
        }
        return permission;
      }
    );
    setCreateRoleData((prevState) => ({
      ...prevState,
      permissions: updatedPermissions,
    }));
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(resetOrgRoleFeaturesData());
    dispatch(resetAllFeaturesData());
  };

  const validateSubmit = () => {
    const errors = {};
    let count = 0;
    for (let i = 0; i < createRoleData.permissions.length; i++) {
      if (createRoleData.permissions[i].selected === true) {
        count = 1;
        break;
      }
    }
    if (createRoleData.role.length <= 0) {
      errors.roleName = "Role name can't be empty";
    } else if (count === 0) {
      errors.permissions = "Please select atleast one feature";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateRole = () => {
    if (validateSubmit()) {
      const finalPermissions = createRoleData?.permissions.filter(
        (permission) => {
          if (permission?.selected) {
            return permission;
          }
        }
      );
      dispatch(
        createRole({
          role: createRoleData?.role,
          permissions: finalPermissions,
        })
      ).then((response) => {
        if (response?.payload?.data?.status) {
          dispatch(getRolesByOrganisation({ size: 5, page: 1 }));
        }
        setOpen(false);
      });
    }
  };

  const handleUpdateRole = () => {
    if (validateSubmit()) {
      const finalPermissions = createRoleData?.permissions.filter(
        (permission) => {
          if (permission?.selected) {
            return permission;
          }
        }
      );
      dispatch(
        updateRole({
          roleId,
          updateRoleData: {
            role: createRoleData?.role,
            permissions: finalPermissions,
          },
        })
      ).then((response) => {
        if (response?.payload?.data?.status) {
          dispatch(getRolesByOrganisation({ size: 5, page: 1 }));
          setOpen(false);
        }
      });
    }
  };

  const columns = [
    {
      title: "Select / Unselect",
      dataIndex: "select",
      key: "select",
      width: 150,
      render: (text, permission) => (
        <div key={permission?.id}>
          {permission?.selected ? (
            <p
              className={styles.icon}
              onClick={() => handleAddFeature(permission?.featureId)}
            >
              <DeleteOutlined
                style={{
                  fontSize: "25px",
                  color: "#ff5900",
                }}
              />
            </p>
          ) : (
            <p
              className={styles.icon}
              onClick={() => handleAddFeature(permission?.featureId)}
            >
              <PlusCircleOutlined
                style={{
                  fontSize: "25px",
                  color: "#d0d0d0",
                }}
              />
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Feature Name",
      dataIndex: "featurename",
      key: "featurename",
      width: 150,
      render: (text, permission) => (
        <div className={styles.feature_name}>
          <p>{permission?.featureName}</p>
        </div>
      ),
    },

    {
      title: "Read",
      dataIndex: "read",
      key: "read",
      render: (text, permission) => (
        <div>
          <p
            className={` ${
              permission?.selected ? styles.icon : styles.icon_disabled
            }`}
            onClick={() => {
              if (permission?.selected) {
                handleAddPermission(permission?.featureId, "read");
              }
            }}
          >
            <CheckCircleOutlined
              style={{
                fontSize: "25px",
                color: permission?.read ? "darkgreen" : "#d0d0d0",
              }}
            />
          </p>
        </div>
      ),
      width: 100,
    },

    {
      title: "Create & Update",
      dataIndex: "createAupdate",
      key: "createAupdate",
      render: (text, permission) => (
        <div>
          <p
            className={` ${
              permission?.selected ? styles.icon : styles.icon_disabled
            }`}
            onClick={() => {
              if (permission?.selected) {
                handleAddPermission(permission?.featureId, "write");
              }
            }}
          >
            <CheckCircleOutlined
              style={{
                fontSize: "25px",
                color: permission?.write ? "darkgreen" : "#d0d0d0",
              }}
            />
          </p>
        </div>
      ),
      width: 150,
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, permission) => (
        <div>
          <p
            className={` ${
              permission?.selected ? styles.icon : styles.icon_disabled
            }`}
            onClick={() => {
              if (permission?.selected) {
                handleAddPermission(permission?.featureId, "remove");
              }
            }}
          >
            <CheckCircleOutlined
              style={{
                fontSize: "25px",
                color: permission?.remove ? "darkgreen" : "#d0d0d0",
              }}
            />
          </p>
        </div>
      ),
      width: 100,
    },
  ];

  useEffect(() => {
    if (open) {
      dispatch(getAllFeatures()).then(() => {
        if (roleId) {
          setCreateRoleData((prevState) => ({ ...prevState, role: roleName }));
          dispatch(getFeaturesByOrgRole(roleId));
        }
      });
    }
  }, [open, roleId]);

  useEffect(() => {
    if (allFeatures) {
      const filteredFeatures = allFeatures?.filter(
        (feature) => feature?.has_access_control
      );
      setCreateRoleData((prevState) => ({
        ...prevState,
        role: "",
        permissions: filteredFeatures?.map((feature) => ({
          featureId: feature.id,
          featureName: feature.name,
          selected: false,
          read: false,
          write: false,
          remove: false,
        })),
      }));
    }
  }, [allFeatures]);

  useEffect(() => {
    if (orgRoleFeatures && roleId) {
      const updatedPermissions = createRoleData?.permissions.map(
        (permission) => {
          const matchingFeature = orgRoleFeatures?.find(
            (feature) => feature?.id === permission?.featureId
          );
          if (matchingFeature) {
            const { read, write, remove } = matchingFeature.permissions;
            return {
              ...permission,
              selected: true,
              read,
              write,
              remove,
            };
          }
          return permission;
        }
      );
      setCreateRoleData((prevState) => ({
        ...prevState,
        permissions: updatedPermissions,
      }));
    }
  }, [orgRoleFeatures, roleId]);

  useEffect(() => {
    if (cudRoleMessage || cudRoleError) {
      messageApi.open({
        key: "updatable",
        type: "success",
        content: cudRoleMessage ? cudRoleMessage : cudRoleError,
        duration: 3,
        icon: cudRoleMessage ? (
          <CheckCircleOutlined style={{ color: "#ff5900", fontSize: "16px" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
        ),
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetRoleData());
    }
  }, [cudRoleMessage, cudRoleError]);

  return (
    <>
      {contextHolder}
      <Modal
        title={roleId ? "Update role" : "Create a role"}
        open={open}
        maskClosable={false}
        closable={false}
        footer={null}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {featuresLoading ? (
          <div className={styles.create_role_modal}>
            <div className={styles.loader}>
              <Loader color={"#FF5900"} size={"50px"} />
            </div>
          </div>
        ) : error ? (
          <div className={`error`}>
            <p>{error}</p>
          </div>
        ) : (
          <div className={styles.create_role_modal}>
            <div className={styles.input_controller}>
              <p>Role name</p>
              <input
                type="text"
                placeholder="Role name"
                name="role"
                value={createRoleData?.role}
                onChange={handleRoleNameChange}
              />
              {errors?.roleName || errors?.permissions ? (
                <div className={styles.error}>
                  <p>
                    {errors.roleName ? errors.roleName : errors.permissions}
                  </p>
                  <p
                    onClick={() =>
                      handleCloseError(
                        errors.roleName ? "roleName" : "permissions"
                      )
                    }
                  >
                    <CloseCircleFilled style={{ fontSize: "12px" }} />
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.features_table}>
              <div>
                <Table
                  columns={columns}
                  dataSource={createRoleData?.permissions}
                  pagination={false}
                  scroll={{ y: 300 }}
                />
              </div>
            </div>
            <div className={styles.btns}>
              <button
                className={`btn_small btn_secondary`}
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className={`btn_small btn_primary`}
                onClick={roleId ? handleUpdateRole : handleCreateRole}
                disabled={loading}
              >
                {loading ? (
                  <Loader color={"white"} size={16} />
                ) : roleId ? (
                  "Update role"
                ) : (
                  "Create role"
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default CreateRoleModal;
