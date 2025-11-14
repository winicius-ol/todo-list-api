# TODO
- [ ] Rotas de endpoint para a comunicação da API
- [ ] Criação das entidades necessárias para uma TODO list
  - [ ] Entidade `Task` (Tarefa)
    - [ ] Conteúdo de uma tarefa: título, descrição, status (concluída ou não concluída), data de prazo e timestamps (data de criação e data de atualização)
  - [ ] Entidade `TimeDependency` (Dependência de prazo)
    - [ ] Referência para a tarefa pai, Referência para a tarefa filha, delay (diferença de tempo **em dias** entre a tarefa pai e a tarefa filha)
    - [ ] Inicialmente a dependência só funcionará será simples, ou seja, a tarefa filha terá o prazo da tarefa pai + delay

## Ideias para o futuro
- [ ] Entidade `StatusDependency` (Dependência de status)
  - Exemplo: Uma tarefa filha mostra como **bloqueada** caso a tarefa pai ainda não esteja concluida (esse status não deve impedir o usuário de marcar a tarefa filha como concluida)
