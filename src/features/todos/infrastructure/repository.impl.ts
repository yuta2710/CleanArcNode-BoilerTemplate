import { type PaginationDto, type PaginationResponseEntity } from '../../shared';

import {
	type TodoEntity,
	type TodoDatasource,
	type GetToDoByIdDto,
	type UpdateTodoDto,
	type CreateToDoDto,
	type TodoRepository
} from '../domain';

export class TodoRepositoryImpl implements TodoRepository {
	constructor(private readonly datasource: TodoDatasource) {}

	async create(createDto: CreateToDoDto): Promise<TodoEntity> {
		return await this.datasource.create(createDto);
	}

	async getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>> {
		return await this.datasource.getAll(pagination);
	}

	async getById(getByIdDto: GetToDoByIdDto): Promise<TodoEntity> {
		return await this.datasource.getById(getByIdDto);
	}

	async update(updateDto: UpdateTodoDto): Promise<TodoEntity> {
		return await this.datasource.update(updateDto);
	}

	async delete(getByIdDto: GetToDoByIdDto): Promise<TodoEntity> {
		return await this.datasource.delete(getByIdDto);
	}
}