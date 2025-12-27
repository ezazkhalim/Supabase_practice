import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Hozirgi sessiyani tekshirish (sahifa yangilanganda kerak)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Kirish-chiqishni poylash (onAuthStateChange)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  console.log("Joriy sessiya:", session);

  return (
    <div className="App">
      {/* Agar sessiya bo'lmasa Loginni ko'rsat, bo'lsa Dashboardni */}
      {!session ? (
        <Auth />
      ) : (
        <Dashboard user={session.user} />
      )}
    </div>
  );
}

export default App;