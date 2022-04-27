# Hasura Graphql Joins Example

An example of joining two Graphql schemas, a store service and a fulfillment service, with Hasura. Both services were made with [GraphQL Code Generator](https://www.graphql-code-generator.com/) and [GraphQL Yoga](https://www.graphql-yoga.com/).

To run the example:

```bash
docker compose up -d --build
```

Then navigate to [http://localhost:8080/console](http://localhost:8080/console)

## Store Service

The [store service](store/) is an example of an ecommerce schema with items and orders containing items

```graphql
type Item {
  id: Int!
  name: String!
  price: Float!
}

type LineItem {
  quantity: Int!
  itemId: Int!
  item: Item
}

type Order {
  id: Int!
  lineItems: [LineItem!]!
}

type Query {
  item(id: Int!): Item
  items: [Item!]!
  order(id: Int!): Order
  orders: [Order]!
}
```

## Fulfillment Service

The [fulfillment service](fulfillment/) is an example of a shipping company schema with each fulfillment having an order ID and a status

```graphql
enum Status {
  PACKING
  SHIPPED
  DELIVERED
}

type Fulfillment {
  id: Int!
  orderId: Int!
  status: Status!
}

type Query {
  fulfillment(orderId: Int!): Fulfillment!
  fulfillments: [Fulfillment]!
}
```

## Joining the Schemas

Using Hasura Graphql Joins we can combine the schemas together! From the fulfillment schema `orderId` key we join order information from store schema using the `order` type ID field. Without any code we have joined two seperate services!

![Screen Shot 2022-04-26 at 19 32 30](https://user-images.githubusercontent.com/11153289/165415195-0be3cf74-c19a-4541-98cd-550fd537d812.png)

```graphql
{
  fulfillment(orderId: 1) {
    status
    order {
      lineItems {
        item {
          name
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "fulfillment": {
      "status": "PACKING",
      "order": {
        "lineItems": [
          {
            "item": {
              "name": "Sunglasses"
            }
          }
        ]
      }
    }
  }
}
```
