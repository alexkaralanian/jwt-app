import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mount } from "enzyme";
import { Unwrapped } from "./LoginContainer";

test("LoginContainer renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Unwrapped />
    </MemoryRouter>
  );
});
