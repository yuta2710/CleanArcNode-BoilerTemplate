import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type GetToDoByIdDto, type UpdateTodoDto, type CreateToDoDto } from '../dtos';
import { type TodoEntity } from '../entities';

export abstract class TodoRepository {
	abstract create(createDto: CreateToDoDto): Promise<TodoEntity>;
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>>;
	abstract getById(getByIdDto: GetToDoByIdDto): Promise<TodoEntity>;
	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract delete(getByIdDto: GetToDoByIdDto): Promise<TodoEntity>;
}