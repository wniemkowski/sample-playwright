import { expect, test } from "../pageObjects/pageFixture";

[
  { loanAmount: "2500000", interestRate: "10", tenure: "10" },
  { loanAmount: "5000000", interestRate: "7.5", tenure: "15" },
].map((data) => {
  test(`Renders pie chart for loan amount: ${data.loanAmount} interest rate: ${data.interestRate} Tenure: ${data.tenure}`, async ({
    homeLoanPage,
  }) => {
    // given
    const expectedResult = calculatePieChartPercentages(data);
    await homeLoanPage.goto();

    // when
    await homeLoanPage.loanAmount.setValue(data.loanAmount);
    await homeLoanPage.interestRate.setValue(data.interestRate);
    await homeLoanPage.loanTenure.setValue(data.tenure);

    // then
    await expect.toPass(async () => {
      const pieChartValues = await homeLoanPage.pieChart.getValues();
      expect(pieChartValues).toEqual({
        "Principal Loan Amount": expectedResult.principalPercent + "%",
        "Total Interest": expectedResult.interestPercent + "%",
      });
    });
  });
});

function calculatePieChartPercentages({ loanAmount, interestRate, tenure }) {
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
