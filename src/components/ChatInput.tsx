import { ChangeEvent } from "react";

import FilterDropdown from "./FilterDropdown";
import FilterDateEntry from "./FilterDateEntry";

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  username: string;
  onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ChatInput({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  username,
  onUsernameChange,
}: Props) {
  return (
    <div className="centered_input">
      <input
        type="text"
        value={username}
        onChange={onUsernameChange}
        placeholder="Username"
        className="username_text_input"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onKeyPress(e)}
        placeholder="Enter your query here..."
        className="query_text_input"
      />

      <button
        onClick={onSubmit}
        className="btn btn-primary"
        style={{ margin: "8px" }}
      >
        Submit
      </button>
    </div>
  );
}

export default ChatInput;
