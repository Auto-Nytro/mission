import { Unique } from "../x.ts";

const BRAND = Symbol();
export type Integer = Unique<typeof BRAND, "Integer", number>;
