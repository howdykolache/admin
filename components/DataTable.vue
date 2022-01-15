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

const week_in_milliseconds = 1000 * 60 * 60 * 24 * 7;
const day_in_milliseconds = 1000 * 60 * 60 * 24;
const hour_in_milliseconds = 1000 * 60 * 60;

// State //
const props = defineProps(["offset", "products"]);
const { offset, products } = toRefs(props);

// Methods //
function add(sum, n) {
  return sum + n;
}

function filterOrdersByWeekday(orders, day = null) {
  const now = new Date();
  const d =
    new Date(Date.now() - (now.getDay() - 1) * day_in_milliseconds).getTime() -
    offset.value * week_in_milliseconds;
  if (day) {
    return orders.filter(
      (order) =>
        order.date >= d - week_in_milliseconds &&
        order.date <= d &&
        new Date(order.date).getDay() === +day
    );
  } else {
    return orders.filter(
      (order) => order.date >= d - week_in_milliseconds && order.date <= d
    );
  }
}

function getDayInWeek(day) {
  const now = new Date();
  return (
    new Date(
      Date.now() - (now.getDay() - Number(day) - 1) * day_in_milliseconds
    ).getTime() -
    offset.value * week_in_milliseconds
  );
}

function setOrder(product, day, n) {
  const d = getDayInWeek(day);
  console.log({ d });
  product.orders = [{ quantity: +n, date: d }];
}
</script>

<template>
  <div class="wrapper">
    <table>
      <th v-for="header of headers">{{ header }}</th>
      <template v-for="product of products" :key="product.name">
        <td class="item">
          <h3 class="text-left">{{ product.name }}</h3>
          <p class="text-left">{{ product.description }}</p>
        </td>
        <td v-for="day of Object.keys(weekMap)">
          <input
            v-if="product.available_days.some((d) => d === Number(day))"
            type="number"
            :disabled="
              product.lead_hours <
              (Math.floor(getDayInWeek(day) / day_in_milliseconds) *
                day_in_milliseconds -
                Date.now()) /
                hour_in_milliseconds
            "
            :value="
              filterOrdersByWeekday(product.orders, day).reduce(
                (sum, order) => sum + order.quantity,
                0
              )
            "
            @blur.prevent.stop="setOrder(product, day, $event.target.value)"
            class="order"
          />
          <span class="order" v-else>-</span>
        </td>
        <td>
          <span class="order">
            {{
              filterOrdersByWeekday(product.orders, null).reduce(
                (sum, order) => sum + order.quantity,
                0
              )
            }}
          </span>
        </td>
      </template>
    </table>
    <p class="text-right">
      <span class="font-light">Total:</span>
      {{
        products
          .map((product) =>
            filterOrdersByWeekday(product.orders, null).reduce(
              (sum, order) => sum + order.quantity,
              0
            )
          )
          .reduce(add, 0)
      }}
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply grid grid-rows-[auto,auto] gap-5;
}

table {
  @apply grid grid-cols-[1fr,auto,auto,auto,auto,auto,auto,auto,auto] rounded overflow-hidden border-1 border-gray-200;
}

th {
  @apply uppercase text-gray-500 text-center border-1 border-gray-200 font-light p-2;
}

td {
  @apply text-center border-1 border-gray-200 p-2 border-t-1;
  input:disabled {
    @apply bg-red-300;
  }
  .order {
    @apply text-center p-2 border-1 border-gray-200 w-7ch inline-block;
  }
  p {
    @apply text-sm text-gray-600 font-light;
  }
}
</style>
