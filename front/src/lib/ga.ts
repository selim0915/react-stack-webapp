export const initGA = () => {
  const id = process.env.GA_MEASUREMENT_ID;

  if (!id || typeof window === 'undefined') return;

  // Check if script already exists
  if (document.getElementById('ga-gtag')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', id);
};

export const trackPageView = (path: string) => {
  const id = process.env.GA_MEASUREMENT_ID;
  if (id && window.gtag) {
    window.gtag('config', id, {
      page_path: path,
    });
  }
};
