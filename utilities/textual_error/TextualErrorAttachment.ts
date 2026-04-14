import { WithBrand } from "../../x.ts";

const brand = Symbol();

export type TextualErrorAttachment = WithBrand<typeof brand, {
  readonly name: string,
  readonly value: string,
}>;

export const create = (name: string, value: string): TextualErrorAttachment => {
  return WithBrand(brand, {
    name,
    value,
  });
};

export const TextualErrorAttachment = {
  create,
};