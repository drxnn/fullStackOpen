import { CoursePart } from "../App";
import Part from "./Part";

export default function Content({
  courseParts,
}: {
  courseParts: CoursePart[];
}) {
  return <Part courseParts={courseParts} />;
}
