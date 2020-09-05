export class CreateCategoryDto {
  name: string;
  sign?: string;
}

export class UpdateCategoryDto {
  id: string;
  name?: string;
  sign?: string;
}
