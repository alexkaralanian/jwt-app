import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mount } from "enzyme";
import { Unwrapped } from "./ProfileContainer";

test("ProfileContainer renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Unwrapped />
    </MemoryRouter>
  );
});
