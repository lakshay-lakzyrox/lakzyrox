(() => {
  const appConfig = window.LAKZYROX_CONFIG;
  const loginView = document.querySelector('[data-auth-view="login"]');
  const appView = document.querySelector('[data-auth-view="app"]');
  const message = document.querySelector(".form-message");
  const supabase = appConfig.supabaseUrl && appConfig.supabaseAnonKey && window.supabase ? window.supabase.createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey) : null;

  function showMessage(text) { if (message) message.textContent = text; }
  function showApp() { loginView.classList.add("is-hidden"); appView.classList.remove("is-hidden"); }
  function showLogin() { appView.classList.add("is-hidden"); loginView.classList.remove("is-hidden"); }

  if (!supabase) {
    showMessage("Add Supabase URL and anon key in js/config.js to enable login.");
  } else {
    supabase.auth.getSession().then(({ data }) => { if (data.session) showApp(); });
    supabase.auth.onAuthStateChange((_event, session) => { session ? showApp() : showLogin(); });
  }

  document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!supabase) return showMessage("Supabase is not configured yet.");
    const formData = new FormData(event.currentTarget);
    showMessage("Signing in...");
    const { error } = await supabase.auth.signInWithPassword({ email: formData.get("email"), password: formData.get("password") });
    showMessage(error ? error.message : "");
  });

  document.getElementById("logout-button").addEventListener("click", async () => { if (supabase) await supabase.auth.signOut(); });
})();
