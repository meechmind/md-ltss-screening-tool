import { Link } from "react-router-dom";
import config from "../config.json";

export default function Intro() {
  const { intro } = config;
  return (
    <div className="measure-6">
      <h1 className="margin-top-2">{intro.headline}</h1>
      <p className="margin-top-2">{intro.description}</p>
      <Link className="usa-button margin-top-2" to="/questions">
        {intro.startLabel}
      </Link>
    </div>
  );
}
