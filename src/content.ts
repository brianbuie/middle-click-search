(() => {
  let query = '';

  document.addEventListener('selectionchange', () => {
    const text = window.getSelection()?.toString();
    if (!text?.length) return;
    query = text;
  });

  document.addEventListener('auxclick', e => {
    let el = e.target as Element | null;

    while (el) {
      if (el?.tagName === 'A') return;
      el = el?.parentElement;
    }

    if (!query?.length) return;

    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  });
})();
