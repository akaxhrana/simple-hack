import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://nsoyplhdilfsljrygheq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zb3lwbGhkaWxmc2xqcnlnaGVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDc2NTIsImV4cCI6MjA2NzM4MzY1Mn0.HpJoRz9uc-jDtZAvUyeKYZubUR6WmLs6zkTE8NpJdcI';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

if (loginBtn) {
  loginBtn.onclick = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login failed: ' + error.message);
      console.error(error);
    } else {
      window.location = 'index.html';
    }
  };
}

if (signupBtn) {
  signupBtn.onclick = async () => {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Signup failed: ' + error.message);
      console.error(error);
    } else {
      alert('Success! Check your email to confirm, then log in.');
      window.location = 'login.html';
    }
  };
}