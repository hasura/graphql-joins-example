import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema";

async function main() {
  const server = createServer({ schema, port: 4001 });
  await server.start();
}

main();
