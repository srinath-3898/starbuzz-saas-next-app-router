"use client";
import { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm, Table, Tooltip } from "antd";
import { resetBrandsData } from "@/store/brands/brandsSlice";
import { getAllBrands } from "@/store/brands/brandsActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deletBrand } from "@/store/brand/brandActions";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Loader from "@/components/Loader/Loader";
import Error from "@/components/Error/Error";
import Pagination from "@/components/Pagination/Pagination";
import CreateBrandModal from "../CreateBrandModal/CreateBrandModal";

const Brands = () => {
  const dispatch = useDispatch();

  const [size, setSize] = useState(10);
  const [brandId, setBrandId] = useState(null);
  const [createBrandModalOpen, setCreateBrandModalOpen] = useState(false);
  const [brand, setBrand] = useState(null);
  const [page, setPage] = useState(1);

  const { loading, brands, error, errorCode } = useSelector(
    (state) => state.brands
  );

  const { cudLoading } = useSelector((state) => state.brand);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      key: "phone",
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
          <Tooltip title="Update Brand" placement="top">
            <EditOutlined onClick={() => handleUpdateBrand(record)} />
          </Tooltip>
          <Popconfirm
            open={brandId === record?.id}
            description="Are you sure to delete this Brand?"
            onCancel={() => setBrandId(null)}
            onConfirm={() => handleDeleteBrand(record?.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
            okButtonProps={{
              loading: cudLoading,
              disabled: cudLoading,
            }}
            cancelButtonProps={{ disabled: cudLoading }}
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => setBrandId(record?.id)}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleCreateBrand = () => {
    setBrand(null);
    setCreateBrandModalOpen(true);
  };

  const handleUpdateBrand = (record) => {
    setBrand(record);
    setCreateBrandModalOpen(true);
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deletBrand(brandId)).then((response) => {
      if (response?.payload?.status === 200) {
        localStorage.removeItem("brands");
        localStorage.removeItem("brandId");
        dispatch(getAllBrands({ size: 5, page: 1 })).then(() => {});
      }
    });
  };

  useEffect(() => {
    dispatch(resetBrandsData());
    dispatch(getAllBrands({ size: size, page: page }));
  }, [size, page]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_1}>
          <p className="text_large bold">List of Brands</p>
          <button className="btn_small btn_primary" onClick={handleCreateBrand}>
            Create Brand
          </button>
        </div>

        {loading && page === 1 && !brands && !error ? (
          <Loader size={50} />
        ) : (
          <></>
        )}
        {!loading && !brands && error ? (
          <div className={styles.error}>
            <Error errorCode={errorCode} message={error} />
          </div>
        ) : (
          <></>
        )}
        {brands && !loading && !error ? (
          <div className={styles.brands_container}>
            <Table
              columns={columns}
              dataSource={brands?.data}
              pagination={false}
              scroll={{ y: 350 }}
              loading={{ indicator: <Loader />, spinning: loading }}
            />
          </div>
        ) : (
          <></>
        )}

        {brands?.data?.length > 0 && (
          <Pagination
            page={page}
            setPage={setPage}
            size={size}
            setSize={setSize}
            lastPage={brands?.last_page}
            loading={loading}
            totalRecords={brands?.total_records}
            dataLength={brands?.data?.length}
          />
        )}
      </div>
      <CreateBrandModal
        open={createBrandModalOpen}
        setOpen={setCreateBrandModalOpen}
        brand={brand}
      />
    </>
  );
};

export default Brands;
