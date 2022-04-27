import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { Resolvers, Fulfillment, Status } from "./generated/graphql";

const fulfillments: Fulfillment[] = [
  {
    id: 1000,
    orderId: 1,
    status: Status.Packing,
    weight: 1,
  },
  {
    id: 1001,
    orderId: 2,
    status: Status.Shipped,
    weight: 10,
  },
];

const typeDefs = readFileSync("./schema.graphql", "utf8");

const resolvers: Resolvers = {
  Query: {
    fulfillment: (parent: unknown, args: { orderId: number }) => {
      return fulfillments.find(
        (fulfillment) => fulfillment.orderId === args.orderId
      )!;
    },
    fulfillments: () => fulfillments,
    weight: (parent: unknown, args: { orderId: number }) => {
      return fulfillments.find(
        (fulfillment) => fulfillment.orderId === args.orderId
      )!.weight;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
