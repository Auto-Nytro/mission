export interface OrderedWriteNull {
  readonly write: <Destination>(
    destination: Destination,
    destinationImpl: OrderedWriteNullDestination<Destination>,
  ) => void;
}

export interface OrderedWriteNullDestination<It> {
  readonly writeNull: (it: It) => void;
}