import { CoursePart } from "../types";
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <i>{part.description}</i>
        </div>
      );
    case "group":
      return <div>project exercises {part.exerciseCount}</div>;
    case "background":
      return (
        <div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>submit to {part.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>
            Required skills:{" "}
            {part.requirements.map((skill) => skill).join(", ")}
          </div>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
