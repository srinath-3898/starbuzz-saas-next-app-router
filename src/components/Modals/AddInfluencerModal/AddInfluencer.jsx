"use client";
import SingleSelect from "@/components/SingleSelect/SingleSelect";
import { fetchListsByBrand } from "@/store/lists/listsActions";
import { Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddInfluencerModal.module.css";
import { resetListsData } from "@/store/lists/listsSlice";
import { getCampaigns } from "@/store/campaigns/campaignsActions";
import { resetCampaignsData } from "@/store/campaigns/campaignsSlice";
import { CheckCircleOutlined, CloseCircleFilled } from "@ant-design/icons";
import { addInfluencerToCampaign } from "@/store/campaign/campaignActions";
import { addInfluencerToList } from "@/store/list/listActions";
import { resetAddInfluencerToCampaignData } from "@/store/campaign/campaignSlice";
import { resetAddinfluencerToListData } from "@/store/list/listSlice";
import Loader from "@/components/Loader/Loader";

const AddInfluencerModal = ({
  type,
  setType,
  open,
  setOpen,
  username,
  setUsername,
}) => {
  const dispatch = useDispatch();

  const { brandId } = useSelector((state) => state.globalVariables);
  const {
    loading: listsLoading,
    lists,
    error: listsError,
  } = useSelector((state) => state.lists);
  const {
    loading: campaignsLoading,
    campaigns,
    error: campaignsError,
  } = useSelector((state) => state.campaigns);
  const {
    addInfluencerToListLoading,
    addInfluencerToListMessage,
    addInfluencerToListError,
  } = useSelector((state) => state.list);
  const {
    addInfluencerToCampaignLoading,
    addInfluencerToCampaignMessage,
    addInfluencerToCampaignError,
  } = useSelector((state) => state.campaign);

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [listOptions, setListOptions] = useState([]);
  const [listId, setListId] = useState(null);
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [campaignId, setCampaignId] = useState(null);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const onPopupScroll = (event) => {
    if (
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight
    ) {
      if (type === "list" && lists?.current_page < lists?.last_page) {
        setPage((prevPage) => prevPage + 1);
      } else if (
        type === "campaign" &&
        campaigns?.current_page < campaigns?.last_page
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleCancel = () => {
    setType(null);
    setUsername(null);
    setPage(1);
    setSize(10);
    if (type === "list") {
      dispatch(resetListsData());
      setListOptions([]);
      setListId(null);
    } else {
      dispatch(resetCampaignsData());
      setCampaignOptions([]);
      setCampaignId(null);
    }
    setOpen(false);
  };

  const handleSubmit = () => {
    if (type === "list" && listId) {
      dispatch(addInfluencerToList({ brandId, listId, username })).then(() => {
        setListId(null);
      });
    } else if (type === "list") {
      setError("Please select a list to add influencer");
    }
    if (type === "campaign" && campaignId) {
      dispatch(addInfluencerToCampaign({ brandId, campaignId, username })).then(
        () => {
          setCampaignId(null);
        }
      );
    } else if (type === "campaign") {
      setError("Please select a campaign to add influencer");
    }
  };

  useEffect(() => {
    if (type === "list" && open && !lists) {
      dispatch(fetchListsByBrand({ brandId, size, page }));
    }
    if (type === "campaign" && open && !campaigns) {
      dispatch(getCampaigns({ brandId, size, page }));
    }
  }, [type, brandId, open, page, size, lists, campaigns]);

  useEffect(() => {
    if (type === "list" && lists && open) {
      setListOptions((prevState) => [...prevState, ...lists?.data]);
    }
    if (type === "campaign" && campaigns && open) {
      setCampaignOptions((prevState) => [...prevState, ...campaigns?.data]);
    }
  }, [lists, campaigns, type, open]);

  useEffect(() => {
    if (
      addInfluencerToListMessage ||
      addInfluencerToListError ||
      addInfluencerToCampaignMessage ||
      addInfluencerToCampaignError
    ) {
      messageApi.open({
        key: "updatabale",
        type: "success",
        content: addInfluencerToListMessage
          ? addInfluencerToListMessage
          : addInfluencerToListError
          ? addInfluencerToListError
          : addInfluencerToCampaignMessage
          ? addInfluencerToCampaignMessage
          : addInfluencerToCampaignError,

        duration: 3,
        icon:
          addInfluencerToListMessage || addInfluencerToCampaignMessage ? (
            <CheckCircleOutlined
              style={{ color: "#fe5900", fontSize: "16px" }}
            />
          ) : (
            <CloseCircleFilled style={{ color: "red", fontSize: "16px" }} />
          ),
        style: {
          fontSize: "16px",
        },
      });
      dispatch(resetAddinfluencerToListData());
      dispatch(resetAddInfluencerToCampaignData());
    }
  }, [
    addInfluencerToListMessage,
    addInfluencerToListError,
    addInfluencerToCampaignMessage,
    addInfluencerToCampaignError,
  ]);

  return (
    <>
      {contextHolder}
      <Modal
        title={
          type === "list"
            ? "Add influencer to  list"
            : "Add influencer  to campaign"
        }
        open={open}
        maskClosable={false}
        closable={false}
        centered
        footer={[
          <div key="footer" className={styles.footer}>
            <button
              className="btn_small btn_secondary"
              onClick={handleCancel}
              disabled={
                addInfluencerToListLoading || addInfluencerToCampaignLoading
              }
            >
              Cancel
            </button>
            <button
              className="btn_small btn_primary"
              onClick={handleSubmit}
              disabled={
                addInfluencerToListLoading || addInfluencerToCampaignLoading
              }
            >
              {addInfluencerToListLoading || addInfluencerToCampaignLoading ? (
                <Loader color="#ffffff" size={17} />
              ) : (
                `Add to ${type === "list" ? "list" : "campaign"}`
              )}
            </button>
          </div>,
        ]}
      >
        <div className={styles.container}>
          <p className="text_small">
            Please select a {type === "list" ? "List" : "Campaign"} to add
            influencer
          </p>

          <SingleSelect
            type={"list"}
            width={"100%"}
            placeHolder={`Select a ${
              type === "list" ? "list" : "campaign"
            } to add`}
            options={type === "list" ? listOptions : campaignOptions}
            optionValue={"id"}
            optionLabel={type === "list" ? "title" : "title"}
            loading={type === "list" ? listsLoading : campaignsLoading}
            onPopupScroll={onPopupScroll}
            selectedOption={type === "list" ? listId : campaignId}
            onChange={(value) =>
              type === "list" ? setListId(value) : setCampaignId(value)
            }
            error={type === "list" ? listsError : campaignsError}
          />
          {error && (
            <div className="validation_error">
              <p className="text_small">{error}</p>
              <CloseCircleFilled
                style={{ fontSize: "14px", color: "red" }}
                onClick={() => setError(null)}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AddInfluencerModal;
