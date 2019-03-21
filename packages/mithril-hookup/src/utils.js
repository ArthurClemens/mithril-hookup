import { hookup } from "./hookup";

const hookupComponent = component =>
  hookup((vnode, hooks) => (
    component({ ...vnode.attrs, ...hooks, children: vnode.children })
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
