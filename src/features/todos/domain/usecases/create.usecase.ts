import { type CreateToDoDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/repository';

export interface CreateTodoUseCase {
	execute: (data: CreateToDoDto) => Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(data: CreateToDoDto): Promise<TodoEntity> {
		return await this.repository.create(data);
	}
}