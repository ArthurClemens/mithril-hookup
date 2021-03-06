import m from "mithril";
import { hookup } from "mithril-hookup";

const timings = {
  useEffect: 0,
  useLayoutEffect: 0,
};

const EffectTimings = hookup((vnode, { useEffect, useLayoutEffect }) => {
  
  useLayoutEffect(
    () => {
      timings.useLayoutEffect += new Date().getTime();
    },
    []
  );

  useEffect(
    () => {
      timings.useEffect += new Date().getTime();
    },
    []
  );

  useEffect(
    () => {
      timings.useEffect += new Date().getTime();
    },
    []
  );

  useLayoutEffect(
    () => {
      timings.useLayoutEffect += new Date().getTime();
    },
    []
  );
  
  return m("[data-test-id=EffectTimings]", [
    m("h2", "EffectTimings"),
    timings.useEffect
      ? m("p", [
        m("div", "useEffect: "),
        m("span[data-test-id=useEffect]", timings.useEffect.toString())
      ])
      : null,
    timings.useLayoutEffect
      ? m("p", [
        m("div", "useLayoutEffect: "),
        m("span[data-test-id=useLayoutEffect]", timings.useLayoutEffect.toString())
      ])
      : null,
    m("button[data-test-id=button]", 
      { onclick: () => {} },
      "Trigger render"
    ),
  ]);
});

export default ({
  view: () => [
    m(EffectTimings),
  ]
});
