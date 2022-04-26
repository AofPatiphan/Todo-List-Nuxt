<template>
    <form action="" class="h-3/4" @submit.prevent="handleClickAddTodo">
        <div class="h-full">
            <div class="mt-3 flex justify-center">
                <label for="inputTodo" class="block text-md font-medium text-gray-700 mt-5 w-5/6"> Write some thing
                </label>
            </div>
            <div class="mt-3 h-3/6 flex justify-center">
                <textarea id="inputTodo" name="inputTodo" rows="3"
                    class="p-3 shadow-sm focus:ring-indigo-500 h-full focus:border-indigo-500 mt-1 block w-5/6 sm:text-sm border border-gray-300 rounded-xl"
                    placeholder="Write your order here" v-model="todo" />
            </div>
            <div class="mt-3 w-5/6 flex justify-center mx-auto">
                <button type="submit" v-if="!isAdd"
                    class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Submit
                </button>
                <button type="submit" v-if="isAdd"
                    class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    <svg class="h-5 w-5 text-white-500 animate-spin" width="24" height="24" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                        <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" />
                    </svg>
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { ADD_TODO } from '../utils/todoApi'

export default {
    data() {
        return {
            todo: '',
            isAdd: false
        }
    },
    props: {
        pendingTodo: {
            type: [],
            required: true
        }
    },
    methods: {
        async handleClickAddTodo() {
            this.isAdd = true
            if (this.todo) {
                const res = await this.$apollo.mutate({
                    mutation: await ADD_TODO(),
                    variables: { todo: this.todo }
                })
                this.pendingTodo.unshift(res.data.insert_todos_one)
            }
            if (!this.todo) window.alert("Please input your activity.")
            this.todo = ''
            this.isAdd = false
        }
    },
}
</script>