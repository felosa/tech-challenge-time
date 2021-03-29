import msToTime from "../../utils/msToTime";
import './Stats.css'

export const Stats = ({ data = [] }) => {
  const stats = data.reduce((acc, curr) => acc + curr.timeInMs, 0);
  return (
    <div className="stats-container">
      <h3>TOTAL TIME: {msToTime(stats)}</h3>
    </div>
  );
};
