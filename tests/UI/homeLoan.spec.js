import { expect, test } from "../../pageObjects/pageFixture";
import { calculatePieChartPercentages } from "../../utils/helpers";

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
    await homeLoanPage.loanAmount.input.setValue(data.loanAmount);
    await homeLoanPage.interestRate.input.setValue(data.interestRate);
    await homeLoanPage.loanTenure.input.setValue(data.tenure);

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
