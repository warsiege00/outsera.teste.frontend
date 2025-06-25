# Frontend - Outsera Desafio

Esta aplicação Angular permite consultar a lista de indicados e vencedores da categoria **Pior Filme** do Golden Raspberry Awards (Razzie), consumindo dados de uma API pública.

O sistema possui:
- **Dashboard**: Quatro painéis exibindo:
  - Anos com mais de um vencedor
  - Top 3 estúdios com mais vitórias
  - Produtores com maior e menor intervalo entre vitórias
  - Vencedores de um ano selecionado
- **Lista de Filmes**: Todos os filmes, com paginação e filtros por ano e por vencedor
- **Menu de navegação** entre as views

Os dados são obtidos da API: [https://challenge.outsera.tech/api/movies](https://challenge.outsera.tech/api/movies)

### Download projeto
```bash
git clone https://github.com/warsiege00/outsera.teste.frontend
```

### Instale as dependências

```bash
npm install
```

### Servidor de desenvolvimento

```bash
ng serve
```
Acesse: [http://localhost:4200/](http://localhost:4200/)

---

### Testes unitários

Execute todos os testes unitários com:

```bash
ng test
```

## 🖥️ Responsividade

O layout é otimizado para funcionar corretamente em telas a partir de **768x1280px** (tablets e desktops).

---

## 📚 Recursos

- [Documentação Angular](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)

---