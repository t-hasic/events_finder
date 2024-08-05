import HumanLoopButton from "./HumanLoopButton";

function HumanInTheLoop() {
  return (
    <>
      <div className="centered_input">
        <div className="human_in_the_loop_container">
          <p className="human_in_the_loop_text">
            Do you like these types of activities? If not, please me tell me
            more about what type of activity you are looking for.
          </p>
        </div>
      </div>
      <div className="centered_input">
        <HumanLoopButton text="I love these!" />
        <HumanLoopButton text="Show me a different type" />
        <HumanLoopButton text="Give me more variety" />
        <HumanLoopButton text="More outdoorsy" />
        <HumanLoopButton text="I'm hungry" />
        <HumanLoopButton text="I'm tired" />
        <HumanLoopButton text="I don't drink coffee" />
      </div>
    </>
  );
}

export default HumanInTheLoop;
