import React from "react";
import { shallow, mount } from "enzyme";
import LandingPage from "./LandingPage";

test("LandingPage renders without crashing", () => {
  mount(<LandingPage />);
});

test("Landing Page Component renders correctly", () => {
  const component = shallow(<LandingPage />);
  expect(component).toMatchSnapshot();
});
