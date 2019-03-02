/* global cy, describe, before, it */

describe("useEffect", () => {

  before(() => {
    cy.visit("/useEffect");
  });

  it("should run the effect only once with mount only", () => {
    cy.get("[data-test-id=run-count-mount-only] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=run-count-mount-only] [data-test-id=button]").click();
    cy.get("[data-test-id=run-count-mount-only] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=run-count-mount-only] [data-test-id=renderRunCount]").should("not.contain", "render called: 1");
  });

  it("should run the effect only after variable change", () => {
    cy.get("[data-test-id=run-count-on-change] [data-test-id=effectRunCount]").should("contain", "effect called: 1");
    cy.get("[data-test-id=run-count-on-change] [data-test-id=button]").click();
    cy.get("[data-test-id=run-count-on-change] [data-test-id=effectRunCount]").should("contain", "effect called: 2");
    cy.get("[data-test-id=run-count-on-change] [data-test-id=renderRunCount]").should("not.contain", "render called: 1");
  });

  it("should render with the initial value", () => {
    cy.get("#root.dark-mode").should("not.exist");
  });

  it("should update the class list after setDarkModeEnabled", () => {
    cy.get("[data-test-id=dark] [data-test-id=button]").click();
    cy.get("#root.dark-mode").should("exist");
  });

});
