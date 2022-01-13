<script setup>
// Constants
const headers = [
  "Item",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Total",
];

const weekMap = {
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
  0: "Sun",
};
const week_in_milliseconds = 1000 * 60 * 24 * 7;

// State //
const props = defineProps(["orders"]);
const { orders } = toRefs(props);

// orders.value = orders.value.filter(
//   (order) =>
//     order.date >=
//       Math.floor(Date.now() / week_in_milliseconds) * week_in_milliseconds &&
//     order.date <=
//       Math.floor(Date.now() / week_in_milliseconds) * week_in_milliseconds +
//         week_in_milliseconds
// );

const products = computed(() => {
  const ps = [];

  for (let p of orders.value.map((order) => order.product)) {
    if (!ps.some((product) => product.name === p.name)) {
      ps.push(p);
    }
  }
  return ps;
});

// Methods //
function getOrdersByProduct(product) {
  return orders.value.filter((order) => order.product.name === product.name);
}

function countOrdersByDay(day, orders) {
  return orders
    .filter((order) => new Date(order.date).getDay() === +day)
    .reduce((sum, order) => sum + order.quantity, 0);
}

function add(acc, n) {
  return acc + n;
}
</script>

<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="header of headers">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product of products" :key="product.name">
          <td>
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
          </td>
          <td v-for="day of Object.keys(weekMap)">
            <span class="order">{{
              countOrdersByDay(day, getOrdersByProduct(product))
            }}</span>
          </td>
          <td>
            <span class="order">{{
              Object.keys(weekMap)
                .map((day) =>
                  countOrdersByDay(day, getOrdersByProduct(product))
                )
                .reduce(add, 0)
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <span class="label">Total:</span>
      {{ orders.map((order) => order.quantity).reduce(add, 0) }}
    </p>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
}

.wrapper > p {
  text-align: right;
}

p .label {
  font-weight: lighter;
}
thead {
  border-bottom: 1px solid lightgray;
}

th,
td {
  padding: 0.3rem;
}
thead th {
  color: gray;
  text-align: center;
  text-transform: uppercase;
  border-left: 1px solid lightgray;
  font-weight: lighter;
}

tbody p {
  color: gray;
  font-size: small;
}

thead th:first-child {
  border-left: none;
}

tbody td {
  border-left: 1px solid lightgray;
}

tbody td:first-child {
  text-transform: capitalize;
  border-left: none;
  min-width: 20rem;
}
tbody tr {
  border-top: 1px solid lightgray;
}

tbody tr:first-child {
  border-top: none;
}

tbody td:not(:first-child) {
  text-align: center;
  padding: 1rem;
}
tbody td .order {
  text-align: center;
  padding: 0.5rem 1rem;
  border: 1px solid lightgray;
}
</style>
