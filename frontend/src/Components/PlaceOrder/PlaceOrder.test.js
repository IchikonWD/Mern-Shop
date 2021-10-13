import React from "react";
import { shallow } from "enzyme";
import PlaceOrder from "./PlaceOrder";

describe("PlaceOrder", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<PlaceOrder />);
    expect(wrapper).toMatchSnapshot();
  });
});
