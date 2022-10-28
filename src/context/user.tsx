import React, {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { supabase } from "../utils/supabase";
import type { Session } from "@supabase/supabase-js";

interface IUser {
  email?: string;
}

interface IUserObj {
  user: IUser | null;
}

interface IUserContext {
  session: Session | null;
  signup: any;
  login: any;
  logout: (() => Promise<void>) | undefined;
}

interface IOwnProps {
  children: JSX.Element;
}

export const UserCtx = createContext<IUserContext>({
  session: null,
  signup: undefined,
  login: undefined,
  logout: undefined,
});

const UserProvider: React.FC<IOwnProps> = ({ children }) => {
  const [user, setUser] = useState<IUserObj | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const signup = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: pass,
    });
  };

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass,
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const exposed = {
    session,
    signup,
    login,
    logout,
  };

  return (
    <UserCtx.Provider value={exposed}>{children}</UserCtx.Provider>
  );
};

export const useUser = () => {
  return useContext(UserCtx);
};

export default UserProvider;
