import "../styles/App.css";
import { useState } from "react";

import ChatInput from "../components/ChatInput";
import Results from "../components/Results";
import HumanInTheLoop from "../components/HumanInTheLoop";

function ChatSearch() {
  const [inputValue, setInputValue] = useState("");
  let activities: string[] = [
    "Activity 1",
    "Activity 2",
    "Activity 3",
    "Activity 3",
    "Activity 3",
    "Activity 3",
    "Activity 3",
    "Activity 3",
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    console.log(`Input value: ${inputValue}`);
    setInputValue("");
  };

  const handleOnKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleInputSubmit();
    }
  };

  return (
    <>
      <Results names={activities} class_name={"chat-results-scroll"} />
      <HumanInTheLoop />
      <ChatInput
        value={inputValue}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
        onKeyPress={handleOnKeyPress}
      />
    </>
  );
}

export default ChatSearch;
