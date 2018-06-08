<template>
        <ul class='rooms'>
            <li v-for="item in rooms" :key="item">
                {{ item }}
            </li>
        </ul>
</template>

<script>
    export default {
        name:'RoomList',
        props:['rooms'],
        mounted(){

        }
    }
</script>