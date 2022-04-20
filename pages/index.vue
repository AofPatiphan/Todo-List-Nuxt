<template>
  <div>
    <main class="h-screen">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
        <!-- Replace with your content -->
        <div class="grid grid-cols-3 gap-4 h-full">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3">
            <div class="text-xl text-center font-bold">Create Todo</div>
            <CreateForm />
          </div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3">
            <div class="text-xl text-center font-bold mb-8">Pending</div>
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />

          </div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3">
            <div class="text-xl text-center font-bold mb-8">Success</div>
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
            <TodoItem />
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../config/axios'
import CreateForm from '../components/CreateForm.vue'
import TodoItem from '../components/TodoItem.vue'
export default {
  middleware: "auth",
  head: {
    title: "Home"
  },
  data() {
    return {
      pendingTodo: [],
      successTodo: []
    };
  },
  layout: "MainLayout",
  mounted() {
  },
  components: { CreateForm, TodoItem }
}
</script>
