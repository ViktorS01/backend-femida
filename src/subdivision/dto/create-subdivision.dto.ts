export class CreateSubdivisionDto {
  readonly id?: number;
  readonly name: string;
  readonly subdivision?: {
    name: string;
    id: number;
  };
}
