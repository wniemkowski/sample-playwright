import { expect, test } from "../../pageObjects/pageFixture";

test(`Renders bar chart`, async ({ personalLoanPage }) => {
  // given
  const expectedResult = {
    Principal: "₹ 1,64,844",
    "Total Payment": "₹ 2,66,933",
    Year: "2026",
  };
  const expectedBarCount = 6;

  const inputData = {
    loanAmount: "1000000",
    interestRate: "12",
    tenure: "5",
  };
  await personalLoanPage.goto();

  // when
  await personalLoanPage.loanAmount.setSliderValue(inputData.loanAmount);
  await personalLoanPage.interestRate.setSliderValue(inputData.interestRate);
  await personalLoanPage.loanTenure.setSliderValue(inputData.tenure);
  await personalLoanPage.setStartMonth("Jul");

  // then
  const numberOfBars = await personalLoanPage.barChart.getBarCount();
  const barChartValues = await personalLoanPage.barChart.getValues(1);
  expect(barChartValues).toEqual(expectedResult);
  expect(numberOfBars).toEqual(expectedBarCount);
});
