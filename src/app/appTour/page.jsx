"use client";
import {
  ApartmentOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  TeamOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AppTour.module.css";
import Profile from "../../assets/svgs/Profile.svg";
import Settings from "../../assets/svgs/Settings.svg";
import Subscription from "../../assets/svgs/Subscription.svg";
import { getUserDetails, updateAppTour } from "@/store/auth/authActions";
import Loader from "@/components/Loader/Loader";
import ReportsIcon from "@/components/ReportsIcon/ReportsIcon";
import CampaignsIcon from "@/components/CampaignsIcon/CampaignsIcon";
import ListsIcon from "@/components/ListsIcon/ListsIcon";
import DiscoveryIcon from "@/components/DiscoveryIcon/DiscoveryIcon";
import DashboardIcon from "@/components/DashboardIcon/DashboardIcon";
import Logo from "../../assets/svgs/logo.svg";
import Image from "next/image";
import { Select, Tour, message } from "antd";
import Assistance from "@/components/Assistance/Assistance";
import CustomDropdown from "@/components/CustomDropdown/CustomDropdown";

const Apptour = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    user,
    isAdmin,
    organisation,
    appTourLoading,
    appTourMessage,
    appTourError,
  } = useSelector((state) => state.auth);

  const [tourOpen, setTourOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);
  const ref10 = useRef(null);
  const ref11 = useRef(null);

  const agencyAdminSteps = [
    {
      title: "Brands Dropdown",
      description:
        " Effortlessly explore and switch between your organization's diverse brands from this dropdown",
      target: () => ref1.current,
    },
    {
      title: "Create Dropdown",
      description:
        "From here, you can create a List, Campaign, Brand, User, or Role. Simply click or hover on the plus button to reveal the available options.",
      target: () => ref2.current,
    },
    {
      title: "Profile & Subscriptions",
      description:
        "From here, you can navigate to the Profile and Subscription pages. Simply click or hover on the Profile Icon to explore the available options.",
      target: () => ref3.current,
    },
    {
      title: "Dashboard ",
      description:
        "Dashboard showcases two YouTube videos: one guides Discovery feature use, while the other previews report content and how it looks like.",
      target: () => ref4.current,
    },
    {
      title: "Discovery",
      description:
        "Discover influencers effortlessly with our platform's advanced filters—narrow down your search based on Niche, Influencer City, gender, age, Audience Location, Audience Age, Audience Interests, Audience Gender, Followers Range, ER (Engagement Rate), and SB (StarBuzz) Score for precise and tailored results.",
      target: () => ref5.current,
    },
    {
      title: "Lists",
      description:
        "Effortlessly manage your influencer network! Create, add, and delete influencers from custom lists with our user-friendly platform, streamlining your influencer marketing strategy.",
      target: () => ref6.current,
    },
    {
      title: "Campaigns",
      description:
        "Elevate your marketing game! Easily create and manage campaigns with our intuitive platform, streamlining the process and maximizing the impact of your strategic marketing initiatives.",
      target: () => ref7.current,
    },
    {
      title: "Roles",
      description: "Roles",
      target: () => ref8.current,
    },
    {
      title: "Brands",
      description: "Brands",
      target: () => ref9.current,
    },
    {
      title: "Users",
      description: "Users",
      target: () => ref10.current,
    },
    {
      title: "Transactions",
      description: "Transactions",
      target: () => ref11.current,
    },
  ];

  const agencyUserSteps = [
    {
      title: "Roles Dropdown",
      description: "You can select any role from this dropdown",
      target: () => ref1.current,
    },
    {
      title: "Create Dropdown",
      description:
        "From here you can create a List ,Campaign ,Brand ,User ,Role. Please click or hover on the plus button to see the options ",
      target: () => ref2.current,
    },
    {
      title: "Profile Dropdown",
      description:
        "From here you can navigate to profile and subscription pages. Please click or hover on the plus button to see the options",
      target: () => ref3.current,
    },
    {
      title: "Dashboard ",
      description: "Dashboard",
      target: () => ref4.current,
    },
    {
      title: "Discovery",
      description: "Discovery",
      target: () => ref5.current,
    },
    {
      title: "Lists",
      description: "Lists",
      target: () => ref6.current,
    },
    {
      title: "Campaigns",
      description: "Campaigns",
      target: () => ref7.current,
    },
  ];

  const brandAdminSteps = [
    {
      title: "Create Dropdown",
      description:
        "From here you can create a List ,Campaign ,Brand ,User ,Role. Please click or hover on the plus button to see the options ",
      target: () => ref2.current,
    },
    {
      title: "Profile Dropdown",
      description:
        "From here you can navigate to profile and subscription pages. Please click or hover on the plus button to see the options",
      target: () => ref3.current,
    },
    {
      title: "Dashboard ",
      description: "Dashboard",
      target: () => ref4.current,
    },
    {
      title: "Discovery",
      description: "Discovery",
      target: () => ref5.current,
    },
    {
      title: "Lists",
      description: "Lists",
      target: () => ref6.current,
    },
    {
      title: "Campaigns",
      description: "Campaigns",
      target: () => ref7.current,
    },
    {
      title: "Roles",
      description: "ROles",
      target: () => ref8.current,
    },
    {
      title: "Users",
      description: "Users",
      target: () => ref10.current,
    },
    {
      title: "Transactions",
      description: "Transactions",
      target: () => ref11.current,
    },
  ];

  const brandUserSteps = [
    {
      title: "Create Dropdown",
      description:
        "From here you can create a List ,Campaign ,Brand ,User ,Role. Please click or hover on the plus button to see the options ",
      target: () => ref2.current,
    },
    {
      title: "Profile Dropdown",
      description:
        "From here you can navigate to profile and subscription pages. Please click or hover on the plus button to see the options",
      target: () => ref3.current,
    },
    {
      title: "Dashboard ",
      description: "Dashboard",
      target: () => ref4.current,
    },
    {
      title: "Discovery",
      description: "Discovery",
      target: () => ref5.current,
    },
    {
      title: "Lists",
      description: "Lists",
      target: () => ref6.current,
    },
    {
      title: "Campaigns",
      description: "Campaigns",
      target: () => ref7.current,
    },
  ];

  const createOptions = [
    {
      key: "1",
      label: isAdmin ? (
        <div className={styles.option}>
          <PlusCircleOutlined />
          <p>Create Role</p>
        </div>
      ) : (
        <div className={styles.option}>
          <PlusCircleOutlined />
          <p>Create Campaign</p>
        </div>
      ),
    },
    {
      key: "2",
      label:
        isAdmin && !organisation?.isBrand ? (
          <div className={styles.option}>
            <PlusCircleOutlined />
            <p>Create Brand</p>
          </div>
        ) : organisation?.isBrand ? (
          <div className={styles.option}>
            <PlusCircleOutlined />
            <p>Create User</p>
          </div>
        ) : (
          <div className={styles.option} onClick={() => setOpen(true)}>
            <PlusCircleOutlined />
            <p>Create List</p>
          </div>
        ),
    },
    {
      key: "3",
      label:
        isAdmin && !organisation?.isBrand ? (
          <div className={styles.option}>
            <PlusCircleOutlined />
            <p>Create User</p>
          </div>
        ) : null,
    },
    {
      key: "4",
      label: isAdmin ? (
        <div className={styles.option}>
          <PlusCircleOutlined />
          <p>Create Campaign</p>
        </div>
      ) : null,
    },
    {
      key: "5",
      label: isAdmin ? (
        <div className={styles.option}>
          <PlusCircleOutlined />
          <p className="text_small bold">Create List</p>
        </div>
      ) : null,
    },
  ];

  const profileOptions = [
    {
      key: "1",
      label: (
        <div className={styles.option}>
          <Image src={Profile} alt="settings icon" />
          <p>Profile</p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className={styles.option}>
          <Image src={Settings} alt="settings icon" />
          <p>Settings</p>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className={styles.option}>
          <Image src={Subscription} alt="subscription icon" />
          <p>Subscription</p>
        </div>
      ),
    },
  ];

  const handleTourClose = () => {
    setTourOpen(false);
    dispatch(updateAppTour());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!user?.appTour) {
      setTourOpen(true);
    } else {
      document.cookie = `user=${JSON.stringify(user)}; path=/`;
      router.push("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    if (appTourMessage) {
      dispatch(getUserDetails());
    }
  }, [appTourMessage]);

  useEffect(() => {
    if (appTourError) {
      messageApi.open({
        content: appTourError,
        type: "error",
      });
      dispatch(resetAuthData());
    }
  }, [appTourError]);

  return isClient ? (
    <>
      {contextHolder}
      {appTourLoading ? (
        <div className={styles.loading}>
          <Loader size={50} />
        </div>
      ) : (
        <div className={styles.app_tour}>
          <div className={styles.navbar}>
            <div className={styles.navbar_content}>
              <Image src={Logo} alt="Starbuzz Logo" />
              <div className={styles.nav_link} ref={ref4}>
                <DashboardIcon />
                <p className="text_medium">DashBoard</p>
              </div>
              <div className={styles.nav_link} ref={ref5}>
                <DiscoveryIcon />
                <p className="text_medium">Discovery</p>
              </div>
              <div className={styles.nav_link} ref={ref6}>
                <ListsIcon />
                <p className="text_medium">Lists</p>
              </div>
              <div className={styles.nav_link} ref={ref7}>
                <CampaignsIcon />
                <p className="text_medium">Campaigns</p>
              </div>
              {isAdmin ? (
                <div className={styles.nav_link} ref={ref8}>
                  <TrademarkOutlined
                    style={{ fontSize: "25px", padding: "4px" }}
                  />
                  <p className="text_medium">Roles</p>
                </div>
              ) : (
                <></>
              )}
              {isAdmin && !organisation?.isBrand ? (
                <div className={styles.nav_link} ref={ref9}>
                  <ApartmentOutlined
                    style={{
                      fontSize: "25px",
                      padding: "4px",
                    }}
                  />
                  <p className="text_medium">Brands</p>
                </div>
              ) : (
                <></>
              )}
              {isAdmin ? (
                <div className={styles.nav_link} ref={ref10}>
                  <TeamOutlined style={{ fontSize: "25px", padding: "4px" }} />
                  <p className="text_medium">Users</p>
                </div>
              ) : (
                <></>
              )}
              {isAdmin ? (
                <div className={styles.nav_link} ref={ref11}>
                  <TransactionOutlined
                    style={{ fontSize: "25px", padding: "4px" }}
                  />
                  <p className="text_medium">Transactions</p>
                </div>
              ) : (
                <></>
              )}
              <div className={styles.nav_link}>
                <ReportsIcon />
                <p className="text_medium">Feedback</p>
              </div>
            </div>
          </div>
          <div className={styles.page}>
            <div className={styles.header}>
              <div className={styles.header_container_1}>
                <p className="text_medium bold">Dashboard</p>
                {!organisation?.isBrand ? (
                  <div className={styles.header_container_1_box_1} ref={ref1}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder={
                        isAdmin
                          ? "Please select any brand"
                          : "Please select any role"
                      }
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.header_container_1_box_2}>
                  <div ref={ref2}>
                    <CustomDropdown
                      items={createOptions.map((option) => {
                        if (option.label !== null) {
                          return option;
                        }
                      })}
                      buttonItem={
                        <PlusCircleFilled
                          style={{ fontSize: "35px", color: "#FF5900" }}
                        />
                      }
                    />
                  </div>
                  <div ref={ref3}>
                    <CustomDropdown
                      items={profileOptions.map((option) => {
                        if (option.label !== null) {
                          return option;
                        }
                      })}
                      buttonItem={<UserOutlined style={{ fontSize: "25px" }} />}
                    />
                  </div>
                  <div>
                    <p className="text_small bold">{user?.fullName}</p>
                    <p className="text_small"> {user?.email}</p>
                  </div>
                </div>
              </div>
              <hr className={styles.line_break} />
              <div className={styles.header_container_2}>
                <p className="text_medium">Dashboard</p>
              </div>
            </div>
            <div className={styles.page_content}>
              <Assistance />
            </div>
            <div className={styles.footer}>
              <p className="text_small bold">
                Copyright © Krisattva Pvt Ltd. All Right Reserved.
              </p>
            </div>
          </div>
          {user && !user?.appTour ? (
            <Tour
              open={tourOpen}
              onClose={handleTourClose}
              steps={
                isAdmin && !organisation?.isBrand
                  ? agencyAdminSteps
                  : !isAdmin && !organisation?.isBrand
                  ? agencyUserSteps
                  : isAdmin && organisation?.isBrand
                  ? brandAdminSteps
                  : !isAdmin && organisation?.isBrand
                  ? brandUserSteps
                  : []
              }
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  ) : (
    <></>
  );
};

export default Apptour;
