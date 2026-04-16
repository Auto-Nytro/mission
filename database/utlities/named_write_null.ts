import { Name } from "./mod.ts";

export interface NamedWriteNull<Names> {
  readonly write: <Destination>(
    names: Names, 
    destination: Destination,
    destinationImpl: NamedWriteNullDestination<Destination>,
  ) => void;
}

export interface NamedWriteNullDestination<It> {
  readonly writeNull: (it: It, name: Name) => void;
}
