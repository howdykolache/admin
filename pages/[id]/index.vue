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
            <li>1/10</li>
          </ul>
        </div>
        <div class="orders upcoming-orders" aria-label="upcoming orders">
          <h2>Upcoming Orders</h2>
          <ul class="order-list">
            <li class="active">2/10</li>
            <li>3/10</li>
            <li>9/10</li>
          </ul>
        </div>
      </div>
      <data-table :orders="orders"></data-table>
    </main>
    <footer>
      <h2>Instructions</h2>
      <ol>
        <li class="lighter">
          Enter the # of each kolache you want for each day
        </li>
        <li class="lighter">
          Click 'Save Orders' to update your upcoming orders
        </li>
        <li>Hey presto, your orders have been received!</li>
      </ol>
      <p>
        Note: Red fields mean that the ordering window has closed for that day -
        if you need to update it, please text or call us directly! 😊😊😊
      </p>
    </footer>
  </div>
</template>

<style scoped>
.container {
  margin-inline: auto;
  padding: 2rem;
  max-width: 65rem;
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: start;
}
header {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, auto);
  place-items: center;
  place-content: center;
  margin-bottom: 2rem;
}

main {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 2rem;
}

header h1 {
  font-size: x-large;
}

footer {
  padding: 2rem;
  background-color: lightgray;
  display: grid;
  place-items: center;
  gap: 1rem;
}

footer p {
  font-weight: lighter;
  font-style: oblique;
  opacity: 0.7;
}
footer h2 {
  font-size: x-large;
}

footer ol {
  list-style-type: numbers;
}

.lighter {
  font-weight: lighter;
}

.summary {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1rem;
  place-items: center;
  place-content: center;
}

.orders h2 {
  width: 12rem;
  padding-bottom: 0.3rem;
  text-align: center;
  border-bottom: 2px solid orange;
  margin-bottom: 0.5rem;
}

.order-list {
  display: flex;
  gap: 0.5rem;
}

.order-list li {
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: lightgray;
  font-weight: lighter;
}
.order-list li.active {
  font-weight: bold;
  background-color: yellow;
}
</style>
