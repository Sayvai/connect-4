describe('Game', () => {
  // re-usable, readable, and maintainable selector references
  enum Selector {
    GameBoard = '[aria-label="game board"]',
    Column = '[aria-label="game board column"]',
    CircleGrey = '[aria-label="game board circle grey"]',
    CircleRed = '[aria-label="game board circle red"]',
    TurnRed = '[aria-label="Red\'s turn"]',
    TurnYellow = '[aria-label="Yellow\'s turn"]',
    WinRed = '[aria-label="Red wins!"]',
    Reset = '[aria-label="Reset"]',
  }

  beforeEach(() => {
    cy.visit('http://localhost:3000/'); // just to have a fresh board for each test
  })

  it('should load the board and the reset button (disabled)', () => {
    cy.get(Selector.GameBoard).should('exist');
    cy.get(Selector.Column).should('have.length', 7);
    cy.get(Selector.CircleGrey).should('have.length', 42);
    cy.get(Selector.TurnRed).should('exist');
    cy.get(Selector.Reset).should('exist').and('be.disabled');
  })

  it(`should click on the board
      - and render the red circle onto the board
      - and change the player's turn text
      - and enable the reset button`, () => {
    cy.get(Selector.CircleRed).should('not.exist');
    cy.get(Selector.TurnRed).should('exist');

    cy.get(Selector.Column).eq(0).click();

    cy.get(Selector.CircleRed).should('exist');
    cy.get(Selector.TurnYellow).should('exist');
    cy.get(Selector.Reset).should('exist').and('not.be.disabled');
  })

  it('should be able to reset the game', () => {
    cy.get(Selector.Column).eq(0).click();

    cy.get(Selector.CircleRed).should('exist');
    cy.get(Selector.TurnYellow).should('exist');
    cy.get(Selector.CircleGrey).should('not.have.length', 42);

    cy.get(Selector.Reset).click();

    cy.get(Selector.CircleRed).should('not.exist');
    cy.get(Selector.TurnYellow).should('not.exist');
    cy.get(Selector.TurnRed).should('exist');
    cy.get(Selector.CircleGrey).should('have.length', 42);
  })

  it('should win the game horizontally', () => {
    cy.get(Selector.CircleGrey).should('have.length', 42); // assert no connect pieces are on the board

    // win the game
    cy.get(Selector.Column).eq(0).click();
    cy.get(Selector.Column).eq(0).click();
    cy.get(Selector.Column).eq(1).click();
    cy.get(Selector.Column).eq(1).click();
    cy.get(Selector.Column).eq(2).click();
    cy.get(Selector.Column).eq(2).click();
    cy.get(Selector.Column).eq(3).click();

    cy.get(Selector.TurnRed).should('not.exist');
    cy.get(Selector.TurnYellow).should('not.exist');

    cy.get(Selector.WinRed).should('exist');
  })

  it('should persist the current game state after a browser referesh', () => {
    cy.get(Selector.Column).eq(0).click();

    cy.get(Selector.CircleRed).should('exist');
    cy.get(Selector.TurnYellow).should('exist');

    cy.reload();

    cy.get(Selector.CircleRed).should('exist');
    cy.get(Selector.TurnYellow).should('exist');
  })
})

export { }
