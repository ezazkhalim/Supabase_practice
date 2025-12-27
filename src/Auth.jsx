import {supabase} from "./supabaseClient";
import { useState } from "react";

export default function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
    // Supabase orqali login qilish
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,       // foydalanuvchi yozgan email
        password: password, // foydalanuvchi yozgan parol
    });

    if (error) {
        // Agar parol xato bo'lsa yoki bunday user bo'lmasa
        alert("Kirishda xato: " + error.message);
        return;
    }

    // Agar hammasi to'g'ri bo'lsa
    if (data.user) {
        alert("Xush kelibsiz! Tizimga kirdingiz.");
        console.log("Kirgan foydalanuvchi:", data.user);
        
        // Bu yerda foydalanuvchini Home sahifasiga yo'naltirishingiz mumkin
        // masalan: window.location.href = '/dashboard';
    }
}

      return (
    <div>
      <h2>Log in</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button onClick={handleSignIn}>Log In</button>
    </div>
  );
}