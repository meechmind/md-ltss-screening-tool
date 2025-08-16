import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import Intro from "../pages/Intro.jsx";
import config from "../config.json";

describe("Intro page", () => {
  it("renders and start button links to questions", () => {
    const html = renderToString(
      <MemoryRouter>
        <Intro />
      </MemoryRouter>
    );
    expect(html).toContain(config.intro.headline);
    expect(html).toContain('href="/questions"');
  });
});
