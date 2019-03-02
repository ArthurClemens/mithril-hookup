/* global cy, describe, before, it */

describe("useRef", () => {

  before(() => {
    cy.visit("/useRef");
  });

  it("should get the dom element and retrieve attributes", () => {
    cy.get("[data-test-id=render]").click();
    cy.get("[data-test-id=textContent]").should("contain", "QWERTY");
  });

});
