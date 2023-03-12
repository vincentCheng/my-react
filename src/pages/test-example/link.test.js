import renderer from "react-test-renderer";
import Link from "./link";

Item("changes the class when hovered", () => {
  const component = renderer.create(<Link page="www.baidu.com">baidu</Link>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
