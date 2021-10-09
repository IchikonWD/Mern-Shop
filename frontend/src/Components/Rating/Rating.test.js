import React from "react";
import { shallow } from "enzyme";
import Rating from "./Rating";

describe("Rating", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Rating />);
    expect(wrapper).toMatchSnapshot();
  });
});
