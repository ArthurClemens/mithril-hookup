import { hookup } from "./hookup";

const hookupComponent = component =>
  hookup((vnode, hooks) => (
    component({ ...vnode.attrs, ...hooks })
  ));

export const withHooks = (component, customHooksFn, rest = {}) =>
  hookupComponent(
    hooks => {
      const customHooks = customHooksFn !== undefined && customHooksFn !== null
        ? customHooksFn(hooks)
        : {};
      return component({ ...hooks, ...customHooks, ...rest });
    }
  );
