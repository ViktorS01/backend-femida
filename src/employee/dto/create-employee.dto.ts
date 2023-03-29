import { Subdivision } from '../../typeorm/entities/subdivision.entity';

export class CreateEmployeeDto {
  readonly id?: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly patronymic: string;
  readonly birthday: string;
  readonly profession: string;
  readonly gender: string;
  readonly createdAt?: Date;
  readonly lastLoginAt?: Date;
  readonly role: string;
  readonly subdivisionId?: number;
  readonly lastAssessment?: string;
  readonly currentAssessment?: string;
  readonly photo: string;
  readonly subdivision: Subdivision;
  readonly password: string;
}
