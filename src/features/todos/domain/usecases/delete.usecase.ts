import { type GetToDoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/repository';

export interface DeleteTodoUseCase {
	execute: (getByIdDto: GetToDoByIdDto) => Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(getByIdDto: GetToDoByIdDto): Promise<TodoEntity> {
		return await this.repository.delete(getByIdDto);
	}
}