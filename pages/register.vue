<template>
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto"
                    src="https://res.cloudinary.com/dbtlgaii3/image/upload/v1648014900/Wow/kisspng-world-of-warcraft-emoticon-facebook-computer-icons-wow-5ac0eafc601834.3491116815225925083936_xwfj1s.png"
                    alt="Workflow" />
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="submitRegister">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="Username" class="sr-only">Username</label>
                        <input id="Username" name="Username" type="text" required=""
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username" v-model="register.username" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" name="password" type="password" autocomplete="current-password" required=""
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password" v-model="register.password" />
                    </div>
                    <div>
                        <label for="confirmPassword" class="sr-only">Confirm password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password"
                            autocomplete="current-confirmPassword" required=""
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirm password" v-model="register.confirmPassword" />
                    </div>
                </div>

                <!-- Upload file -->

                <div>
                    <label class="block text-sm font-medium text-gray-700"> Profile photo </label>
                    <div
                        class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center">
                            <img class="mx-auto h-12 w-12 rounded-full" :src="register.profileUrl" alt
                                v-if="register.profileUrl">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                viewBox="0 0 48 48" aria-hidden="true" v-if="!register.profileUrl && !loading">
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <svg class="mx-auto h-12 w-12 text-blue-500 animate-spin" width="24" height="24"
                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round" v-if="loading">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                                <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" />
                            </svg>
                            <div class="text-sm text-gray-600">
                                <label for="file-upload"
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                        @change.prevent="handleChangeFile" />
                                </label>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    </div>
                </div>

                <!-- Upload file -->
                <div>
                    <button type="submit" v-if="!isRegister"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Register
                    </button>
                    <button type="submit" v-if="isRegister"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="h-5 w-5 text-blue-500 animate-spin" width="24" height="24" viewBox="0 0 24 24"
                            stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                            <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" />
                        </svg>
                    </button>
                    <button type="button" @click="handleClickToSignin"
                        class="group relative w-full flex justify-center my-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "../config/axios"
import { uploadImg } from '../utils/userApi'
export default {
    head: {
        title: 'Register'
    },
    data() {
        return {
            register: {
                username: '',
                password: '',
                confirmPassword: '',
                profileUrl: ''
            },
            loading: false,
            isRegister: false
        }
    },
    methods: {
        async submitRegister() {
            try {
                this.isRegister = true
                const response = await axios.post('/signup', this.register)
                if (response.status === 200) {
                    this.$router.replace({ name: 'login' })
                }
                this.isRegister = false
            } catch (err) {
                console.log(err)
            }
        },
        handleClickToSignin() {
            this.$router.replace({ name: 'index' })
        },
        async handleChangeFile(e) {
            try {
                this.loading = true
                const reader = new FileReader()
                reader.readAsDataURL(e.target.files[0]);
                reader.onloadend = async () => {
                    const res = await uploadImg(reader.result)
                    this.register.profileUrl = res.data.url
                    this.loading = false
                };
                reader.onerror = async () => {
                    console.error("AHHHHHHHH!!");
                };
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>