/* global describe, it */
"use strict";

const assert = require("assert");
require("mithril/test-utils/browserMock")(global);
const m = require("mithril");
const render = require("mithril-node-render");
const { withHooks } = require("../dist/mithril-hookup.js");
const debug = require("./debug");

describe("withHooks", function() {
  it("should render", function() {
    const expected = "<div>1</div><button>More</button>";

    const Counter = ({ useState, initialCount }) => {
      const [count, setCount] = useState(initialCount);
      return [
        m("div", count),
        m("button", {
          onclick: () => setCount(count + 1)
        }, "More")
      ];
    };

    const HookedCounter = withHooks(Counter);

    return render([
      m(HookedCounter, {
        initialCount: 1
      })
    ]).then(actual => {
      if (actual !== expected) {
        debug(actual, expected);
      }
      return assert(actual === expected);
    });
  });
});
