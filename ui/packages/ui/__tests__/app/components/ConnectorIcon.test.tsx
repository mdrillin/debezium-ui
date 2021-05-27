import { shallow } from "enzyme";
import React from "react";
import { ConnectorIcon } from "../../../src/app/components";

describe('renders without crashing', () => {
  it('should render correctly ', () => {
    const component = shallow(<ConnectorIcon connectorType={'postgres'} alt={'postgres'} />);
    expect(component).toMatchSnapshot();
  });
});