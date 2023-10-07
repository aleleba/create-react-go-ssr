describe('Initial Component Tests', () => {
	it('Will show the Initial Component page.', () => {
		cy.visit('/');
    cy.get('a').contains('Other Component');
	});
  it('Will Redirect to Other Component page.', () => {
		cy.visit('/');
    cy.get('a').contains('Other Component').click();
    cy.get('a').contains('Initial Component');
	});
	it('Will show the Other Component page.', () => {
		cy.visit('/other-component');
    cy.get('a').contains('Initial Component');
	});
	it('Will Redirect to Initial Component page.', () => {
		cy.visit('/other-component');
    cy.get('a').contains('Initial Component').click();
		cy.get('a').contains('Other Component');
	});
});