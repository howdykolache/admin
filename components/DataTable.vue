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

// State //
const props = defineProps(["orders"]);
const { offset, products } = toRefs(props);

// const products = computed(() => {
//   const ps = [];

//   for (let p of orders.value.map((order) => order.product)) {
//     if (!ps.some((product) => product.name === p.name)) {
//       ps.push(p);
//     }
//   }
//   return ps;
// });

// // Methods //
// function getOrdersByProduct(product) {
//   return orders.value.filter((order) => order.product.name === product.name);
// }

// function countOrdersByDay(day, orders) {
//   return orders
//     .filter((order) => new Date(order.date).getDay() === +day)
//     .reduce((sum, order) => sum + order.quantity, 0);
// }

// function add(acc, n) {
//   return acc + n;
// }
</script>

<template>
  <!-- <div class="wrapper"> -->
  <!--   <table> -->
  <!--     <thead> -->
  <!--       <tr> -->
  <!--         <th v-for="header of headers">{{ header }}</th> -->
  <!--       </tr> -->
  <!--     </thead> -->
  <!--     <tbody> -->
  <!--       <tr v-for="product of products" :key="product.name"> -->
  <!--         <td> -->
  <!--           <h3>{{ product.name }}</h3> -->
  <!--           <p>{{ product.description }}</p> -->
  <!--         </td> -->
  <!--         <td v-for="day of Object.keys(weekMap)"> -->
  <!--           <span class="order"> -->
  <!--             {{ countOrdersByDay(day, getOrdersByProduct(product)) }} -->
  <!--           </span> -->
  <!--         </td> -->
  <!--         <td> -->
  <!--           <span class="order"> -->
  <!--             {{ -->
  <!--               Object.keys(weekMap) -->
  <!--                 .map((day) => -->
  <!--                   countOrdersByDay(day, getOrdersByProduct(product)) -->
  <!--                 ) -->
  <!--                 .reduce(add, 0) -->
  <!--             }} -->
  <!--           </span> -->
  <!--         </td> -->
  <!--       </tr> -->
  <!--     </tbody> -->
  <!--   </table> -->
  <!--   <p class="text-right"> -->
  <!--     <span class="font-light">Total:</span> -->
  <!--     {{ orders.map((order) => order.quantity).reduce(add, 0) }} -->
  <!--   </p> -->
  <!-- </div> -->
</template>

<style lang="postcss" scoped>
.wrapper {
  @apply grid grid-rows-[auto,auto] gap-5;
}

thead {
  @apply border-b-1 border-gray-200;
  th {
    @apply uppercase text-gray-500 text-center border-l-1 border-gray-200 font-light;
    &:first-child {
      @apply border-l-0;
    }
  }
}

th,
td {
  @apply p-1;
}

tbody {
  td {
    @apply text-center border-l-1 border-gray-200 p-2;
    &:first-child {
      @apply text-left captalize border-l-0;
    }
    .order {
      @apply text-center p-2 border-1 border-gray-200 w;
      text-align: center;
    }
    p {
      @apply text-sm text-gray-600 font-light;
    }
  }
  tr {
    @apply border-t-1 border-gray-200;
    &:first-child {
      @apply border-t-0;
    }
  }
}
</style>
