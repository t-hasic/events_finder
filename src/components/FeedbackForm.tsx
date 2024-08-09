function FeedbackForm() {
  return (
    <>
      <div className="form-floating mb-3" style={{ width: "50%" }}>
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating" style={{ width: "50%" }}>
        <textarea
          className="form-control"
          placeholder="Leave a comment here"
          id="floatingTextarea"
        ></textarea>
        <label htmlFor="floatingTextarea">Comments</label>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
    </>
  );
}

export default FeedbackForm;
