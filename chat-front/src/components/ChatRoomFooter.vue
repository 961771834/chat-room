<template>
  <div class="chat-room-footer">
    <div class="send-from">
      <el-input v-model="input" placeholder="请输入内容" class="chat-input">
        <el-button slot="append" v-on:click="handleOnClick" >Send</el-button>
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
  methods:{
      handleOnClick(){
          this.$emit('onClickAction',this.input);

          this.input = '';
      }
  },
  mounted(){
    console.log(this.websocket);
  }
  
}
</script>
