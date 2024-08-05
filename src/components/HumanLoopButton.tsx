class Props {
  text: string = "";
}

function HumanLoopButton({ text }: Props) {
  return <button className="human_loop_button">{text}</button>;
}

export default HumanLoopButton;
