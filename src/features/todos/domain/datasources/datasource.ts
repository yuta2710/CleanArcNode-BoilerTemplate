import { type PaginationDto, type PaginationResponseEntity } from '../../../shared';
import { type UpdateTodoDto, type CreateToDoDto, type GetToDoByIdDto } from '../dtos';
import { type TodoEntity } from '../entities';

export abstract class TodoDatasource {
	abstract create(createDto: CreateToDoDto): Promise<TodoEntity>;
	abstract getAll(pagination: PaginationDto): Promise<PaginationResponseEntity<TodoEntity[]>>;
	abstract getById(getByIdDto: GetToDoByIdDto): Promise<TodoEntity>;
	abstract update(updateDto: UpdateTodoDto): Promise<TodoEntity>;
	abstract delete(getByIdDto: GetToDoByIdDto): Promise<TodoEntity>;
}