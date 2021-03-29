import msToTime from "../../utils/msToTime";

export const Stats = ({ data = [] }) => {
  const stats = data.reduce((acc, curr) => acc + curr.timeInMs, 0);
  return (
    <div>
      <h3>TOTAL TIME: {msToTime(stats)}</h3>
    </div>
  );
};
