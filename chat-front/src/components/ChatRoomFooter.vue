<template>
  <div class="chat-room-footer">
    <div class="send-from">
      <el-input v-model="input" placeholder="请输入内容" class="chat-input">
        <el-button slot="append" >Send</el-button>
      </el-input>
    </div>
    <div class="send-help">
        <ul>
          <li>Change nickname: /nick [username]</li>
          <li>Join/Create room: /join [room name]</li>
        </ul>
    </div>
  </div>
</template>
 <style lang="scss" scoped>
    .chat-room-footer{
      .chat-input{
        width: 600px;
      }

      .send-help{
        ul{
          margin: 0;
          padding: 0;
        }
        li{
          height: 30px;
          list-style-type: none;
        }
      }
    }

</style>
<script>
export default {
  name:"ChatRoomFooter",
  data() {
    return {
      input: ''
    }
  },
  props:['websocket'],
  // processCommand(command){
  //   // const words = command.split(' ');
  //   // const handleCommand = words[0].substring(1,words[0].length).toLowerCase();

  //   // const message = false;

  // }
  mounted(){
    console.log(this.websocket);
  }
  
}
</script>
