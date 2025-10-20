import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import renderWithRouter from "./util";

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
    const { user } = renderWithRouter("/game1");
    const image = screen.getByAltText("main game image");
    await user.click(image);
    expect(screen.getByRole("form")).toBeInTheDocument();
    //assertion???
  });
});
