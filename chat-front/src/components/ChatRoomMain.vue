<template>
  <div class="chat-room-main">
    <div class='room'>{{room}}</div>
    <div class='room-list'></div>
    <div class='messages'>{{message}}</div>
  </div>
</template>
<script>
export default {
  name:'ChatRoomMain',
  props:['message','room','rooms'],
  mounted(){
    console.log(this.message)
  }
}
</script>

