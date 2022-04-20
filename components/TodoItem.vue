<template>
    <div class="flex mb-8 mx-3 shadow-xl rounded-lg px-3 py-3 border border-0.5 relative" v-if="item">
        <div v-if="openEdit" @click="handleClickDelete">
            <DeleteIcon />
        </div>
        <div v-if="openEdit" @click="handleClickEdit">
            <EditIcon />
        </div>
        <div class="mr-2 hover:cursor-pointer" @click="handleClickStatus" v-if="!isEdit.length">
            <svg :class="{ 'text-gray-500': !item.todos_active, 'text-green-500': item.todos_active }" class="h-8 w-8  "
                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" />
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2l4 -4" />
            </svg>
        </div>
        <div class="flex-1" v-if="isEdit.length">
            <EditForm v-bind:isEdit="isEdit" v-bind:item="item" v-bind:pendingTodo="pendingTodo"
                v-bind:successTodo="successTodo" />
        </div>
        <div v-if="!isEdit.length">
            {{ item.todos_list }}
        </div>
    </div>
</template>


<script>
import { deleteTodo, updateTodo } from '../utils/todoApi'
import EditForm from './EditForm.vue'

export default {
    data() {
        return {
            isEdit: []
        };
    },
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
        openEdit: {
            required: true
        }
    },
    methods: {
        async handleClickDelete() {
            let idx;
            if (!this.item.todos_active) {
                idx = this.pendingTodo.findIndex(i => i.id === this.item.id);
            }
            if (this.item.todos_active) {
                idx = this.successTodo.findIndex(i => i.id === this.item.id);
            }
            if (window.confirm("Do you want to delete?")) {
                const res = await deleteTodo(this.item.id);
                if (res.status === 200 && !this.item.todos_active) {
                    this.pendingTodo.splice(idx, 1);
                }
                if (res.status === 200 && this.item.todos_active) {
                    this.successTodo.splice(idx, 1);
                }
            }
        },
        async handleClickStatus() {
            let idx;
            if (!this.item.todos_active) {
                idx = this.pendingTodo.findIndex(i => i.id === this.item.id);
            }
            if (this.item.todos_active) {
                idx = this.successTodo.findIndex(i => i.id === this.item.id);
            }
            const res = await updateTodo(this.item.id, this.item.todos_list, !this.item.todos_active);
            if (res.status === 200 && !this.item.todos_active) {
                this.pendingTodo.splice(idx, 1);
                this.successTodo.unshift(res.data.update_todos.returning[0]);
            }
            if (res.status === 200 && this.item.todos_active) {
                this.successTodo.splice(idx, 1);
                this.pendingTodo.unshift(res.data.update_todos.returning[0]);
            }
        },
        handleClickEdit() {
            if (this.isEdit.length) { this.isEdit.pop() }
            else if (!this.isEdit.length) { this.isEdit.push('test') }
        }
    },
    mounted() {
    },
    components: { EditForm }
}

</script>