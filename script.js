// 1. Supabase Credentials
const SUPABASE_URL = "https://vrsvqlitruoetnwrqxrd.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_key_here"; // Apni Supabase Anon/Publishable Key yahan rakhein

// 2. Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Tab Switching (Login / Sign Up)
function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTabBtn = document.getElementById('loginTabBtn');
    const signupTabBtn = document.getElementById('signupTabBtn');
    const authMessage = document.getElementById('authMessage');

    authMessage.textContent = '';
    authMessage.className = 'message';

    if (tab === 'login') {
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
        loginTabBtn.classList.add('active');
        signupTabBtn.classList.remove('active');
    } else {
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
        signupTabBtn.classList.add('active');
        loginTabBtn.classList.remove('active');
    }
}

// 4. Handle Sign Up
async function handleSignUp(event) {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const authMessage = document.getElementById('authMessage');

    authMessage.textContent = 'Creating account...';
    authMessage.className = 'message info';

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
            authMessage.className = 'message error';
        } else {
            authMessage.textContent = 'Account created successfully! Please check your email for verification.';
            authMessage.className = 'message success';
        }
    } catch (err) {
        authMessage.textContent = 'Something went wrong. Please try again.';
        authMessage.className = 'message error';
    }
}

// 5. Handle Login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const authMessage = document.getElementById('authMessage');

    authMessage.textContent = 'Logging in...';
    authMessage.className = 'message info';

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            authMessage.textContent = error.message;
            authMessage.className = 'message error';
        } else {
            authMessage.textContent = 'Login successful! Welcome back.';
            authMessage.className = 'message success';
        }
    } catch (err) {
        authMessage.textContent = 'Login failed. Please check credentials.';
        authMessage.className = 'message error';
    }
}
