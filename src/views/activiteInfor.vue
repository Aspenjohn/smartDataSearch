<template>
  <div class="info-par">
    <p>流动数据</p>
    {{msg}}
    <hr>
   <ul v-for="infor in outShow" :key="infor"></ul>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
export default {
       data(){
           return {msg: 'sdsffd' ,
                   outShow:[]
               
               }
       },
       mounted(){
         PubSub.pubscribe('out',this.outShow)
       }
}
</script>

<style>

</style>