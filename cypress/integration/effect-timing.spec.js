/* global cy, describe, before, it */

describe("effect timing", () => {

  before(() => {
    cy.visit("/effect-timing");
  });

  it("should show layout effects called after effects", () => {
    cy.get("[data-test-id=button]").click();
    cy.get("[data-test-id=useEffect]").invoke("text").then((useEffect) => {
      cy.get("[data-test-id=useLayoutEffect]").invoke("text").then((useLayoutEffect) => {
        const useEffectTime = parseInt(useEffect, 10);
        const useLayoutEffectTime = parseInt(useLayoutEffect, 10);
        cy.expect(useEffectTime).to.be.greaterThan(useLayoutEffectTime);
      });
    });
  });

});
