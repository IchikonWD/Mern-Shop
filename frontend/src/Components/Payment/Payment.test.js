import React from "react";
import { shallow } from "enzyme";
import Payment from "./Payment";

describe("Payment", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Payment />);
    expect(wrapper).toMatchSnapshot();
  });
});
