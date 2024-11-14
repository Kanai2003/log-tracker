import { useRecoilState, useRecoilValue } from "recoil";
import { logsState, adminDataState, userState } from "../recoil/atom";
import { fetchUserData } from "../utils/api";

export const useLogs = () => {
  const [logs, setLogs] = useRecoilState(logsState);
  const [adminData, setAdminData] = useRecoilState(adminDataState);
  const user = useRecoilValue(userState);

  const loadLogs = async () => {
    if (!user) return;
    const data = await fetchUserData(user.role, user.email);

    if (user.role === "admin") {
      setAdminData(data);
    } else {
      setLogs(data);
    }
  };

  return { logs, adminData, loadLogs };
};
