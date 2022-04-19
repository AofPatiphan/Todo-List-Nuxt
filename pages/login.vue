<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto"
                    src="https://res.cloudinary.com/dbtlgaii3/image/upload/v1648014900/Wow/kisspng-world-of-warcraft-emoticon-facebook-computer-icons-wow-5ac0eafc601834.3491116815225925083936_xwfj1s.png"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="userLogin">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="Username" class="sr-only">Username</label>
                        <input id="Username" name="Username" type="text" required=""
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username" v-model="login.username" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required=""
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" v-model="login.password" />
                    </div>
                </div>

                <!-- <div class="flex items-center justify-end">
                    <div class="text-sm">
                        <nuxt-link to="register" class="font-medium text-indigo-600 hover:text-indigo-500"> Create your
                            account
                        </nuxt-link>
                    </div>
                </div> -->

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                    <button type="button" @click="handleClickToRegister"
                        class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Create your account
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    head: {
        title: 'Login'
    },
    data() {
        return {
            login: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async userLogin() {
            try {
                const response = await this.$auth.loginWith('local', { data: this.login })
                if (response.status === 200) {
                    this.$router.replace({ name: 'index' })
                }
            } catch (err) {
                console.log(err)
            }
        },
        handleClickToRegister() {
            this.$router.replace({ name: 'register' })
        }
    }
}
</script>
