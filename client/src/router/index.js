import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import CreateQuiz from '../views/CreateQuiz.vue'
import Host from '../views/Host.vue'
import HostRoom from '../views/HostRoom.vue'
import PlayerWaiting from '../views/PlayerWaitingRoom.vue'
import PlayingRoom from '../views/PlayingRoom.vue'
const routes = [
        {
            path: '/',
            redirect: '/main'
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/main'
        },
        {
            path: '/main',
            name: 'main',
            component: Main
        },
        {
            path: '/create',
            name: 'create',
            component: CreateQuiz
        },
        {
            path: '/host/allquizes',
            name: 'Host',
            component: Host
        },
        {
            path: '/host/room/:roomCode',
            name: 'HostRoom',
            component: HostRoom
        },
        {
            path: '/waiting/room/:roomCode',
            name: 'PlayerWaiting',
            component: PlayerWaiting
        },
        {
            path: '/playing/room/:roomCode/:userID',
            name: 'PlayingRoom',
            component: PlayingRoom
        },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
