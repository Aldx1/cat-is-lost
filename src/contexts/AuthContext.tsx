import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface IAuthContext {
  apiToken: string | null;
  setApiToken: (value: string | null) => void;
  loggedIn: boolean;
}

const AuthContext = createContext<IAuthContext>({
  apiToken: null,
  setApiToken: () => {},
  loggedIn: false,
});

interface IAuthProviderProps {
  children: ReactNode;
}

// Auth context to keep track of token and logged in status
export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [apiToken, setApiToken] = useState(localStorage.getItem("apiToken"));
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (apiToken && apiToken.length > 0) {
      localStorage.setItem("apiToken", apiToken);
      setLoggedIn(true);
    } else {
      localStorage.removeItem("apiToken");
      setLoggedIn(false);
    }
  }, [apiToken]);

  return (
    <AuthContext.Provider value={{ apiToken, setApiToken, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  return context;
};
