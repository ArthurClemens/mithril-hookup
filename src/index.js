/* global m */

export const hookup = (closure, addHooks) => (/* internal vnode, unused */) => {
  let setup = false;
  
  const states     = [];
  let statesIndex  = 0;
  
  const depsStates = [];
  let depsIndex    = 0;
  
  const updates    = [];
  const teardowns  = new Map; // keep track of teardowns even when the update was run only once
  
  const scheduleRender = m.redraw;
  
  const resetAfterUpdate = () => {
    updates.length = 0;
    depsIndex = 0;
    statesIndex = 0;
  };
  
  const updateDeps = deps => {
    const index = depsIndex++;
    const prevDeps = depsStates[index] || [];
    const shouldRecompute = deps === undefined
      ? true // Always compute
      : Array.isArray(deps)
        ? deps.length > 0
          ? !deps.every((x,i) => x === prevDeps[i]) // Only compute when one of the deps has changed
          : !setup // Empty array: only compute at mount
        : false; // Invalid value, do nothing
    depsStates[index] = deps;
    return shouldRecompute;
  };
  
  const effect = (isAsync = false) => (fn, deps) => {
    const shouldRecompute = updateDeps(deps);
    if (shouldRecompute) {
      const runCallbackFn = () => {
        const teardown = fn();
        // A callback may return a function
        // If any, add it to the teardowns
        if (typeof teardown === "function") {
          // Store this this function to be called at unmount
          teardowns.set(fn, teardown);
          // Call re-render at least once
          teardowns.set("_", scheduleRender);
        }
      };
      updates.push(
        isAsync
          ? () => new Promise(resolve => requestAnimationFrame(resolve)).then(runCallbackFn)
          : runCallbackFn
      );
    }
  };
  
  const updateState = (initialValue, newValueFn = value => value) => {
    const index = statesIndex++;
    if (!setup) {
      states[index] = initialValue;
    }
    return [
      states[index],
      value => {
        const previousValue = states[index];
        const newValue = newValueFn(value, index);
        states[index] = newValue;
        if (newValue !== previousValue) {
          scheduleRender(); // Calling redraw multiple times: Mithril will drop extraneous redraw calls, so performance should not be an issue
        }
      }
    ];
  };
  
  // Hook functions

  const useState = initialValue => {
    const newValueFn = (value, index) =>
      typeof value === "function"
        ? value(states[index])
        : value;
    return updateState(initialValue, newValueFn);
  };
  
  const useReducer = (reducer, initialArg, initFn) => {
    // From the React docs: You can also create the initial state lazily. To do this, you can pass an init function as the third argument. The initial state will be set to init(initialArg).
    const initialState = !setup && initFn
      ? initFn(initialArg)
      : initialArg;
    const [state, setState] = updateState(initialState);
    const dispatch = action =>
      setState(
        // Next state:
        reducer(state, action)
      );
    return [state, dispatch];
  };
  
  const useRef = initialValue => {
    // A ref is a persisted object that will not be updated
    const [value] = updateState({ current: initialValue });
    return value;
  };
  
  const useMemo = (fn, deps) => {
    const shouldRecompute = updateDeps(deps);
    const [memoized, setMemoized] = setup
      ? updateState()
      : updateState(fn());
    if (setup && shouldRecompute) {
      setMemoized(fn());
    }
    return memoized;
  };
  
  const useCallback = (fn, deps) =>
    useMemo(() => fn, deps);
  
  const defaultHooks = {
    useState,
    useEffect: effect(),
    useLayoutEffect: effect(true),
    useReducer,
    useRef,
    useMemo,
    useCallback,
  };
  
  const hooks = {
    ...defaultHooks,
    ...(addHooks && addHooks(defaultHooks))
  };
    
  const update = () => {
    updates.forEach(call);
    resetAfterUpdate();
  };
  
  const teardown = () => {
    [...teardowns.values()].forEach(call);
  };
  
  return {
    view: vnode => closure(vnode, hooks),
    oncreate: () => (
      update(),
      setup = true
    ),
    onupdate: update,
    onremove: teardown
  };
};

const call = Function.prototype.call.bind(
  Function.prototype.call
);
