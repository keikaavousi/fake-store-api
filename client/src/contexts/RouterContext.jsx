import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const RouterContext = createContext(null);

function currentRoute() {
  return {
    pathname: window.location.pathname,
    state: window.history.state,
  };
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(currentRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(currentRoute());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const value = useMemo(() => ({
    ...route,
    navigate(to, options = {}) {
      const method = options.replace ? 'replaceState' : 'pushState';
      window.history[method](options.state || null, '', to);
      setRoute(currentRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }), [route]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRoute() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRoute must be used inside RouterProvider');
  return context;
}

export function useNavigate() {
  return useRoute().navigate;
}

export function Link({ to, state, onClick, children, ...props }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
    ) {
      return;
    }

    event.preventDefault();
    navigate(to, { state });
  };

  return <a href={to} onClick={handleClick} {...props}>{children}</a>;
}

export function NavLink({ to, end = false, className = '', children, ...props }) {
  const { pathname } = useRoute();
  const active = end ? pathname === to : pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={`${className} ${active ? 'active' : ''}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
