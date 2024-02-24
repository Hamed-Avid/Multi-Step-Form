type TStepsProps = {
  steps: { id: number; name: string }[];
  current: number;
  handler: (operation: "to", step: number) => void;
};

export default function Steps({ steps, current, handler }: TStepsProps) {
  return (
    <ul className="steps-List">
      {steps.map(({ id, name }, index) => (
        <li key={id} className="steps-item">
          {current >= index ? (
            <button
              onClick={() => handler("to", index)}
              className="step-primary"
            >
              {name}
            </button>
          ) : (
            <button
              onClick={() => handler("to", index)}
              className="step-secondary"
            >
              {name}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
