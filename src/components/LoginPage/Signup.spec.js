import { MemoryRouter } from "react-router-dom";
import React from "react";
import { shallow, mount } from "enzyme";
import Signup from "./Signup";

test("Signup renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});

test(" Signup Component renders correctly", () => {
  const component = shallow(<Signup />);
  expect(component).toMatchSnapshot();
});
