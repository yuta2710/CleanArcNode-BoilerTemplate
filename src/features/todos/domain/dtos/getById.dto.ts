import { AppError, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";

export class GetToDoByIdDto implements CoreDto<GetToDoByIdDto> {
  private constructor(public readonly id: number) {}

  public validate(dto: GetToDoByIdDto): void {
    const errors: ValidationType[] = [];

    const { id } = dto;

    if (!id || isNaN(Number(id))) {
      errors.push({ fields: ["id"], constraint: "Id is not a valid number" });
    }

    if (errors.length > ZERO)
      throw AppError.badRequest("Error validating get todo by id", errors);
  }
  /**
   * This method creates a new instance of the DTO class with the given
   * properties from body or query parameters.
   * @param object
   * @returns A new instance of the DTO
   */
  public static create(object: Record<string, unknown>): GetToDoByIdDto {
    const { id } = object;
    return new GetToDoByIdDto(id as number);
  }
}
