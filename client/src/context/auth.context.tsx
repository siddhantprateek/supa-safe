import React, { createContext, useEffect, useState } from 'react'
import { createClient, Session } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey: string = process.env.REACT_APP_SUPABASE_KEY || ''
export const supabase = createClient(supabaseUrl, supabaseKey)


// interface AuthContextProps {
//   user: string;
//   isAuthenticated: boolean;
//   signUp: () => void;
//   login: () => void;
// }

export const AuthContext = createContext<Session| null>(null)


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  )
}


