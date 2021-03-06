/* global cy, describe, before, it */

describe("withHooks", () => {

  before(() => {
    cy.visit("/TestWithHooks");
  });

  it("should increase the 'with custom hooks' count with setCount", () => {
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "1");
    cy.get("[data-test-id=counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=counter] [data-test-id=count]").should("contain", "2");
  });

  it("should increase the 'with custom hooks' counters with addCounter", () => {
    cy.get("[data-test-id=counter] [data-test-id=counters]").should("contain", "1");
    cy.get("[data-test-id=counter] [data-test-id=add-counter]").click();
    cy.get("[data-test-id=counter] [data-test-id=counters]").should("contain", "2");
  });

  it("should increase the 'simple component' count with setCount", () => {
    cy.get("[data-test-id=simple-counter] [data-test-id=count]").should("contain", "10");
    cy.get("[data-test-id=simple-counter] [data-test-id=add-count]").click();
    cy.get("[data-test-id=simple-counter] [data-test-id=count]").should("contain", "11");
  });

  it("should show children", () => {
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=count]").should("contain", "10");
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=add-count]").click();
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=count]").should("contain", "11");
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=children]").should("contain", "One");
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=children]").should("contain", "Two");
    cy.get("[data-test-id=simple-counter-with-children] [data-test-id=children]").should("contain", "Three");
  });

});
