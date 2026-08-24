import { expect, test } from "../../pageObjects/pageFixture";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getExpectedStartYear(startMonth) {
  const now = new Date();
  const targetMonthIndex = MONTHS.indexOf(startMonth);
  const year = now.getFullYear();
  // the datepicker always picks the next future occurrence of the month
  return now.getMonth() > targetMonthIndex ? year + 1 : year;
}

test(`Renders bar chart`, async ({ personalLoanPage }) => {
  // given
  const inputData = {
    loanAmount: "1000000",
    interestRate: "12",
    tenure: "5",
    startMonth: "Jul",
  };
  const expectedResult = {
    Principal: "₹ 1,64,844",
    "Total Payment": "₹ 2,66,933",
    Year: String(getExpectedStartYear(inputData.startMonth)),
  };
  const expectedBarCount = 6;
  await personalLoanPage.goto();

  // when
  await personalLoanPage.loanAmount.setSliderValue(inputData.loanAmount);
  await personalLoanPage.interestRate.setSliderValue(inputData.interestRate);
  await personalLoanPage.loanTenure.setSliderValue(inputData.tenure);
  await personalLoanPage.setStartMonth(inputData.startMonth);

  // then
  const numberOfBars = await personalLoanPage.barChart.getBarCount();
  const barChartValues = await personalLoanPage.barChart.getTooltipValues(1);
  expect(numberOfBars).toEqual(expectedBarCount);
  expect(barChartValues).toEqual(expectedResult);
});
