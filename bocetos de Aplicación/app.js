// 1. Configuración ÚNICA (sin duplicados)
// app.js - Solo esto debe ir al principio
const supabaseUrl = 'https://stgaonbbjmrhermdbggq.supabase.co';
const supabaseKey = 'sb_publishable_lR9F5OofkbvKEBrp37MOkw_nJ7L3rKP';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
// 2. Registro (handleRegister)
async function handleRegister() {
    const statusEl = document.getElementById('register-status');
    statusEl.innerText = "Registrando...";

    const email = document.getElementById('setup-email').value;
    const nombre = document.getElementById('setup-name').value;
    const pass = document.getElementById('setup-pass').value;

    const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: { data: { nombre } }
    });

    if (error) {
        statusEl.innerText = "Error: " + error.message;
        statusEl.style.color = "red";
    } else {
        statusEl.innerText = "¡Registro exitoso! Confirma tu email.";
        statusEl.style.color = "green";
    }
}

// 3. Login (doLogin)
async function doLogin() {
    const statusEl = document.getElementById('login-status');
    statusEl.innerText = "Iniciando...";

    const email = document.getElementById('input-email').value;
    const pass = document.getElementById('input-pass').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });

    if (error) {
        statusEl.innerText = "Error: " + error.message;
        statusEl.style.color = "red";
    } else {
        const nombre = data.user.user_metadata.nombre || "Usuario";
        entrarApp(nombre);
    }
}

function entrarApp(nombre) {
    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-app').classList.remove('hidden');
    document.querySelector('.s-user-name').innerText = "Hola, " + nombre;
}