<template>
    <div>
        <nav class="bg-gray-500">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img class="h-8 w-8"
                                src="https://res.cloudinary.com/dbtlgaii3/image/upload/v1648014900/Wow/kisspng-world-of-warcraft-emoticon-facebook-computer-icons-wow-5ac0eafc601834.3491116815225925083936_xwfj1s.png"
                                alt="Workflow logo">
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-4 flex items-center md:ml-6">

                            <!-- Menu -->
                            <div class="hidden md:block">

                                <div class="mr-5 flex items-baseline">
                                    <div class="flex px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                                        v-if="!username">
                                        <svg class="h-5 w-5 text-blue-500 animate-spin" width="24" height="24"
                                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                                            <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8" stroke-dasharray=".001 4.13" />
                                        </svg>
                                    </div>
                                    <div class="flex px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
                                        v-if="username">
                                        {{ username }}
                                    </div>
                                </div>
                            </div>

                            <!-- Profile dropdown -->
                            <div class="ml-3 relative">
                                <div>
                                    <button @click="toggle"
                                        class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                                        id="user-menu" aria-label="User menu" aria-haspopup="true">
                                        <img class="h-8 w-8 rounded-full" :src="profileUrl" alt>
                                    </button>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100"
                                    enter-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                                    <div v-show="isOpen"
                                        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                        <div class="py-1 rounded-md bg-white shadow-xs hover:cursor-pointer" role="menu"
                                            aria-orientation="vertical" aria-labelledby="user-menu">
                                            <span class="block px-4 py-2 text-sm text-gray-700 " role="menuitem"
                                                @click="handleClickLogout" v-if="!isLogout">Sign
                                                out</span>
                                            <div class="px-4 py-2" v-if="isLogout">
                                                <svg class="h-5 w-5 mx-auto text-blue-500 animate-spin" width="24"
                                                    height="24" viewBox="0 0 24 24" stroke-width="2"
                                                    stroke="currentColor" fill="none" stroke-linecap="round"
                                                    stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5" />
                                                    <path d="M11 19.95a8 8 0 0 1 -5.3 -12.8"
                                                        stroke-dasharray=".001 4.13" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                    <div class="-mr-2 flex md:hidden">
                        <!-- Mobile menu button -->
                        <button @click="toggle"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                            <svg :class="[isOpen ? 'hidden' : 'block', 'h-6 w-6']" stroke="currentColor" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16">
                                </path>
                            </svg>
                            <svg :class="[isOpen ? 'block' : 'hidden', 'h-6 w-6']" stroke="currentColor" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div :class="[isOpen ? '' : 'hidden', 'md:hidden']">
                <div class="px-2 pt-2 pb-3 sm:px-3">
                </div>
                <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img class="h-10 w-10 rounded-full" :src="profileUrl" alt>
                        </div>
                        <div class="ml-3">
                            <div class="text-base font-medium leading-none text-white">{{ username }}</div>
                        </div>
                    </div>
                    <div class="mt-3 px-2">
                        <a href="#"
                            class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Sign
                            out</a>
                    </div>
                </div>
            </div>
        </nav>
        <nuxt />
    </div>
</template>

<script>
import { getMe } from '../utils/userApi'
export default {
    data() {
        return {
            isOpen: false,
            username: '',
            profileUrl: '',
            isLogout: false
        }
    },
    methods: {

        toggle() {
            this.isOpen = !this.isOpen
        },
        async handleClickLogout() {
            try {
                this.isLogout = true
                await this.$auth.logout()
                this.isLogout = false
                this.$router.replace({ name: 'login' })
            } catch (err) {
                console.log(err)
            }

        },

    },
    async mounted() {
        try {
            const res = await getMe()
            console.log(res.data.users)
            this.username = res.data.users[0].username
            this.profileUrl = res.data.users[0].profileUrl
            console.log(this.profileUrl)
        } catch (err) {
            console.log(err)
        }
    }

}
</script>