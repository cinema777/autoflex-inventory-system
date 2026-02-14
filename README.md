# Autoflex - Manufacturing Control Center 🏭

Sistema full-stack desenvolvido para o controle de estoque de matérias-primas e gestão de produção industrial.

## 🚀 Tecnologias Utilizadas

### Back-end
- **Java 21** com **Quarkus 3.6.4**.
- **Hibernate ORM** com **Panache** para persistência.
- **PostgreSQL** como banco de dados relacional.
- **JUnit 5** e **Rest-Assured** para testes unitários e de API.

### Front-end
- **React** com **Vite**.
- **Cypress** para testes de integração de ponta a ponta (E2E).
- **CSS3** com foco em interface responsiva e modo escuro.

## 🛠️ Funcionalidades Principais
- **Gestão de Inventário**: Cadastro, listagem e exclusão de matérias-primas e produtos.
- **Recipe Builder**: Vinculação dinâmica de materiais a produtos com definição de quantidade por unidade.
- **Production Strategy**: Cálculo em tempo real da capacidade produtiva e potencial financeiro baseado no estoque atual.
- **Priorização Inteligente**: Algoritmo que sugere a produção baseada no maior lucro (RF008).

## 🧪 Como Rodar os Testes
### Integração (Cypress)
1. Navegue até `inventory-frontend`.
2. Execute `npx cypress run` para rodar os testes em modo headless ou `npx cypress open` para a interface visual.

## 🏁 Como Executar o Projeto
1. **Back-end**: Na pasta `inventory-api`, execute `mvn quarkus:dev`.
2. **Front-end**: Na pasta `inventory-frontend`, execute `npm run dev`.
3. Acesse `http://localhost:5173`.