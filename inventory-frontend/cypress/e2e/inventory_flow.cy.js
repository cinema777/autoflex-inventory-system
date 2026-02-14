describe('Fluxo Completo de Produção - Autoflex', () => {
  it('Deve cadastrar material, produto e criar o vínculo entre eles', () => {
    // 1. Acessa o sistema
    cy.visit('http://localhost:5173');

    // 2. Incluir um Material
    const materialNome = 'Madeira Nobre ' + Date.now();
    cy.get('input').first().type(materialNome); // Campo Material Name
    cy.get('input').eq(1).type('100');          // Campo Quantity
    cy.contains('Add').click();
    cy.contains(materialNome).should('be.visible');

    // 3. Incluir um Produto
    const produtoNome = 'Mesa de Jantar ' + Date.now();
    cy.get('input').eq(2).type(produtoNome);    // Campo Product Name
    cy.get('input').eq(3).type('500.00');       // Campo Price
    cy.contains('Create').click();
    cy.contains(produtoNome).should('be.visible');

    // 4. Agregar o Material ao Produto (Link)
    // Seleciona o produto que acabamos de criar no primeiro <select>
    cy.get('select').first().select(produtoNome);
    
    // Seleciona o material que acabamos de criar no segundo <select>
    cy.get('select').last().select(materialNome);
    
    // Define que cada mesa usa 5 unidades de madeira
    cy.get('input').last().type('5');
    cy.contains('Link Material').click();

    // 5. Validação Final
    // Verifica se o card de produção deixou de mostrar a mensagem de espera
    cy.contains('Waiting for recipes').should('not.exist');
    
    // Valida se o nome do produto e o cálculo de 20 unidades aparecem na tela
    cy.contains(produtoNome).should('be.visible');
    cy.contains('Can produce: 20 units').should('be.visible');
  });
});