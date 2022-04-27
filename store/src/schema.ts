import { makeExecutableSchema } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { Resolvers, Item, LineItem, Order } from "./generated/graphql";

const items: Item[] = [
  {
    id: 1,
    name: "Sunglasses",
    price: 10,
    weight: 1,
  },
  {
    id: 2,
    name: "Cellphone",
    price: 1000,
    weight: 10,
  },
];

const orders: Order[] = [
  {
    id: 1,
    lineItems: [
      {
        quantity: 1,
        itemId: 1,
      },
    ],
  },
  {
    id: 2,
    lineItems: [
      {
        quantity: 10,
        itemId: 2,
      },
    ],
  },
];

const typeDefs = readFileSync("./schema.graphql", "utf8");

const resolvers: Resolvers = {
  Query: {
    item: (parent: unknown, args: { id: number }) => {
      return items.find((item) => item.id === args.id)!;
    },
    items: () => items,
    order: (parent: unknown, args: { id: number }) => {
      return orders.find((order) => order.id === args.id)!;
    },
    orders: () => orders,
    weight: (parent: unknown, args: { itemId: number }) => {
      return items.find((item) => item.id === args.itemId)!.weight;
    },
  },
  LineItem: {
    item: (parent: LineItem) => {
      return items.find((item) => item.id === parent.itemId)!;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
});
