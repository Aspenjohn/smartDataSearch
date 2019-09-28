<template>
  <div id="par-search">
    <div id="search">
        <input type="text" placeholder="格式<**-**> **或** **" v-model="searchname" @keyup.enter="search"/><!--this.$refs.id.innertext-->
        
        <button @click="search">查询相关参数</button>
        <!--<input type="text" placeholder="格式eg:三号板" v-model="searchBoard" @keyup.enter="search"/><!-this.$refs.id.innertext-->
        
        <button @click="search">查询版号</button>
        <button onClick="document.location.reload()">重置</button>
    </div>
  </div>
</template>
<script>
import PubSub from 'pubsub-js'
export default {
    
    data(){
        return{
            searchname:'',
            searchBoard:''
        }
    },
     methods:{
        search(){
            var searchname=this.searchname.trim()
            const searchBoard=this.searchBoard.trim()
           if(searchname){
             PubSub.publish('search',searchname)//发布消息
           }else if(searchBoard){
               searchname=null
               PubSub.publish('search',searchBoard)
           }
          
        }
         
    }
}
</script>
<style >
.par-search{
  display: flex;
  justify-content: center;
  align-items:center
}
button{
    background-color: aliceblue;
    
    border-radius: 14px;
}
h2{
    text-align: center
}

</style>