<template>
  <div class='activiteShow' >
	<input @change="fileSelect" type="file" ref="files" :name="filename">
	<div class="build">
			<button  @click='begin(1)' >{{message}}</button>
            <button  @click='stop' >停止</button>
			<button @click='begin(3)' >fast↓</button>
			<button  @click="backTop">回到顶部</button>
			
	</div>
	<div class="activite-see" ref="active-par"  >
		
		<div class='time-line' ref="active-child" @dbclick="change()">
			
				<div v-for='(test, index) in back.items' :key="index"   @click="showInfor(index)"  class="timeline-info" ref="active-child-child">
					<p>{{test.time}}</p>
					<p :title="test.message" ref="timeline-p">接收命令：{{test.command}} 信息: {{test.message}}  记录次数：{{test.id}} </p>
					<hr>
					
				</div>
				
			
		</div>
	</div>
   
  </div>
</template>

<script>
export default {

 data(){
      return {
				message:"查看动态数据",
				display:'none',
				stopData:false,
				deep:'',
				flag:true,
				back:'',
				time:[],
				a:false,
				msg:'',
				id:'',
				card:'',
				modle:'',
				action:'',
				para:'',
				description:'',
				result:'',
				tap:'  ',
				filename:'',
				receiveData:''
				
				

	        }
	
	},

    created() {
			this.receiveData=(setInterval(()=>{ this.$http.get('http://localhost:8082/api/receive').then((response)=>{
			this.back=response.data
			})
		},1000*10))
    },
  methods:{
	fileSelect(){
		var that=this
		let file = that.$refs.files.files[0];
		that.filename=file.name
		var filename=file.name
		console.log(filename)
		that.$http.post("http://localhost:8082/api/receiveFile",filename)//传参
	.then(function(res){
		console.log(res)          
	})
	.catch(function(err){
		console.log("请求失败233");
	});
	/*.then(response => {
		　　　　　　// console.log(response.body);
		　　　　　　this.grouplist = response.body;
				alert("提交成功！")
			}, response => {
				console.log(response);
				alert("出问题啦！")
			});*/   
		
		
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
	change(){
		
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
		this.msg=getDom.innerText[6]+getDom.innerText[7]+getDom.innerText[9]+getDom.innerText[10]+getDom.title[0]+getDom.title[1]
		 this.$http.get('api/code').then((response) => {
		   this.result=response.data.code
		   let match=this.result.items
           for(var i=0;i<match.length;i++){
			  
			  if(this.msg==match[i].id[1]+match[i].id[2]+match[i].id[4]+match[i].id[5]+match[i].id[8]+match[i].id[9]){
					
					this.$emit('funcBack',match[i])
					
		  }}})
		 
		
		 
	
	
	
  


  }},
  beforeDestroy(){
	  clearInterval(this.receiveData)
  }

}
</script>

<style>

</style>