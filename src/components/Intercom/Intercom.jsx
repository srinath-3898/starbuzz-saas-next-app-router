import { useEffect } from "react";
import { useSelector } from "react-redux";

const Intercom = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "sn3v6c2g",
        name: user ? user?.fullName : null,
        email: user ? user?.email : null,
      });
    }
  }, [user?.fullName]);
  return null;
};

export default Intercom;
