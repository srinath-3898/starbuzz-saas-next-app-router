"use client";
import React, { useEffect } from "react";
import styles from "./Maintenance.module.css";
import { useRouter } from "next/navigation";

const Maintenance = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false") {
      router.push("/login");
    }
  }, [process.env.NEXT_PUBLIC_MAINTENANCE_MODE]);

  return (
    <div className={styles.container}>
      <p className="text_extra_large bold">We are under maintenance</p>
      <p className="text_extra_large bold">
        We apologize for any inconvenience, but our systems are currently
        undergoing scheduled maintenance to enhance our services.
      </p>
      <p className="text_extra_large bold">
        {`We'll be back in operation shortly, and we appreciate your patience during this time.`}
      </p>
    </div>
  );
};

export default Maintenance;
