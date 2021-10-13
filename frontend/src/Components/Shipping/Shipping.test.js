import React from "react";
import { shallow } from "enzyme";
import Shipping from "./Shipping";

describe("Shipping", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Shipping />);
    expect(wrapper).toMatchSnapshot();
  });
});
