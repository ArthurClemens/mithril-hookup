function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/* global m */
var hookup = function hookup(closure, addHooks) {
  return function () {
    var setup = false;
    var states = [];
    var statesIndex = 0;
    var depsStates = [];
    var depsIndex = 0;
    var updates = [];
    var teardowns = new Map(); // keep track of teardowns even when the update was run only once

    var scheduleRender = m.redraw;

    var resetAfterUpdate = function resetAfterUpdate() {
      updates.length = 0;
      depsIndex = 0;
      statesIndex = 0;
    };

    var updateDeps = function updateDeps(deps) {
      var index = depsIndex++;
      var prevDeps = depsStates[index] || [];
      var shouldRecompute = deps === undefined ? true // Always compute
      : Array.isArray(deps) ? deps.length > 0 ? !deps.every(function (x, i) {
        return x === prevDeps[i];
      }) // Only compute when one of the deps has changed
      : !setup // Empty array: only compute at mount
      : false; // Invalid value, do nothing

      depsStates[index] = deps;
      return shouldRecompute;
    };

    var effect = function effect() {
      var isAsync = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return function (fn, deps) {
        var shouldRecompute = updateDeps(deps);

        if (shouldRecompute) {
          var runCallbackFn = function runCallbackFn() {
            var teardown = fn(); // A callback may return a function
            // If any, add it to the teardowns

            if (typeof teardown === "function") {
              // Store this this function to be called at unmount
              teardowns.set(fn, teardown); // Call re-render at least once

              teardowns.set("_", scheduleRender);
            }
          };

          updates.push(isAsync ? function () {
            return new Promise(function (resolve) {
              return requestAnimationFrame(resolve);
            }).then(runCallbackFn);
          } : runCallbackFn);
        }
      };
    };

    var updateState = function updateState(initialValue) {
      var newValueFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (value) {
        return value;
      };
      var index = statesIndex++;

      if (!setup) {
        states[index] = initialValue;
      }

      return [states[index], function (value) {
        var previousValue = states[index];
        var newValue = newValueFn(value, index);
        states[index] = newValue;

        if (newValue !== previousValue) {
          scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
        }
      }];
    }; // Hook functions


    var useState = function useState(initialValue) {
      var newValueFn = function newValueFn(value, index) {
        return typeof value === "function" ? value(states[index]) : value;
      };

      return updateState(initialValue, newValueFn);
    };

    var useReducer = function useReducer(reducer, initialArg, initFn) {
      // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).
      var initialState = !setup && initFn ? initFn(initialArg) : initialArg;

      var _updateState = updateState(initialState),
          _updateState2 = _slicedToArray(_updateState, 2),
          state = _updateState2[0],
          setState = _updateState2[1];

      var dispatch = function dispatch(action) {
        return setState( // Next state:
        reducer(state, action));
      };

      return [state, dispatch];
    };

    var useRef = function useRef(initialValue) {
      // A ref is a persisted object that will not be updated
      // Update the ref by setting its `current` property
      var _updateState3 = updateState({
        current: initialValue
      }),
          _updateState4 = _slicedToArray(_updateState3, 1),
          value = _updateState4[0];

      return value;
    };

    var useMemo = function useMemo(fn, deps) {
      var shouldRecompute = updateDeps(deps);

      var _ref = setup ? updateState() : updateState(fn()),
          _ref2 = _slicedToArray(_ref, 2),
          memoized = _ref2[0],
          setMemoized = _ref2[1];

      if (setup && shouldRecompute) {
        setMemoized(fn());
      }

      return memoized;
    };

    var useCallback = function useCallback(fn, deps) {
      return useMemo(function () {
        return fn;
      }, deps);
    };

    var defaultHooks = {
      useState: useState,
      useEffect: effect(),
      useLayoutEffect: effect(true),
      useReducer: useReducer,
      useRef: useRef,
      useMemo: useMemo,
      useCallback: useCallback
    };

    var hooks = _objectSpread({}, defaultHooks, addHooks && addHooks(defaultHooks));

    var update = function update() {
      updates.forEach(call);
      resetAfterUpdate();
    };

    var teardown = function teardown() {
      _toConsumableArray(teardowns.values()).forEach(call);
    };

    return {
      view: function view(vnode) {
        return closure(vnode, hooks);
      },
      oncreate: function oncreate() {
        return update(), setup = true;
      },
      onupdate: update,
      onremove: teardown
    };
  };
};
var call = Function.prototype.call.bind(Function.prototype.call);

export { hookup };
