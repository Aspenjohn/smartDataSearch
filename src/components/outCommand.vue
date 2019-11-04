<template>
  <div class='activiteShow' >
	 <form>
      <input @change="fileSelect" type="file" ref="files" :name="filename">
     <!-- <button type="button" @click="submit">上传</button>-->
    </form>
	<div class="build">
			{{ fileBuildData}}
			<button  @click='begin(1)'>{{message}}</button>
            <button  @click='stop' >停止</button>
			<button @click='begin(3)' >fast↓</button>
			<button  @click="backTop">回到顶部</button>
			
	</div>
	<div class="activite-see" ref="active-par" id='out' >
		
		<div class='time-line' ref="active-child" @dbclick="changeS()">
			
				<div v-for='(test, index) in out.items' :key="index"   @click="showInfor(index)"  class="timeline-info" ref="active-child-child">
					<p>{{test.time}}</p>
					<p :title="test.message" ref="timeline-p">{{test.build}} 发送命令：{{test.command}} 信息: {{test.message}}  记录次数：{{test.id}} </p>
					<hr>	
				</div>
				
			
		</div>
	</div>
   
  </div>
</template>

<script>
import { request } from 'http'
export default {

 data(){
      return {
		        fileBuildData:'',
				message:"查看动态数据",
				display:'none',
				stopData:false,
				deep:'',
				flag:true,
				out:'',
				time:[],
				a:false,
				msg:'',
				result:'',
				tap:'  ',
				filename:'',
				file:'',
				grouplist:[]

	        }
	
	},
	
    created() {

	 this.sendData=(setInterval(()=>{ this.$http.get('http://localhost:5000/api/send').then((response)=>{
		 this.out=response.data
		 
         })
      },1000))   
	  this.fileBuildData=this.out.items[0]
	  console.log(this.fileBuildData)
    },
methods:{
		fileSelect(){
			var that=this
			let file = that.$refs.files.files[0];
			that.filename=file.name
			var filename=file.name
			console.log(filename)
			that.$http.post("http://localhost:5000/api/file",filename)//传参
		.then(function(res){
			console.log(res)          
		})
		.catch(function(err){
			console.log("请求失败233");
		});	 
	},
		
  
		
	 
	
	begin (num){
		this.time=num
		clearInterval(this.deep)
		//this.message="加速向下"
	    this.display='inline-block'
		this.deep=(setInterval(() => {
	      
			this.$refs["active-par"].scrollTop+=this.time
			
		
	
		}, 20))
			
	},
	stop(){
		 this.message='↓'
		 clearInterval(this.deep)
		 
		
	},
	changeS(){
		
		 if(this.flag){
			 this.flag=false
			  this.begin(1)
		 }else if(!this.flag){
			
			 this.flag=true
			 this.stop()
		 }
	},

	
	backTop(){
		this.$refs["active-par"].scrollTop=0
	},
	showInfor(index){
		
		var getDom=this.$refs["timeline-p"][index]
		this.msg=getDom.innerText[6]+getDom.innerText[7]+getDom.title[0]+getDom.title[1]
		 this.$http.get('api/code').then((response) => {
		   this.result=response.data.code
		   
           for(var i=0;i<this.result.items.length;i++){
			  
			  if(this.msg==this.result.items[i].id[1]+this.result.items[i].id[2]+this.result.items[i].id[8]+this.result.items[i].id[9]){
                   
	               this.$emit('funcOut',this.result.items[i])
		  }}})
		 
		
		 
	
	
	
  


  }},
beforeDestroy(){
	clearInterval(this.sendData)
	this.out=null
}
}
</script>

<style>
#out{
	width: 570px;
}
</style>