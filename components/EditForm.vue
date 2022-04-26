<template>
    <form @submit.prevent="handleClickSubmitEdit">
        <textarea id="inputTodo" name="inputTodo" rows="2" v-model="editText"
            class="p-3 shadow-sm focus:ring-indigo-500 h-full focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-xl" />
        <div class="text-right ">
            <button type="submit" v-if="!isSave"
                class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Save</button>
            <button type="submit" v-if="isSave"
                class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                <svg class="h-5 w-5 text-white-500 animate-spin" width="24" height="24" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                    <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" />
                </svg></button>
        </div>
    </form>
</template>

<script>
import { UPDATE_TODO } from '../utils/todoApi'
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
            editText: this.item.todos_list,
            isSave: false
        }
    },
    methods: {
        async handleClickSubmitEdit() {
            this.isSave = true
            let idx
            if (!this.item.todos_active) idx = this.pendingTodo.findIndex(i => i.id === this.item.id);

            if (this.item.todos_active) idx = this.successTodo.findIndex(i => i.id === this.item.id);

            const res = await this.$apollo.mutate({
                mutation: await UPDATE_TODO(),
                variables: { id: this.item.id, input: this.editText, status: this.item.todos_active }
            })
            if (!this.item.todos_active) this.pendingTodo.splice(idx, 1, res.data.update_todos.returning[0]);
            if (this.item.todos_active) this.successTodo.splice(idx, 1, res.data.update_todos.returning[0]);
            this.isEdit.pop()
            this.isSave = false


        }
    }
}
</script>