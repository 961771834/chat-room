<template>
  <div class="chat-room-main">
    <div class='room'>{{room}}</div>
    <ul class='rooms'>
      <li v-for="item in rooms" :key="item">
        {{ item }}
      </li>
    </ul>
    <ul class='messages'>
      <li v-for="item in messages" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  .chat-room-main{
    .messages{
      list-style: none;
      li{
        list-style: none;
      }
    }
  }
</style>
<script>
export default {
  name:'ChatRoomMain',
  props:['room','messages','rooms'],
  mounted(){
    console.log(this.messages)
  }
}
</script>

