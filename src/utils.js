import { hookup } from "./hookup";

const hookupComponent = component =>
  hookup((vnode, hooks) => (
    component({ ...vnode.attrs, ...hooks })
  ));
  
export const withHooks = (component, customHooks = () => {}) =>
  hookupComponent(
    hooks => component({ ...hooks, ...customHooks(hooks) })
  );
