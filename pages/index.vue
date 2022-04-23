<template>
  <div>
    <main class="h-screen">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
        <!-- Replace with your content -->
        <div class="grid grid-cols-3 gap-4 h-full">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3">
            <div class="text-xl text-center font-bold">Create Todo</div>
            <CreateForm v-bind:pendingTodo="pendingTodo" />
          </div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3 relative">
            <div v-if="!openEdit" @click="handleClickOpenEdit">
              <OpenEditIcon />
            </div>
            <div v-if="openEdit" @click="handleClickOpenEdit">
              <CloseEditIcon />
            </div>
            <div class="text-xl text-center font-bold mb-8">Pending</div>
            <div class="text-center font-bold text-slate-300" v-if="!pendingTodo.length">
              Empty
            </div>
            <TodoItem v-for=" item in pendingTodo" :key="item.id" v-bind:item="item" v-bind:pendingTodo="pendingTodo"
              v-bind:successTodo="successTodo" v-bind:openEdit="openEdit" />
          </div>
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-fit py-3 relative">
            <div v-if="!openEdit" @click="handleClickOpenEdit">
              <OpenEditIcon />
            </div>
            <div v-if="openEdit" @click="handleClickOpenEdit">
              <CloseEditIcon />
            </div>
            <div class="text-xl text-center font-bold mb-8">Done</div>
            <div class="text-center font-bold text-slate-300" v-if="!successTodo.length">
              Empty
            </div>
            <TodoItem v-for="item in successTodo" :key="item.id" v-bind:item="item" v-bind:pendingTodo="pendingTodo"
              v-bind:successTodo="successTodo" v-bind:openEdit="openEdit" />
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script>
import { getUserData } from '../utils/userApi'
import CreateForm from '../components/CreateForm.vue'
import TodoItem from '../components/TodoItem.vue'
import CloseEditIcon from '../components/CloseEditIcon.vue'
import { MySubscription } from '../gql/subscription/todo'

export default {
  middleware: "auth",
  head: {
    title: "Home"
  },
  data() {
    return {
      pendingTodo: [],
      successTodo: [],
      openEdit: false,
    };
  },
  layout: "MainLayout",
  async mounted() {
    const user = await getUserData();
    const observer = await this.$apollo.subscribe({
      query: MySubscription,
      variables: { id: user.sub }
    })

    const test = (data) => {
      const pending = data.filter(item => item.todos_active === false)
      const success = data.filter(item => item.todos_active === true)
      this.pendingTodo = pending
      this.successTodo = success
    }

    observer.subscribe({
      next(data) {
        test(data.data.todos)

      },
      error(error) {
        console.error(error)
      },
    })
  },
  components: { CreateForm, TodoItem, CloseEditIcon },
  methods: {
    handleClickOpenEdit() {
      this.openEdit = !this.openEdit
    }
  },
}
</script>
