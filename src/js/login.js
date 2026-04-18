/* ══════════════════════════════════════════════════
   VIRTO ELÉTRICA — Login Page JS
   Autenticação com Supabase Auth
   ══════════════════════════════════════════════════ */

import { inject } from '@vercel/analytics';

import '../css/variables.css';
import '../css/base.css';
import '../css/login.css';

// Vercel Analytics
inject();

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ── Supabase Client ──
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Elementos do DOM ──
const form         = document.getElementById('loginForm');
const emailInput   = document.getElementById('loginEmail');
const senhaInput   = document.getElementById('loginSenha');
const toggleBtn    = document.getElementById('toggleSenha');
const submitBtn    = document.getElementById('loginBtn');
const errorBox     = document.getElementById('loginError');
const errorMsg     = document.getElementById('loginErrorMsg');

// ── Toggle ver/ocultar senha ──
toggleBtn?.addEventListener('click', () => {
  const isPassword = senhaInput.type === 'password';
  senhaInput.type = isPassword ? 'text' : 'password';

  const eyeOpen = toggleBtn.querySelector('.eye-open');
  const eyeClosed = toggleBtn.querySelector('.eye-closed');
  if (eyeOpen && eyeClosed) {
    eyeOpen.style.display = isPassword ? 'none' : 'block';
    eyeClosed.style.display = isPassword ? 'block' : 'none';
  }
});

// ── Mostrar erro ──
function showError(msg) {
  if (errorBox && errorMsg) {
    errorMsg.textContent = msg;
    errorBox.classList.add('show');
  }
}

// ── Esconder erro ──
function hideError() {
  errorBox?.classList.remove('show');
}

// ── Traduzir erros do Supabase ──
function traduzirErro(error) {
  const msg = error?.message?.toLowerCase() || '';

  if (msg.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de fazer login.';
  }
  if (msg.includes('too many requests') || msg.includes('rate limit')) {
    return 'Muitas tentativas. Aguarde alguns minutos.';
  }
  if (msg.includes('user not found')) {
    return 'Nenhuma conta encontrada com este e-mail.';
  }
  if (msg.includes('network') || msg.includes('fetch')) {
    return 'Erro de conexão. Verifique sua internet.';
  }
  if (msg.includes('user already registered')) {
    return 'Este e-mail já está cadastrado.';
  }
  if (msg.includes('signup is disabled')) {
    return 'Cadastro desabilitado. Fale com o administrador.';
  }

  return 'Erro ao fazer login. Tente novamente.';
}

// ── Estado de loading ──
function setLoading(loading) {
  if (loading) {
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
  } else {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
}

// ── Submit do formulário ──
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  hideError();

  const email = emailInput.value.trim();
  const senha = senhaInput.value;

  // Validação básica
  if (!email || !senha) {
    showError('Preencha todos os campos.');
    return;
  }

  if (senha.length < 6) {
    showError('A senha deve ter pelo menos 6 caracteres.');
    return;
  }

  setLoading(true);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) throw error;

    // Login bem-sucedido — redirecionar
    console.log('Login realizado:', data.user.email);
    window.location.href = '/';

  } catch (err) {
    showError(traduzirErro(err));
  } finally {
    setLoading(false);
  }
});

// ── Login com Google ──
const googleBtn = document.getElementById('googleBtn');
googleBtn?.addEventListener('click', async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/',
      },
    });

    if (error) throw error;
  } catch (err) {
    showError(traduzirErro(err));
  }
});

// ── Esconder erro ao digitar ──
emailInput?.addEventListener('input', hideError);
senhaInput?.addEventListener('input', hideError);

// ── Verificar se já está logado ao carregar ──
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = '/';
  }
});
