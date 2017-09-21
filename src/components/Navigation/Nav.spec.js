import { MemoryRouter } from "react-router-dom";
import React from "react";
import { shallow, mount } from "enzyme";
import Navigation from "./Nav";

test("Navigation renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
});

test(" Navigation Component renders correctly", () => {
  const component = shallow(<Navigation />);
  expect(component).toMatchSnapshot();
});
