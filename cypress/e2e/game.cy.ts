describe('Game', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // just to have a fresh board for each test
  })

  it('should load the board and the reset button (disabled)', () => {
    cy.get('[aria-label="game board"]').should('exist');
    cy.get('[aria-label="game board column"]').should('have.length', 7);
    cy.get('[aria-label="game board circle grey"]').should('have.length', 42);
    cy.get('[aria-label="Red\'s turn"]').should('exist');
    cy.get('[aria-label="Reset"]').should('exist').and('be.disabled');
  })

  it(`should click on the board
      - and render the red circle onto the board
      - and change the player\'s turn text
      - and enable the reset button`, () => {
    cy.get('[aria-label="game board circle red"').should('not.exist');
    cy.get('[aria-label="Red\'s turn"]').should('exist');

    cy.get('[aria-label="game board column"]').eq(0).click();

    cy.get('[aria-label="game board circle red"').should('exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('exist');
    cy.get('[aria-label="Reset"]').should('exist').and('not.be.disabled');
  })

  it('should be able to reset the game', () => {
    cy.get('[aria-label="game board column"]').eq(0).click();

    cy.get('[aria-label="game board circle red"').should('exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('exist');
    cy.get('[aria-label="game board circle grey"]').should('not.have.length', 42);

    cy.get('[aria-label="Reset"]').click();

    cy.get('[aria-label="game board circle red"').should('not.exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('not.exist');
    cy.get('[aria-label="Red\'s turn"]').should('exist');
    cy.get('[aria-label="game board circle grey"]').should('have.length', 42);
  })

  it('should win the game horizontally', () => {
    cy.get('[aria-label="game board circle grey"]').should('have.length', 42); // assert no connect pieces are on the board

    // win the game
    cy.get('[aria-label="game board column"]').eq(0).click();
    cy.get('[aria-label="game board column"]').eq(0).click();
    cy.get('[aria-label="game board column"]').eq(1).click();
    cy.get('[aria-label="game board column"]').eq(1).click();
    cy.get('[aria-label="game board column"]').eq(2).click();
    cy.get('[aria-label="game board column"]').eq(2).click();
    cy.get('[aria-label="game board column"]').eq(3).click();

    cy.get('[aria-label="Red\'s turn"]').should('not.exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('not.exist');

    cy.get('[aria-label="Red wins!"]').should('exist');
  })

  it('should persist the current game state after a browser referesh', () => {
    cy.get('[aria-label="game board column"]').eq(0).click();

    cy.get('[aria-label="game board circle red"').should('exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('exist');

    cy.reload();

    cy.get('[aria-label="game board circle red"').should('exist');
    cy.get('[aria-label="Yellow\'s turn"]').should('exist');
  })
})

export { }
