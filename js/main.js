document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Exercise filter
  const muscleSel = document.getElementById('filter-muscle');
  const diffSel = document.getElementById('filter-difficulty');
  const equipSel = document.getElementById('filter-equipment');
  const cards = document.querySelectorAll('[data-exercise]');

  function applyFilters() {
    if (!cards.length) return;
    const m = muscleSel?.value || 'all';
    const d = diffSel?.value || 'all';
    const e = equipSel?.value || 'all';
    cards.forEach(c => {
      const okM = m === 'all' || c.dataset.muscle === m;
      const okD = d === 'all' || c.dataset.difficulty === d;
      const okE = e === 'all' || c.dataset.equipment === e;
      c.style.display = (okM && okD && okE) ? '' : 'none';
    });
  }
  [muscleSel, diffSel, equipSel].forEach(s => s && s.addEventListener('change', applyFilters));

  // BMI calculator
  const bmiForm = document.getElementById('bmi-form');
  if (bmiForm) {
    bmiForm.addEventListener('submit', e => {
      e.preventDefault();
      const h = parseFloat(document.getElementById('bmi-height').value) / 100;
      const w = parseFloat(document.getElementById('bmi-weight').value);
      if (!h || !w) return;
      const bmi = w / (h * h);
      const value = bmi.toFixed(1);
      let cat = 'Normalgewicht', color = '#8B5E3C';
      if (bmi < 18.5) { cat = 'Untergewicht'; color = '#C8A27A'; }
      else if (bmi < 25) { cat = 'Normalgewicht'; color = '#8B5E3C'; }
      else if (bmi < 30) { cat = 'Übergewicht'; color = '#a8643f'; }
      else { cat = 'Adipositas'; color = '#74492c'; }

      document.getElementById('bmi-value').textContent = value;
      const catEl = document.getElementById('bmi-cat');
      catEl.textContent = cat;
      catEl.style.color = color;

      const pct = Math.max(0, Math.min(100, ((bmi - 15) / 25) * 100));
      document.getElementById('bmi-indicator').style.left = pct + '%';
    });
  }
});
