<template>
    <form @submit.prevent="handleClickSubmitEdit">
        <textarea id="inputTodo" name="inputTodo" rows="2" v-model="editText"
            class="p-3 shadow-sm focus:ring-indigo-500 h-full focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-xl" />
        <div class="text-right ">
            <button type="submit"
                class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Save</button>
        </div>
    </form>
</template>

<script>
import { updateTodo } from '../utils/todoApi'
export default {
    props: {
        item: {
            required: true
        },
        pendingTodo: {
            required: true
        },
        successTodo: {
            required: true
        },
        isEdit: {
            required: true
        },

    },
    data() {
        return {
            editText: this.item.todos_list
        }
    },
    methods: {
        async handleClickSubmitEdit() {
            let idx
            if (!this.item.todos_active) {
                idx = this.pendingTodo.findIndex(i => i.id === this.item.id);
                const newTodo = [...this.pendingTodo];
            }
            if (this.item.todos_active) {
                idx = this.successTodo.findIndex(i => i.id === this.item.id);
                const newTodo = [...this.successTodo];
            }
            const res = await updateTodo(this.item.id, this.editText, this.item.todos_active)

            if (res.status === 200 && !this.item.todos_active) {
                this.pendingTodo.splice(idx, 1, res.data.update_todos.returning[0]);
            }
            if (res.status === 200 && this.item.todos_active) {
                this.successTodo.splice(idx, 1, res.data.update_todos.returning[0]);
            }

            this.isEdit.pop()


        }
    }
}
</script>