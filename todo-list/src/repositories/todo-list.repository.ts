import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Todo, TodoList, TodoListRelations} from '../models';
import {TodoRepository} from './todo.repository';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id,
  TodoListRelations
> {

  public readonly todos: HasManyRepositoryFactory<Todo, typeof TodoList.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TodoRepository') protected todoRepositoryGetter: Getter<TodoRepository>,
  ) {
    super(TodoList, dataSource);
    this.todos = this.createHasManyRepositoryFactoryFor('todos', todoRepositoryGetter,);
    // enables inclusion for this relation
    // bila dapatkan todo-list model, todo property pun akan ada dlm todo-list model tu
    this.registerInclusionResolver('todos', this.todos.inclusionResolver);
  }
}
