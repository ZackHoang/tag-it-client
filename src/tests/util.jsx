import { render } from "@testing-library/react";
import { BrowserRouter, createMemoryRouter, MemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import routes from "../routes";

const renderWithRouter = (route = "/") => {
  const router = createMemoryRouter(routes, {initialEntries: [route]})

  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router}></RouterProvider>),
  };
};

export default renderWithRouter;
