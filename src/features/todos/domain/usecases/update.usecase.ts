import { type UpdateTodoDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/repository';

export interface UpdateTodoUseCase {
	execute: (data: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(data: UpdateTodoDto): Promise<TodoEntity> {
		return await this.repository.update(data);
	}
}