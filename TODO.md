# TODO
- [x] Rotas de endpoint para a comunicação da API
- [ ] Criação das entidades necessárias para uma TODO list
  - [ ] Entidade `Task` (Tarefa)
    - [ ] Conteúdo de uma tarefa: título, descrição, status (concluída ou não concluída), data de prazo e timestamps (data de criação e data de atualização)
  - [ ] Entidade `TimeDependency` (Dependência de prazo)
    - [ ] Referência para a tarefa pai, Referência para a tarefa filha, delay (diferença de tempo **em dias** entre a tarefa pai e a tarefa filha)
    - [ ] Inicialmente a dependência só funcionará será simples, ou seja, a tarefa filha terá o prazo da tarefa pai + delay
- [ ] Serviços de CRUD da API
  - [ ] Serviço de criação de tarefa
    - [ ] Considerar dependência de tempo (se informado) ao criar a tarefa
  - [ ] Serviço de atualização de tarefa
    - [ ] Se a data de prazo da tarefa for alterada, as tarefas filhas devem ter sua data de prazo recalculadas e atualizadas
    - [ ] Se o delay da tarefa for alterado, a sua própria data de prazo deve ser recalculada

## Ideias para o futuro
- [ ] Entidade `StatusDependency` (Dependência de status)
  - Exemplo: Uma tarefa filha mostra como **bloqueada** caso a tarefa pai ainda não esteja concluida (esse status não deve impedir o usuário de marcar a tarefa filha como concluida)
- [ ] Categorização dos tipos de tarefa
  - Exemplo: Uma tarefa pode ser categorizada como `Trabalho`, `Estudo`, `Lazer`, etc.
