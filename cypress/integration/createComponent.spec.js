/* global cy, describe, before, it */

describe("createComponent", () => {

  before(() => {
    cy.visit("/createComponent");
  });

  it("should increase the 'with custom hooks' count with setCount", () => {
    cy.get("[data-test-id=core-counter] [data-test-id=count]").should("contain", "1");
    cy.get("[data-test-id=core-counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=core-counter] [data-test-id=count]").should("contain", "2");
  });

  it("should increase the 'with custom hooks' counters with addCounter", () => {
    cy.get("[data-test-id=core-counter] [data-test-id=counters]").should("contain", "1");
    cy.get("[data-test-id=core-counter] [data-test-id=add-counter]").click();
    cy.get("[data-test-id=core-counter] [data-test-id=counters]").should("contain", "2");
  });

  it("should increase the 'simple component' count with setCount", () => {
    cy.get("[data-test-id=core-simple-counter] [data-test-id=count]").should("contain", "10");
    cy.get("[data-test-id=core-simple-counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=core-simple-counter] [data-test-id=count]").should("contain", "11");
  });

});
