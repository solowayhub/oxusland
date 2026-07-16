const DEPOSIT_RATE = 0.008;
const FIRSTLINE_RATE = 0.002;
const DOWNLINE_MULTIPLIER = 4;
const DOWNLINE_RATE = 0.0004;

function formatMoney(value) {
  return `$${Math.round(value).toLocaleString('ru-RU')}`;
}

function initCalculator() {
  const calc = document.querySelector('[data-calculator]');
  if (!calc) return;

  const depositInput = calc.querySelector('[data-calc-deposit]');
  const partnersInput = calc.querySelector('[data-calc-partners]');
  const avgInput = calc.querySelector('[data-calc-avg]');

  const depositValueEl = calc.querySelector('[data-calc-deposit-value]');
  const partnersValueEl = calc.querySelector('[data-calc-partners-value]');
  const avgValueEl = calc.querySelector('[data-calc-avg-value]');

  const depositIncomeEl = calc.querySelector('[data-calc-deposit-income]');
  const firstlineIncomeEl = calc.querySelector('[data-calc-firstline-income]');
  const downlineIncomeEl = calc.querySelector('[data-calc-downline-income]');
  const dailyEl = calc.querySelector('[data-calc-daily]');
  const monthlyEl = calc.querySelector('[data-calc-monthly]');
  const days90El = calc.querySelector('[data-calc-90days]');

  function recalculate() {
    const deposit = parseFloat(depositInput.value);
    const partners = parseFloat(partnersInput.value);
    const avgDeposit = parseFloat(avgInput.value);

    depositValueEl.textContent = deposit.toLocaleString('ru-RU');
    partnersValueEl.textContent = partners.toLocaleString('ru-RU');
    avgValueEl.textContent = avgDeposit.toLocaleString('ru-RU');

    const depositIncome = deposit * DEPOSIT_RATE;
    const firstlineVolume = partners * avgDeposit;
    const firstlineIncome = firstlineVolume * FIRSTLINE_RATE;
    const downlineVolume = firstlineVolume * DOWNLINE_MULTIPLIER;
    const downlineIncome = downlineVolume * DOWNLINE_RATE;
    const daily = depositIncome + firstlineIncome + downlineIncome;

    depositIncomeEl.textContent = formatMoney(depositIncome);
    firstlineIncomeEl.textContent = formatMoney(firstlineIncome);
    downlineIncomeEl.textContent = formatMoney(downlineIncome);
    dailyEl.textContent = formatMoney(daily);
    monthlyEl.textContent = formatMoney(daily * 30);
    days90El.textContent = formatMoney(daily * 90);
  }

  [depositInput, partnersInput, avgInput].forEach((input) => {
    input.addEventListener('input', recalculate);
  });

  recalculate();
}
