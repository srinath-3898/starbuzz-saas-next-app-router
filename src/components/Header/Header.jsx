"use client";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Image from "next/image";
import userSvg from "../../assets/svgs/user.svg";
import subscriptionSvg from "../../assets/svgs/Subscription.svg";
import Feedbacks from "../../assets/svgs/feedBacks.svg";
import { Select, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { getAllBrands } from "@/store/brands/brandsActions";
import {
  setBrandId,
  setRoleId,
} from "@/store/globalVariables/globalVariablesSlice";
import { getRolesByUser } from "@/store/roles/rolesActions";
import FeedbackDrawer from "../Drawers/FeedbackDrawer/FeedbackDrawer";
import { usePathname, useRouter } from "next/navigation";
import SearchInfluencers from "../SearchInfluencers/SearchInfluencers";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathNames = usePathname()
    .split("/")
    .filter((pathname) => pathname);

  const { loading, user, organisation, isAdmin } = useSelector(
    (state) => state.auth
  );

  const { brandId } = useSelector((state) => state.globalVariables);

  const { loading: brandsLoading, brands } = useSelector(
    (state) => state.brands
  );
  const { loading: rolesLoading, roles } = useSelector((state) => state.roles);

  const [pageName, setPageName] = useState("");
  const [brandsOptions, setBrandsOptions] = useState([]);
  const [rolesOptions, setRolesOptions] = useState([]);
  const [feedbackDrawerOpen, setFeedbackDrawerOpen] = useState(false);

  const getPageName = () => {
    if (pathNames.length > 0) {
      const pageName =
        pathNames[0] !== "login" &&
        pathNames[0] !== "signup" &&
        pathNames[0] !== undefined &&
        pathNames[0] !== null
          ? pathNames[0]
          : "";
      setPageName(`${pageName[0]?.toUpperCase()}${pageName?.slice(1)}`);
    }
  };

  const createOptions = [
    {
      key: "1",
      label: isAdmin ? (
        <div
          className={styles.item}
          onClick={() =>
            router.push({
              pathname: "/roles",
            })
          }
        >
          <PlusCircleOutlined style={{ fontSize: "20px" }} />
          <p className="text_small">Create Role</p>
        </div>
      ) : (
        <Link href="/campaigns/createcampaign">
          <div className={styles.item}>
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create Campaign</p>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label:
        isAdmin && !organisation?.isBrand ? (
          <div
            className={styles.item}
            onClick={() =>
              router.push({
                pathname: "/brands",
              })
            }
          >
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create Brand</p>
          </div>
        ) : organisation?.isBrand ? (
          <div
            className={styles.item}
            onClick={() =>
              router.push({
                pathname: "/users",
              })
            }
          >
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create User</p>
          </div>
        ) : (
          <div
            className={styles.item}
            onClick={() =>
              router.push({
                pathname: "/lists",
              })
            }
          >
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create List</p>
          </div>
        ),
    },
    {
      key: "3",
      label:
        isAdmin && !organisation?.isBrand ? (
          <div
            className={styles.item}
            onClick={() =>
              router.push({
                pathname: "/users",
              })
            }
          >
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create User</p>
          </div>
        ) : null,
    },
    {
      key: "4",
      label: isAdmin ? (
        <Link href="/campaigns/createcampaign">
          <div className={styles.item}>
            <PlusCircleOutlined style={{ fontSize: "20px" }} />
            <p className="text_small">Create Campaign</p>
          </div>
        </Link>
      ) : null,
    },
    {
      key: "5",
      label: isAdmin ? (
        <div
          className={styles.item}
          onClick={() =>
            router.push({
              pathname: "/lists",
            })
          }
        >
          <PlusCircleOutlined style={{ fontSize: "20px" }} />
          <p className="text_small">Create List</p>
        </div>
      ) : null,
    },
  ];

  const profileOptions = [
    {
      key: "1",
      label: (
        <Link href={"/profile"}>
          <div className={styles.item}>
            <Image src={userSvg} alt="settings icon" />
            <p className="text_small">Profile</p>
          </div>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href={"/subscription"}>
          <div className={styles.item}>
            <Image src={subscriptionSvg} alt="subscription icon" />
            <p className="text_small">Subscription</p>
          </div>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className={styles.item}
          onClick={() => setFeedbackDrawerOpen(!feedbackDrawerOpen)}
        >
          <Image src={Feedbacks} alt="feedbacks Icon" />
          <p className="text_small">Feedback</p>
        </div>
      ),
    },
  ];

  const onPopupScroll = (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      if (
        isAdmin &&
        brands &&
        brands?.current_page < brands?.last_page &&
        brandsOptions?.length < brands?.total_records
      ) {
        dispatch(getAllBrands({ size: 5, page: brands?.current_page + 1 }));
      } else if (
        !isAdmin &&
        roles &&
        roles?.current_page < roles?.last_page &&
        rolesOptions?.length < roles?.total_records
      ) {
        dispatch(getRolesByUser({ size: 5, page: roles?.current_page + 1 }));
      }
    }
  };

  useEffect(() => {
    getPageName();
  }, [pathNames]);

  useEffect(() => {
    if (isAdmin && !organisation?.isBrand && !localStorage.getItem("brands")) {
      dispatch(getAllBrands({ size: 5, page: 1 }));
    } else if (
      isAdmin === false &&
      !organisation?.isBrand &&
      !localStorage.getItem("roles")
    ) {
      dispatch(getRolesByUser({ size: 5, page: 1 }));
    }
  }, [isAdmin]);

  useEffect(() => {
    if (localStorage.getItem("brands")) {
      setBrandsOptions(JSON.parse(localStorage.getItem("brands")));
    }
  }, [brands]);

  useEffect(() => {
    if (localStorage.getItem("roles")) {
      setRolesOptions(JSON.parse(localStorage.getItem("roles")));
    }
  }, [roles]);

  useEffect(() => {
    if (organisation && isAdmin) {
      if (!localStorage.getItem("brandId")) {
        dispatch(setBrandId(organisation?.brand?.id));
      } else if (!brandId) {
        dispatch(setBrandId(organisation?.brand?.id));
      }
    } else {
      return;
    }
  }, [organisation, brandId, isAdmin]);

  useEffect(() => {
    if (!isAdmin) {
      if (!brandId) {
        const roles = JSON.parse(localStorage.getItem("roles"));
        dispatch(setRoleId(roles[0]?.roleId));
        dispatch(setBrandId(roles[0]?.value));
      }
      if (brandId) {
        const role = rolesOptions.find((role) => {
          if (role?.value === brandId) {
            return role;
          }
        });
        dispatch(setRoleId(role?.roleId));
      }
    } else {
      return;
    }
  }, [rolesOptions, brandId, isAdmin]);

  return (
    <div className={styles.container}>
      <div className={styles.container_1}>
        <p className="text_small bold">{pageName}</p>
        {organisation &&
        organisation?.isBrand === false &&
        (brandsOptions?.length > 0 || rolesOptions?.length > 0) ? (
          <div className={styles.container_1_box_2}>
            <p className="text_small" style={{ color: "#fe5900" }}>
              {brandsOptions?.length > 0 ? "Your Brands" : "Your Roles"}:
            </p>
            <Select
              style={{ width: "50%" }}
              placeholder={
                isAdmin ? "Please select any brand" : "Please select any role"
              }
              options={
                isAdmin
                  ? brandsOptions?.map((brandsOption) => ({
                      label: brandsOption?.name,
                      value: brandsOption?.id,
                    }))
                  : rolesOptions
              }
              value={brandId}
              onChange={(value) => dispatch(setBrandId(value))}
              loading={isAdmin ? brandsLoading : rolesLoading}
              onPopupScroll={onPopupScroll}
            />
          </div>
        ) : (
          <div className={styles.container_1_box_2}></div>
        )}
        <div className={styles.container_1_box_3}>
          <CustomDropdown
            items={createOptions.map((item) => {
              if (item.label !== null) {
                return item;
              }
            })}
            buttonItem={
              <PlusCircleFilled
                style={{ fontSize: "40px", color: "#fe5900" }}
              />
            }
          />
          {loading ? (
            <>
              <Skeleton.Avatar active={true} size={"large"} shape={"circle"} />
              <Skeleton.Input active={true} size={"large"} />
            </>
          ) : (
            <>
              <CustomDropdown
                items={profileOptions.map((item) => {
                  if (item.label !== null) {
                    return item;
                  }
                })}
                buttonItem={
                  <Image
                    style={{ width: "40px", height: "40px" }}
                    src={userSvg}
                    alt="Profile Picture "
                  />
                }
              />
              <div>
                <p className="text_small bold">{user?.fullName}</p>
                <p className="text_small bold" style={{ color: "#aeaeae" }}>
                  {user?.email}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <hr className={styles.horizantal_line} />
      <div className={styles.container_2}>
        <SearchInfluencers />
      </div>
      <FeedbackDrawer
        feedbackDrawerOpen={feedbackDrawerOpen}
        setFeedbackDrawerOpen={setFeedbackDrawerOpen}
      />
    </div>
  );
};

export default Header;
