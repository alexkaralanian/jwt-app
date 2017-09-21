import React from "react";
import { mount } from "enzyme";
import LandingPageContainer from "./LandingPageContainer";

test("LandingPageContainer renders without crashing", () => {
  mount(<LandingPageContainer />);
});
