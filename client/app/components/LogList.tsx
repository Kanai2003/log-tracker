// import { ILog } from "../types";

// interface LogListProps {
//   logs: ILog[];
// }

export default function LogList({ logs }:any) {
  return (
    <div>
      <h2 className="text-xl">User Logs</h2>
      {logs.map((log) => (
        <div key={log.id} className="border p-2 my-2">
          <p>Action: {log.actionType}</p>
          <p>Time: {log.timestamp}</p>
        </div>
      ))}
    </div>
  );
}
