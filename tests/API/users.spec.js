import { test, expect } from "../../pageObjects/pageFixture";

test(`User API page 2 has valid response`, async ({ request }) => {
  // given
  const url = "https://reqres.in/api/users?page=2";
  const expectedResponse = require("../../fixtures/users.json");

  // when
  const response = await request.get(url);
  const responseBody = await response.json();
  const { data } = responseBody;

  // then
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const filteredData = data.map(({ id, first_name, last_name, email }) => ({
    id,
    first_name,
    last_name,
    email,
  }));
  expect(filteredData).toEqual(expectedResponse);
});
