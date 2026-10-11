
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// TROQUE ESTES DOIS VALORES PELOS DADOS DO SEU PROJETO
const SUPABASE_URL = 'https://mcbxymqrqafxfctvlmal.supabase.co';
const SUPABASE_KEY = 'sb_publishable_lSSdDTMb76jlduawHPC6lA_y-dz-ptO';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signupButton = document.getElementById('signup');
const statusBox = document.getElementById('status');

function showStatus(message) {
  statusBox.textContent = message;
}

signupButton.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || password.length < 8) {
    showStatus('Digite um e-mail válido e uma senha de pelo menos 8 caracteres.');
    return;
  }

  signupButton.disabled = true;
  showStatus('Criando sua conta...');

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) throw error;

    if (data.session) {
      showStatus('Conta criada! Você já pode entrar.');
    } else {
      showStatus('Conta criada! Confira seu e-mail para confirmar o cadastro antes de entrar.');
    }
  } catch (error) {
    showStatus('Não foi possível criar a conta: ' + error.message);
  } finally {
    signupButton.disabled = false;
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    showStatus('Preencha o e-mail e a senha.');
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  showStatus('Entrando...');

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    showStatus('Login realizado com sucesso! Próxima etapa: abrir suas conversas.');
  } catch (error) {
    showStatus('Não foi possível entrar: ' + error.message);
  } finally {
    submitButton.disabled = false;
  }
});
