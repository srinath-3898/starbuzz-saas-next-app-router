"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VerifyEmailModal from "@/components/Modals/VerifyEmailModal/VerifyEmailModal";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const { loading, user } = useSelector((state) => state.auth);
  const [verifyEmailModalOpen, setVerifyEmailModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      document.cookie = `user=${JSON.stringify(user)}; path=/`;
      if (user?.isEmailVerified && user?.appTour) {
        router.push("/dashboard");
      } else if (!user?.isEmailVerified) {
        setVerifyEmailModalOpen(true);
      } else if (!user?.appTour) {
        router.push("/appTour");
      }
    } else {
      return;
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className={styles.container}>
          <LoadingOutlined style={{ color: "#fe5900", fontSize: 50 }} />
        </div>
      ) : (
        <></>
      )}
      <VerifyEmailModal
        open={verifyEmailModalOpen}
        setOpen={setVerifyEmailModalOpen}
      />
    </>
  );
}
