/* global cy, describe, before, it */

describe("withHooks - extra arguments", () => {

  before(() => {
    cy.visit("/extra-arguments");
  });

  it("should show extra arguments", () => {
    cy.get("[data-test-id=counter] [data-test-id=extra]").should("contain", "extra");
  });

  it("should increase the 'with custom hooks' count with setCount", () => {
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "99");
    cy.get("[data-test-id=counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "100");
  });

});
