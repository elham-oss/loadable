import { Type } from '@angular/core';
export function errorHandler(type: Type<any> | any, value: string): string {
  return `light-localized-router (${type.name}): ${value}`;
}
