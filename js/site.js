(() => {
  const appConfig = window.LAKZYROX_CONFIG;
  const supabase = createSupabaseClient();

  function createSupabaseClient() {
    if (!appConfig.supabaseUrl || !appConfig.supabaseAnonKey || !window.supabase) return null;
    return window.supabase.createClient(appConfig.supabaseUrl, appConfig.supabaseAnonKey);
  }

  function applyConfig(config) {
    const data = config.siteData;
    const theme = config.theme;
    document.querySelectorAll("[data-site-name]").forEach((element) => { element.textContent = data.siteName; });
    document.querySelectorAll("[data-content]").forEach((element) => {
      const key = element.dataset.content;
      if (data[key]) element.textContent = data[key];
    });
    document.querySelectorAll("[data-link]").forEach((element) => {
      const url = data[element.dataset.link];
      if (url) element.href = url;
    });
    document.documentElement.style.setProperty("--background", theme.background);
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--text", theme.text);
    document.documentElement.style.setProperty("--radius", `${theme.radius}px`);
    document.documentElement.style.setProperty("--shadow", theme.shadow);
    document.documentElement.style.setProperty("--font", `"${theme.font}", sans-serif`);
    if (!theme.animations) document.documentElement.classList.add("reduced-motion");
  }

  async function loadPublishedConfig() {
    if (!supabase) return appConfig.defaults;
    const { data, error } = await supabase.from("published_configurations").select("config").eq("site_key", "lakzyrox").maybeSingle();
    if (error || !data?.config) return appConfig.defaults;
    return { ...appConfig.defaults, ...data.config, siteData: { ...appConfig.defaults.siteData, ...data.config.siteData }, theme: { ...appConfig.defaults.theme, ...data.config.theme }, layout: { ...appConfig.defaults.layout, ...data.config.layout } };
  }

  loadPublishedConfig().then(applyConfig).catch(() => applyConfig(appConfig.defaults));
})();
