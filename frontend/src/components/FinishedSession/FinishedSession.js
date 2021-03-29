import msToTime from "../../utils/msToTime";

export const FinishedSession = ({ session }) => {
  const { description, startTime, endTime } = session;
  return (
    <div>
      <p>{description}</p>
      <p>{new Date(startTime).toLocaleDateString()}</p>
      <p>{new Date(endTime).toLocaleDateString()}</p>
      <p>{msToTime(new Date(endTime) - new Date(startTime))}</p>
    </div>
  );
};
