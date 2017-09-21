import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mount } from "enzyme";
import { Unwrapped } from "./SignupContainer";

test("SignupContainer renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Unwrapped />
    </MemoryRouter>
  );
});
