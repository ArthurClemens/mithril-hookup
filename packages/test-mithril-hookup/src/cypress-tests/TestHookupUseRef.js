import m from "mithril";
import { hookup } from "mithril-hookup";

const DomElementRef = hookup((vnode, { useRef }) => {
  const domElement = useRef();

  return m("[data-test-id=DomElementRef]", [
    m("h2", "DomElementRef"),
    m("div", 
      {
        oncreate: vnode => domElement.current = vnode.dom,
      },
      "QWERTY"
    ),
    m("p", [
      m("span", "element text: "),
      m("span[data-test-id=textContent]", domElement.current && domElement.current.textContent)
    ]),
    m("button[data-test-id=render]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
});

export default ({
  view: () => [
    m(DomElementRef),
  ]
});
