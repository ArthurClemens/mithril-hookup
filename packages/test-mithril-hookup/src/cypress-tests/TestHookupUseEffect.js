import m from "mithril";
import { hookup } from "mithril-hookup";

const SideEffect = hookup((vnode, { useState, useEffect }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  useEffect(
    () => {
      const className = "dark-mode";
      const element = document.querySelector("#root");
      if (darkModeEnabled) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    [darkModeEnabled] // Only re-run when value has changed
  );
  return m("[data-test-id=dark]", [
    m("h2", "SideEffect"),
    m("p[data-test-id=darkModeEnabled]", 
      `SideEffect mode enabled: ${darkModeEnabled}`
    ),
    m("button[data-test-id=button]", 
      { onclick: () => setDarkModeEnabled(true) },
      "Set dark mode"
    ),
  ]);
});

export default ({
  view: () => [
    m(SideEffect),
  ]
});
