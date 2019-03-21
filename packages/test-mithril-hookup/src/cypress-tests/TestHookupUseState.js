import m from "mithril";
import { hookup } from "mithril-hookup";

const InitialValue = hookup((vnode, { useState }) => {
  const [count, ] = useState(vnode.attrs.initialCount);
  return m("[data-test-id=InitialValue]", [
    m("h2", "InitialValue"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    )
  ]);
});

const WithEffect = hookup((vnode, { useState, useEffect }) => {
  const [count, setCount] = useState(vnode.attrs.initialCount);
  // Calling from useEffect will increase the count by 1
  useEffect(
    () => {
      setCount(c => c + 1);
    },
    [/* empty array: only run at mount */]
  );
  return m("[data-test-id=WithEffect]", [
    m("h2", "WithEffect"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    )
  ]);
});

const Interactive = hookup((vnode, { useState }) => {
  const [count, setCount] = useState(vnode.attrs.initialCount);
  return m("[data-test-id=Interactive]", [
    m("h2", "Interactive"),
    m("p[data-test-id=count]", 
      `Count: ${count}`
    ),
    m("button[data-test-id=button]", 
      { onclick: () => setCount(count + 1) },
      "Add"
    ),
    m("button[data-test-id=fn-button]", 
      { onclick: () => setCount(c => c + 1) },
      "Add fn"
    )
  ]);
});

export default ({
  view: () => [
    m(InitialValue, { initialCount: 1 }),
    m(WithEffect, { initialCount: 100 }),
    m(Interactive, { initialCount: 1000 })
  ]
});
