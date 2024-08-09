import Activity from "./Activity";

interface Props {
  activities: any[];
}

function Results({ activities }: Props) {
  return (
    <div className="results-container">
      <div className="activities-grid">
        {activities.map((activity, index) => (
          <Activity key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default Results;
