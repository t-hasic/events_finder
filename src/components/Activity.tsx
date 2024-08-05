import Tailbox from "../assets/tailbox.png";

interface Props {
  activity: any;
}

function Activity({ activity }: Props) {
  return (
    <div className="activity-card">
      <img
        src={activity.image_url}
        className="activity-img"
        alt={activity.title || "Activity"}
        onError={(e) => {
          e.currentTarget.src = Tailbox;
          e.currentTarget.alt = "Default image";
        }}
      />
      <div className="activity-body">
        <h5 className="activity-title">{activity.title}</h5>
        <p className="activity-description">{activity.description}</p>
        <ul className="activity-details">
          <li>
            <strong>When:</strong> {activity.datetime_info}
          </li>
          <li>
            <strong>Location:</strong> {activity.address}
          </li>
          <li>
            <strong>Price:</strong> {activity.price_info || "Unknown"}
          </li>
          <li>
            <strong>Categories:</strong> {activity.categories}
          </li>
        </ul>
        <a href={activity.website} className="activity-link">
          Website
        </a>
      </div>
    </div>
  );
}

export default Activity;
