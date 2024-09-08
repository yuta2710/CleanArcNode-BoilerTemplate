import { type GetToDoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';
import { type TodoRepository } from '../repositories/repository';

export interface GetTodoByIdUseCase {
	execute: (getByIdDto: GetToDoByIdDto) => Promise<TodoEntity>;
}

export class GetTodoById implements GetTodoByIdUseCase {
	constructor(private readonly repository: TodoRepository) {}

	async execute(getByIdDto: GetToDoByIdDto): Promise<TodoEntity> {
		return await this.repository.getById(getByIdDto);
	}
}