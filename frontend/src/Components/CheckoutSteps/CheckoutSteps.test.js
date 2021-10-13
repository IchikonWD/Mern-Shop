import React from "react";
import { shallow } from "enzyme";
import CheckoutSteps from "./CheckoutSteps";

describe("CheckoutSteps", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CheckoutSteps />);
    expect(wrapper).toMatchSnapshot();
  });
});
