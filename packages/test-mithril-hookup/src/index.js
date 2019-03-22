import m from "mithril";
import CounterController from "./custom-hooks-usereducer";
import Toggle from "./toggle";

import TestHookupCustomHooks from "./cypress-tests/TestHookupCustomHooks";
import TestHookupUseState from "./cypress-tests/TestHookupUseState";
import TestHookupUseRef from "./cypress-tests/TestHookupUseRef";
import TestHookupUseCallback from "./cypress-tests/TestHookupUseCallback";
import TestHookupUseEffect from "./cypress-tests/TestHookupUseEffect";
import TestHookupUseLayoutEffect from "./cypress-tests/TestHookupUseLayoutEffect";
import TestHookupUseMemo from "./cypress-tests/TestHookupUseMemo";
import TestUseReducer from "./cypress-tests/TestUseReducer";
import TestHookupUpdateRules from "./cypress-tests/TestHookupUpdateRules";
import TestWithHooks from "./cypress-tests/TestWithHooks";
import TestEffectTiming from "./cypress-tests/TestEffectTiming";
import TestEffectRenderCounts from "./cypress-tests/TestEffectRenderCounts";
import TestWithHooksExtraArguments from "./cypress-tests/TestWithHooksExtraArguments";

const links = [
  ["Simple toggle", "/toggle", Toggle],
  ["Custom hooks with useReducer", "/custom-hooks-usereducer", CounterController],
];

const tests = [
  ["Test hookup custom hooks", "/TestHookupCustomHooks", TestHookupCustomHooks],
  ["Test hookup useState", "/TestHookupUseState", TestHookupUseState],
  ["Test hookup useRef", "/TestHookupUseRef", TestHookupUseRef],
  ["Test hookup useCallback", "/TestHookupUseCallback", TestHookupUseCallback],
  ["Test hookup useEffect", "/TestHookupUseEffect", TestHookupUseEffect],
  ["Test hookup useLayoutEffect", "/TestHookupUseLayoutEffect", TestHookupUseLayoutEffect],
  ["Test hookup useMemo", "/TestHookupUseMemo", TestHookupUseMemo],
  ["Test hookup useReducer", "/TestUseReducer", TestUseReducer],
  ["Test hookup update rules", "/TestHookupUpdateRules", TestHookupUpdateRules],
  ["Test withHooks", "/TestWithHooks", TestWithHooks],
  ["Test withHooks extra arguments", "/TestWithHooksExtraArguments", TestWithHooksExtraArguments],
  ["Test effect timing", "/TestEffectTiming", TestEffectTiming],
  ["Test effect render counts", "/TestEffectRenderCounts", TestEffectRenderCounts],
];

const link = (href, currentRoute, label) => 
  m("li",
    m("a", {
      href,
      oncreate: m.route.link,
      className: href === currentRoute ? "is-active" : ""
    },
    label)
  );

const createMenu = currentRoute => (
  m("aside.menu", [
    m("p.menu-label", "mithril-hooks Demos"),
    m("ul.menu-list", 
      links.map(([label, href]) =>
        link(href, currentRoute, label)
      )
    ),
    tests.length
      ? (
        m("p.menu-label", "Cypress tests"),
        m("ul.menu-list", 
          tests.map(([label, href]) =>
            link(href, currentRoute, label)
          )
        )
      )
      : null
  ])
);

const Layout = {
  view: vnode =>
    m(".layout", [
      createMenu(m.route.get()),
      m(".component", vnode.children)
    ])
};

const root = document.getElementById("root");
const allLinks = links.concat(tests);

const routes = allLinks.reduce((acc, [, href, Component]) => (
  acc[href] = {
    render: () =>
      m(Layout, { href }, m(Component))
  },
  acc
), {});

const [,firstRoute,] = allLinks[0];
m.route(root, firstRoute, routes);
