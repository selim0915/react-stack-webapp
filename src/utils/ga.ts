const id = process.env.GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!id || typeof window === 'undefined') return;

  // Check if script already exists
  if (document.getElementById('ga-gtag')) return;

  const script = document.createElement('script');
  script.id = 'ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
};

export const trackPageView = (path: string) => {
  if (!id || typeof window === 'undefined') return;

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
