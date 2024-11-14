"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchUserData, deleteLog } from "../utils/api";

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface LogType {
  _id: string;
  actionType: string;
  userId: string;
  role: string;
  isDeleted: boolean;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface DataType {
  userDetails: UserType;
  logs: LogType[];
  adminDetailsAndLogs?: {
    logs: LogType[];
  };
  allUserDetailsAndLogs?: {
    [email: string]: {
      userDetails: UserType;
      logs: LogType[];
    };
  };
}

export default function Dashboard() {
  const [details, setDetails] = useState<DataType | null>(null);
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  const handleGetData = useCallback(async () => {
    try {
      const fetchedDetails = await fetchUserData();
      localStorage.setItem("logData", JSON.stringify(fetchedDetails));
      setDetails(fetchedDetails);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  const handleDeleteLog = async (logId: string) => {
    try {
      await deleteLog(logId);
      await handleGetData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const renderLogsTable = (
    logs: LogType[]
  ) => (
    <table className="table-auto border-collapse border border-gray-300 w-full mt-2">
      <thead>
        <tr>
          <th className="border px-4 py-2">Action Type</th>
          <th className="border px-4 py-2">Timestamp</th>
          <th className="border px-4 py-2">User ID</th>
          <th className="border px-4 py-2">Role</th>
          <th className="border px-4 py-2">Delete</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log._id}>
            <td className="border px-4 py-2">{log.actionType}</td>
            <td className="border px-4 py-2">
              {new Date(log.timestamp).toLocaleString()}
            </td>
            <td className="border px-4 py-2">{log.userId}</td>
            <td className="border px-4 py-2">{log.role}</td>
            <td className="border px-4 py-2">
              <button
                onClick={() => handleDeleteLog(log._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Guard clause if user or details are missing
  if (!user?.user?.name || !details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Welcome, {user.user?.name}!</h1>

      {details && (
        <>
          {user.user?.role === "admin" && (
            <>
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Admin Logs</h2>
                {details.adminDetailsAndLogs?.logs && renderLogsTable(details.adminDetailsAndLogs.logs)}
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">All User Logs</h2>
                {details.allUserDetailsAndLogs &&
                  Object.keys(details.allUserDetailsAndLogs).map((userEmail) => (
                    <div key={userEmail} className="mb-6">
                      <h3 className="text-lg font-semibold">{userEmail}</h3>
                      <p>
                        Name: {details?.allUserDetailsAndLogs[userEmail]?.userDetails?.name ?? "N/A"}
                      </p>
                      {renderLogsTable(details?.allUserDetailsAndLogs[userEmail]?.logs ?? [])}
                    </div>
                  ))}
              </section>
            </>
          )}

          {user.user?.role === "user" && (
            <section>
              <h2 className="text-xl font-semibold mb-2">Your Logs</h2>
              {details.logs && renderLogsTable(details.logs)}
            </section>
          )}
        </>
      )}
    </div>
  );
}
