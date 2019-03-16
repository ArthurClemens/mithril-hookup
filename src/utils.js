import { hookup } from "./hookup";

const hookupComponent = component =>
  hookup((vnode, hooks) => (
    component({ ...vnode.attrs, ...hooks })
  ));

export const withHooks = (component, customHooks, rest = {}) => {
  const customHooksFn = customHooks !== undefined && customHooks !== null
    ? customHooks
    : () => {};
  return hookupComponent(
    hooks => component({ ...hooks, ...customHooksFn(hooks), ...rest })
  );
};
