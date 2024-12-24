export interface CreateCategoryDto {
  name: string;
  description?: string;
  kitchenId: number;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}
