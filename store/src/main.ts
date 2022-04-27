import { createServer } from "@graphql-yoga/node";
import { schema } from "./schema";

async function main() {
  const server = createServer({
    schema,
    port: (process.env.PORT as any) || 4000,
  });
  await server.start();
}

main();
