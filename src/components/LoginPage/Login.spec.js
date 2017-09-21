import { MemoryRouter } from "react-router-dom";
import React from "react";
import { shallow, mount } from "enzyme";
import Login from "./Login";

test("Login renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});

test(" Login Component renders correctly", () => {
  const component = shallow(<Login />);
  expect(component).toMatchSnapshot();
});
