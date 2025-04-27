export function calculatePieChartPercentages({
  loanAmount,
  interestRate,
  tenure,
}) {
  const P = Number(loanAmount);
  const annualRate = Number(interestRate);
  const years = Number(tenure);

  const r = annualRate / 12 / 100; // monthly interest rate
  const n = years * 12; // number of months

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const principalPercent = (P / totalPayment) * 100;
  const interestPercent = (totalInterest / totalPayment) * 100;

  return {
    principalPercent: principalPercent.toFixed(1),
    interestPercent: interestPercent.toFixed(1),
  };
}
