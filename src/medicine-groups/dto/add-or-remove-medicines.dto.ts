import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AddOrRemoveMedicinesDto {
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  medicineIds: string[];
}