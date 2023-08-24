import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsShortDate(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsShortDate",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          return value.match(/^(0[1-9]|1[0-2])\/\d{4}$/);
        },
      },
    });
  };
};