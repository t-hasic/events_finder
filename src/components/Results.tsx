import Activity from "./Activity";

interface Props {
  activities: any[];
  class_name: string;
}

function Results({ activities, class_name }: Props) {
  return (
    <div className="results-container">
      <div className={`${class_name} results-scroll`}>
        <div className="activities-grid">
          {activities.map((activity, index) => (
            <Activity key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
