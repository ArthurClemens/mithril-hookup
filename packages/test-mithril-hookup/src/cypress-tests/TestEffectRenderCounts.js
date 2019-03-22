import m from "mithril";
import { hookup } from "mithril-hookup";


const renderCounts = {
  useEffectEmptyDeps: 0,
  useEffectVariable: 0,
};

const EffectCountEmpty = hookup((vnode, { useEffect }) => {
  renderCounts.useEffectEmptyDeps++;

  useEffect(
    () => {
      //
    },
    []
  );

  return m("[data-test-id=EffectCountEmpty]", [
    m("h2", "EffectCountEmpty"),
    m("p[data-test-id=renderCounts]", renderCounts.useEffectEmptyDeps),
    m("button[data-test-id=button]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
});

const EffectCountVariable = hookup((vnode, { useState, useEffect }) => {
  renderCounts.useEffectVariable++;
  const [count, setCount] = useState(0);

  useEffect(
    () => {
      //
    },
    [count]
  );

  return m("[data-test-id=EffectCountVariable]", [
    m("h2", "EffectCountVariable"),
    m("p[data-test-id=counts]", count),
    m("p[data-test-id=renderCounts]", renderCounts.useEffectVariable),
    m("button[data-test-id=button-increment]", 
      { onclick: () => setCount(count + 1) },
      "More"
    ),
    m("button[data-test-id=button]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
});

export default ({
  view: () => [
    m(EffectCountEmpty),
    m(EffectCountVariable),
  ]
});
