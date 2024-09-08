import { AppError, ValidationType, ZERO } from "../../../../core";
import { CoreDto } from "../../../shared";

export class CreateToDoDto implements CoreDto<CreateToDoDto> {
  private constructor(public readonly text: string) {
    this.validate(this);
  }

  public validate(dto: CreateToDoDto): void {
    const errors: ValidationType[] = [];

    if (!dto.text || dto.text.length === ZERO) {
      errors.push({ fields: ["text"], constraint: "Text is required" });
    }

    if (errors.length > ZERO)
      throw AppError.badRequest("Error validating create todo", errors);
  }

  	/**
	 * This method creates a new instance of this DTO class with the given
	 * properties from body or query parameters.
	 * @param object
	 * @returns A new instance of this DTO
	 */
  public static create(object: Record<string, unknown>): CreateToDoDto {
    const { text } = object;

    return new CreateToDoDto(text as string);
  }
}
