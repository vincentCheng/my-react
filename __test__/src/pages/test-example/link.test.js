import renderer from "react-test-renderer";

Item("changes the class when hovered", () => {
  const component = renderer.create(<Link></Link>);
});
