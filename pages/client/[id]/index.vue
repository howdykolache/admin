<script setup>
const route = useRoute();

// Client
const { data: client } = await useFetch(
  `/api/client.json?client_id=${route.params.id}`
);

// Orders
const { data: orders } = await useFetch(
  `/api/orders.json?client_id=${route.params.id}`
);

// Filters orders between -3 to +3 weeks
const week_in_milliseconds = 1000 * 60 * 60 * 24 * 7;
orders.value = orders.value.filter(
  (order) =>
    order.date >=
      (Math.floor(Date.now() / week_in_milliseconds) - 3) *
        week_in_milliseconds &&
    order.date <=
      (Math.floor(Date.now() / week_in_milliseconds) + 3) * week_in_milliseconds
);

const currentOffset = ref(0);
const now = new Date();
function offsetWeek(n, date) {
  return new Date(date.getTime() + n * week_in_milliseconds);
}

const dateOptions = {
  day: "numeric",
  month: "numeric",
};
</script>

<template>
  <div class="container">
    <header>
      <h1>{{ client.name }}</h1>
      <img width="70" height="70" :src="client.logo_url" />
    </header>

    <main>
      <div class="summary" aria-label="summary">
        <div class="orders past-orders" aria-label="past orders">
          <h2>Past Orders</h2>
          <ul class="order-list">
            <li
              @click="currentOffset = offset"
              :class="{ active: offset === currentOffset }"
              class="bg-white"
              v-for="offset in [-1, -2, -3]"
            >
              {{
                offsetWeek(offset, now).toLocaleDateString(
                  undefined,
                  dateOptions
                )
              }}
            </li>
          </ul>
        </div>
        <div class="orders upcoming-orders" aria-label="upcoming orders">
          <h2>Upcoming Orders</h2>
          <ul class="order-list">
            <li
              @click="currentOffset = offset"
              :class="{ active: offset === currentOffset }"
              v-for="offset in [0, 1, 2, 3]"
            >
              {{
                offsetWeek(offset, now).toLocaleDateString(
                  undefined,
                  dateOptions
                )
              }}
            </li>
          </ul>
        </div>
      </div>
      <data-table :offset="currentOffset" :orders="orders"></data-table>
    </main>
    <footer>
      <h2>Instructions</h2>
      <ol>
        <li class="font-light">
          Enter the # of each kolache you want for each day
        </li>
        <li class="font-light">
          Click 'Save Orders' to update your upcoming orders
        </li>
        <li>Hey presto, your orders have been received!</li>
      </ol>
      <p class="text-gray-500 italic font-light">
        Note: Red fields mean that the ordering window has closed for that day -
        if you need to update it, please text or call us directly! 😊😊😊
      </p>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
.container {
  @apply container mx-auto grid grid-rows-[auto,1fr,auto] p-8 gap-5;
}

header {
  @apply w-full grid grid-rows-1 grid-cols-[auto,auto] gap-8 place-items-center place-content-end;
  h1 {
    @apply text-2xl;
  }
}

main {
  @apply grid gap-1 grid-rows-[auto,auto];
}

footer {
  @apply bg-gray-300 p-8 grid gap-3;
  h2 {
    @apply text-3xl;
  }

  ol {
    @apply list-decimal;
  }
}

.summary {
  @apply grid grid-cols-[auto,auto] place-content-center place-items-start gap-3;
}

.orders h2 {
  @apply border-b-3 border-orange-500 text-center;
}

.order-list {
  @apply flex gap-3 p-2;
  li {
    @apply rounded bg-gray-200 p-1 font-light cursor-pointer;
    &.active {
      @apply font-normal bg-yellow-300;
    }
  }
}
</style>
