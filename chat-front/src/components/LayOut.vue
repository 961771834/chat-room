<template>
  <div class="lay-out">   
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container class="chat-main-right" >
          <el-main>
            <ChatRoomMain v-bind:message="message" v-bind:rooms="rooms" v-bind:room="room"/>
          </el-main>
          <el-footer height='190px'>
            <ChatRoomFooter v-on:onClickAction="onClickAction"/>
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
          websocket: null,
          message:'',
          room:'',
          rooms:[]
      }
    },
    components:{
      ChatRoomFooter,
      ChatRoomMain
    },
    created(){
      this.websocket =  this.$socket;
      this.websocket.on('nameResult',(result)=>{
        if(result.success){
          this.message = 'You are known as ' + result.name + '.';
        }else{
          this.message = result.message;
        }
      });
      this.websocket.on('joinResult',(result)=>{
          this.room = result.room;
      });
      this.websocket.on('message',(message)=>{
          this.message = message.text;
      })

      this.websocket.on('rooms',(rooms)=>{
        console.log(rooms);
      })
    },
    methods:{
      sendMessage(room,text){
         const message = {
           room,text
         }

         this.websocket.emit('message',message);
      },
      changeRoom(room){
        this.websocket.emit('join',{
          newRoom:room
        });
      },
      processCommand(command){
        const words = command.split(' ');
        const handleCommand = words[0].substring(1,words[0].length).toLowerCase();

        let message = false;

        switch (handleCommand) {
          case 'join':
            {
              words.shift();
              const room = words.join();
              this.changeRoom(room);
              break;
            }

          case 'nick':
            {
              words.shift();
              const name = words.join();
              this.websocket.emit('nameAttemp', name);
              break;
            }

          default:
            {
              message = 'Unrecongized command';
              break;
            }
        }

        return message;      
      },
      onClickAction(command){
        let systemMessage;
        if(command && command.charAt(0) == '/'){
            //命令处理
            systemMessage = this.processCommand(command);
            if(systemMessage){
              this.message = systemMessage;
            }
        }else{
          // 发送消息
          this.sendMessage(this.room,command);
        }
      }
    }
  }
</script>