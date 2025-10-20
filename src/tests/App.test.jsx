import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import renderWithRouter from "./util";
import Game from "../pages/game/Game";
import userEvent from "@testing-library/user-event";

vi.mock("../pages/game/Game", () => ({ handlePopUp }) => {
  <img
    alt="main game image"
    src="https://res.cloudinary.com/dazy1wrx0/image/upload/pixelcon_a10dsa.jpg"
    onMouseDown={handlePopUp}
  ></img>;
});

describe("App component", () => {
  it("renders correct header and footer", () => {
    renderWithRouter();
    expect(screen.getByRole("heading", { name: "TagIt" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Leaderboard" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "by Zack Hoang" })
    ).toBeInTheDocument();
  });
});

describe("Header component", () => {
  it("navigates to home", async () => {
    const { user } = renderWithRouter();
    const homeButton = screen.getByRole("link", { name: "Home" });
    await user.click(homeButton);
    expect(screen.getByRole("link", { name: "Play" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Source" })).toBeInTheDocument();
  });
});

describe("Home page", () => {
  it("game renders all necessary components", async () => {
    const { user } = renderWithRouter();
    const button = screen.getAllByRole("link", { name: "Play" })[0];
    await user.click(button);
    expect(screen.getAllByRole("figure").length).toBe(3);
    expect(screen.getByAltText("main game image")).toBeInTheDocument();
  });

  it("call handlePopUp when clicked on image", async () => {
    const handlePopUp = vi.fn();
    const user = userEvent.setup();
    render(<Game handlePopUp={handlePopUp}></Game>);
    const image = screen.getByAltText("main game image");
    await user.click(image);
    expect(handlePopUp).toHaveBeenCalled();
  });
});
