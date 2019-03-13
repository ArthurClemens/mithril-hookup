import { hookup } from "./hookup";

export const createComponent = component =>
  hookup((vnode, hooks) => (
    component({
      hooks,
    })(vnode.attrs)
  ));

export const withCustomHooks = customHooks => component => ({ hooks }) =>
  component({ hooks: { ...hooks, ...customHooks(hooks) } });
