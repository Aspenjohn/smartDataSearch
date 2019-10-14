<!--<template>
  <div id="app">
 
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    gofis(){
      var that=this;
      var password=this.password;
      var password1=this.password1;
      var password2=this.password2;
      $.ajax({
        url:'/api/user',
        type:'get',
        data:{},
        success:function(data){
          var result=data.code;
          if(result==100){
            alert('密码修改成功');
          }else{
            alert("密码修改失败");
          }
        },
        error:function(data){
          alert(data.code);
          alert('ajax返回失败');
        },
        dataType:'json',
        
      })
    },
    mounted(){
this.info();
}
  }
}
</script>

<style>

</style>
<!--这是一个组件,局部功能界面
<template>
<div>
   <div v-if="!repoName">loading</div>
   <div v-else>most star repo is <a :href="repoUrl">{{repoName}}</a></div>
</div>
  
</template>
<script>
import axios from 'axios'
export default {
   data(){
     return{
       repoUrl:'',
       repoName:''
     }
   },
   mounted(){
     //使用resource发起ajax请求
     const url='https://api.github.com/search/repositories?q=v&sort=stars'
     /*this.$http.get(url).then(
       response=>{
         //成功了
         const result=response.data
         //得到数据
         const mostRepo=result.items[0]
         this.repoUrl=mostRepo.html_url
         this.repoName=mostRepo.name
       },
       response=>{
         alert("请求失败")
       }
     )
     */
    //使用axios发送ajax请求
    axios.get(url).then(
      response=>{
        const result=response.data//获取ulr里面的数据
        const mostRepo=result.items[0]
        this.repoUrl=mostRepo.html_url
        this.repoName=mostRepo.name
      }
    ).catch(error=>{alert("请求错误")})
   }
}
</script>
<style>

</style>
-->
<template>
  <div class="app-container">
    <div class="app-container-center">
      <img src="//nwzimg.wezhan.cn/contents/sitefiles2022/10113119/images/8259291.png" alt="" title="" id="img_smv_tem_48_1" style="width: 147px; height:48px;">
     <p>
        <button><router-link to='/app'>首页</router-link></button>
        <button><router-link to='/activiteShow'>动态数据展示</router-link></button>
        <button><router-link to='/messageSearch'>参数查询</router-link></button>
       
       
      </p>
    </div>
    <hr>
      <keep-alive>
       <router-view></router-view >
      </keep-alive>
  </div>
</template>

<script>
export default {

}
</script>

<style>
a{
  text-decoration: none;
}
button{
    background-color: aliceblue;
    border-style: none;
    border-radius: 14px;
    
}
</style>