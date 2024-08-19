import { ChangeEvent } from "react";
import { Rating } from "react-simple-star-rating";

interface Props {
  onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCommentChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onRatingClick: (rating: any) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function FeedbackForm({
  onEmailChange,
  onCommentChange,
  onRatingClick,
  onSubmit,
}: Props) {
  const handleRatingClick = (rating: any) => {
    onRatingClick(rating);
  };

  return (
    <>
      <div className="form-floating mb-3" style={{ width: "50%" }}>
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={onEmailChange}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating" style={{ width: "50%" }}>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
          onChange={onCommentChange}
        ></textarea>
        <label htmlFor="floatingTextarea">Comments</label>
      </div>
      <div className="feedback-container">
        <Rating onClick={handleRatingClick} />
      </div>
      <button type="submit" className="btn btn-primary mt-3" onClick={onSubmit}>
        Submit
      </button>
    </>
  );
}

export default FeedbackForm;
