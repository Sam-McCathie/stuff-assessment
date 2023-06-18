import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "../Toolbar";

const mount = () => render(<Toolbar />);

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Toolbar", () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  it("should render ToolBar correctly", () => {
    const { getByText } = mount();
    const logo = getByText("Stuff v0.01");
    const home = getByText("Home");

    expect(logo).toBeTruthy();
    expect(home).toBeTruthy();
  });
});
