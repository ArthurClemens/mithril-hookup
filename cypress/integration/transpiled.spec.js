/* global cy, describe, before, it */

describe("transpiled", () => {

  before(() => {
    cy.visit("/transpiled");
  });

  it("should increase the 'with custom hooks' count with setCount", () => {
    cy.get("[data-test-id=counter] [data-test-id=extra]").should("contain", "extra");
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "99");
    cy.get("[data-test-id=counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "100");
  });

});
