import Image from "next/image";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/svgs/logo.svg";
import {
  ApartmentOutlined,
  LeftOutlined,
  RightOutlined,
  TeamOutlined,
  TrademarkOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import DashboardIcon from "../DashboardIcon/DashboardIcon";
import { Skeleton, Tooltip } from "antd";
import DiscoveryIcon from "../DiscoveryIcon/DiscoveryIcon";
import ListsIcon from "../ListsIcon/ListsIcon";
import CampaignsIcon from "../CampaignsIcon/CampaignsIcon";
import ReportsIcon from "../ReportsIcon/ReportsIcon";
import { getFeaturesByUserRole } from "@/store/features/featuresActions";
import { setFeatures } from "@/store/globalVariables/globalVariablesSlice";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ handleClick, navbarExpand }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const pathNames = usePathname()
    .split("/")
    .filter((x) => x);

  const { loading, organisation, isAdmin } = useSelector((state) => state.auth);

  const { roleId, features } = useSelector((state) => state.globalVariables);

  const { userRoleFeatures } = useSelector((state) => state.features);

  const [activeNavlink, setActiveNavlink] = useState("");

  useEffect(() => {
    const currentPath = pathNames[0];
    setActiveNavlink(currentPath || "");
  }, [pathNames]);

  useEffect(() => {
    if (!isAdmin && roleId) {
      dispatch(getFeaturesByUserRole(roleId));
    }
  }, [roleId]);

  useEffect(() => {
    if (userRoleFeatures) {
      dispatch(setFeatures(userRoleFeatures?.map((feature) => feature?.name)));
    }
  }, [userRoleFeatures]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={logo} alt="Starbuzz Logo" width={50} height={50} />
      </div>
      <div className={styles.container_1}>
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : (
          <Tooltip title={navbarExpand ? "" : "Dashboard"} placement="right">
            <Link
              href={"/dashboard"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "dashboard" && styles.navbar_link_active}`}
            >
              <DashboardIcon activeNavlink={activeNavlink} />
              {navbarExpand ? "Dashboard" : null}
            </Link>
          </Tooltip>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin || features?.includes("Discovery") ? (
          <Tooltip title={navbarExpand ? "" : "Discovery"} placement="right">
            <Link
              href={"/discovery"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "discovery" && styles.navbar_link_active}`}
            >
              <DiscoveryIcon activeNavlink={activeNavlink} />
              {navbarExpand ? "Discovery" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin || features?.includes("List") ? (
          <Tooltip title={navbarExpand ? "" : "Lists"} placement="right">
            <Link
              href={"/lists"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "lists" && styles.navbar_link_active}`}
            >
              <ListsIcon activeNavlink={activeNavlink} />
              {navbarExpand ? "Lists" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin || features?.includes("Campaign") ? (
          <Tooltip title={navbarExpand ? "" : "Campaigns"} placement="right">
            <Link
              href={"/campaigns"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "campaigns" && styles.navbar_link_active}`}
            >
              <CampaignsIcon activeNavlink={activeNavlink} />
              {navbarExpand ? "Campaigns" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin || features?.includes("Report") ? (
          <Tooltip title={navbarExpand ? "" : "Reports"} placement="right">
            <Link
              href={"/reports"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "reports" && styles.navbar_link_active}`}
            >
              <ReportsIcon activeNavlink={activeNavlink} />
              {navbarExpand ? "Reports" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin ? (
          <Tooltip title={navbarExpand ? "" : "Roles"} placement="right">
            <Link
              href={"/roles"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "roles" && styles.navbar_link_active}`}
            >
              <TrademarkOutlined style={{ fontSize: "25px", padding: "4px" }} />
              {navbarExpand ? "Roles" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin && !organisation?.isBrand ? (
          <Tooltip title={navbarExpand ? "" : "Brands"} placement="right">
            <Link
              href={"/brands"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "brands" && styles.navbar_link_active}`}
            >
              <ApartmentOutlined
                style={{
                  fontSize: "25px",
                  padding: "4px",
                }}
              />
              {navbarExpand ? "Brands" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
        {loading ? (
          navbarExpand ? (
            <Skeleton.Button active={true} style={{ width: 160, height: 45 }} />
          ) : (
            <Skeleton.Button
              active={true}
              size="default"
              style={{ height: 45 }}
            />
          )
        ) : isAdmin ? (
          <Tooltip title={navbarExpand ? "" : "Users"} placement="right">
            <Link
              href={"/users"}
              className={`${styles.navbar_link} ${
                navbarExpand ? styles.navbar_link_res : ""
              } ${activeNavlink === "users" && styles.navbar_link_active}`}
            >
              <TeamOutlined style={{ fontSize: "25px", padding: "4px" }} />
              {navbarExpand ? "Users" : ""}
            </Link>
          </Tooltip>
        ) : (
          <></>
        )}
      </div>
      <Tooltip title={navbarExpand ? "Close" : "Open"} placement="right">
        <button className={styles.icon} onClick={handleClick}>
          {navbarExpand ? (
            <LeftOutlined style={{ fontSize: "14px" }} />
          ) : (
            <RightOutlined style={{ fontSize: "14px" }} />
          )}
        </button>
      </Tooltip>
    </div>
  );
};

export default Navbar;
