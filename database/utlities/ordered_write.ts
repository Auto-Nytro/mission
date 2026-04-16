import { ScalarWrite } from "./mod.ts";

export interface OrderedWriteDestination<Destination> {
  writeNull: (destination: Destination) => void;
  writeInteger: (destination: Destination, integer: number) => void;
  writeReal: (destination: Destination, real: number) => void;
  writeString: (destination: Destination, string: string) => void;
  writeBoolean: (destination: Destination, boolean: boolean) => void;
  writeScalarValue: <Value>(destination: Destination, value: Value, scalarWrite: ScalarWrite<Value>) => void;
  writeCompoundValue: <Value>(destination: Destination, value: Value, descriptor: OrderedWrite<Value>) => void;
  // fn as_ordered_write_null_destination(&mut self) -> &mut impl OrderedWriteNullDestination;
}

export interface OrderedWrite<Value> {
  readonly write: <Destination>(
    value: Value, 
    destination: Destination, 
    destinationImpl: OrderedWriteDestination<Destination>,
  ) => void;
}

export const OrderedWrite = {
  implement: <Value>(initializer: OrderedWrite<Value>): OrderedWrite<Value> => {
    return initializer;
  },
};