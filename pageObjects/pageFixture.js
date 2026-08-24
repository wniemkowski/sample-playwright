const base = require("@playwright/test");
import PersonalLoan from "../pageObjects/pages/personalLoan.js";
import HomeLoan from "../pageObjects/pages/homeLoan.js";

const test = base.test.extend({
  homeLoanPage: async ({ page }, use) => {
    const homeLoan = new HomeLoan(page);
    await use(homeLoan);
  },

  personalLoanPage: async ({ page }, use) => {
    const personalLoan = new PersonalLoan(page);
    await use(personalLoan);
  },
});

module.exports = {
  test,
  expect: base.expect,
};
