<template>
  <div>
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900" v-if="$auth.loggedIn">
          Dashboard</h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  head: {
    title: 'Home'
  },
  layout: "mainLayout",


}
</script>
