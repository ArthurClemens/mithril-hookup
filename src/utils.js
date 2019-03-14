import { hookup } from "./hookup";

const hookupComponent = component =>
  hookup((vnode, hooks) => (
    component({ hooks })(vnode.attrs)
  ));
  
export const withHooks = (component, customHooks = () => {}) =>
  hookupComponent(
    ({ hooks }) => component({ ...hooks, ...customHooks(hooks) })
  );
