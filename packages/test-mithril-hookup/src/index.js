import m from "mithril";
import { withHooks } from "mithril-hookup";
import Counter from "./Counter";
import customHooks from "./customHooks";

const HookedCounter = withHooks(Counter, customHooks);

const App = {
  view: () =>
    m(HookedCounter, { initialCount: 1 })
};

m.mount(document.body, App);
