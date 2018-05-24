<template>
  <div class="lay-out">   
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container class="chat-main-right" >
          <el-main>
            <ChatRoomMain v-bind:websocket="websock"/>
          </el-main>
          <el-footer height='190px'>
            <ChatRoomFooter v-bind:websocket="websock"/>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
  .lay-out {
    .el-header,
    .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }
    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }
    body>.el-container {
      margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }


    .chat-main-right{
      height: 600px;
    }
  }
  
</style>

<script>
  import ChatRoomFooter from '../components/ChatRoomFooter.vue';
  import ChatRoomMain from '../components/ChatRoomMain.vue';

  export default {
    name: 'LayOut',
    data() {
      return {
          websock: null,
      }
    },
    components:{
      ChatRoomFooter,
      ChatRoomMain
    },
    created(){
      const socket = 'ws://localhost:80/df';
      this.websock =  new WebSocket(socket);
      // console.log(this.websock);
    }
  }
</script>