<template>
    <form action="" class="h-3/4">
        <div class="h-full">
            <div class="mt-3 flex justify-center">
                <label for="inputTodo" class="block text-md font-medium text-gray-700 mt-5 w-5/6"> Write some thing
                </label>
            </div>
            <div class="mt-3 h-3/6 flex justify-center">
                <textarea id="inputTodo" name="inputTodo" rows="3"
                    class="p-3 shadow-sm focus:ring-indigo-500 h-full focus:border-indigo-500 mt-1 block w-5/6 sm:text-sm border border-gray-300 rounded-xl"
                    placeholder="Write your order here" />
            </div>
            <div class="mt-3 w-5/6 flex justify-center mx-auto">
                <button
                    class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Submit
                </button>
            </div>
        </div>
    </form>
</template>