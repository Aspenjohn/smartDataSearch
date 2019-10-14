<template>
<div class='activiteShow' >
	<button><router-link to="/activiteShow/activiteInfor">查看动态数据信息</router-link></button>
	<router-view/>
	<div class="build">
			{{out.items[0].build}}
			<button  @click='begin(1)' >{{message}}</button>
            <button  @click='stop' >停止</button>
			<button @click='begin(3)' >fast↓</button>
			<button  @click="backTop">回到顶部</button>
			
	</div>
	<div class="activite-see" ref="active-par" @click="change" >
		
		<div class='time-line' ref="active-child" >
			
			
				<div v-for='(test, index) in out.items' :key="index"  class='time-line-div' @click="showInfor(index)" >
					<p>{{test.time}}</p>
					<p ref='circular'></p>
					<p :title="test.message" ref="timeline-p">命令：{{test.command}} id：{{test.id}}</p>
					
					
				</div>
				<div class='img-dotted' ref='dotted'></div>
			
		</div>
	</div>
	<div class="activiteShow-infor">
	{{id}}{{tap}}|{{card}}{{tap}}|{{modle}}{{tap}}|{{action}}{{tap}}|{{para}}{{tap}}{{description}}
	</div>
</div>

</template>

<script>
import PubSub from 'pubsub-js'
export default {
	
   data(){
      return {
				message:"查看动态数据",
				display:'none',
				stopData:false,
				deep:'',
				flag:true,
				out:'',
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
				tap:'  '
				

	        }
	
	},
	created(){
		this.$http.get('/api/go').then((response) => {
		this.out=response.data.goData
		PubSub.publish('out',this.out)
	        })
	},
    mounted() {
	this.$refs.dotted.style.left = this.$refs.circular[0].offsetLeft - 12 + 'px'
	// 拿到数据时，做一次map。
	this.out.items.map(el => {
	el.isShowTxt = false;
	return el;
	});
	
    },
  methods:{
	  
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
		this.msg=getDom.innerText[4]+getDom.innerText[5]+getDom.title[0]+getDom.title[1]
		 this.$http.get('api/code').then((response) => {
           this.result=response.data.code
           for(var i=0;i<this.result.items.length;i++){
			  
			  if(this.msg==this.result.items[i].id[1]+this.result.items[i].id[2]+this.result.items[i].id[8]+this.result.items[i].id[9]){
                    this.id=this.result.items[i].id
                    this.card=this.result.items[i].card
                    this.modle=this.result.items[i].module
                    this.action=this.result.items[i].action
                    this.para=this.result.items[i].para
                    this.description=this.result.items[i].description
	  
		  }}})
		   
		
		 
	
	
	
  


  }}
}
</script>

<style>
.activite-see{
	height: 300px;
	overflow-y: scroll;
	padding-left: 52px;
    float: left;
}
.activite-see::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
        }
        .activite-see::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgb(253, 251, 251);
        }
        .activite-see::-webkit-scrollbar-track {/*滚动条里面轨道*/
            box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
            border-radius: 0;
            background: rgb(255, 255, 255);
        }
.time h2{
	color:#FF6600;
	margin: 20px auto 30px auto;
}

.time-line{
	position: relative;
	width:300px;
	margin:0 auto;
}
.time-line-div{
	position:relative;
	min-height:85px;
}
.time-line-div>p:nth-child(1){
	position: absolute;
	left:0;
	width:100px;
}
.time-line-div>p:nth-child(2){
	position:absolute;
	left: 100px;
	width:15px;
	height:15px;
	top:10px;
	background:#5CB85C;
	border-radius: 50%;
	z-index: 10
}
.time-line-div>p:nth-child(3){
	position:absolute;
	left: 130px;
	padding: 10px;
	background: #317EF3;
	font-size:.8rem;
	color:#fff;
	border-radius: 10px;
}
.time-line-div>p:nth-child(3):hover{
	background: #FFCD42
}

.img-dotted{
	position:absolute;
	width:20px;
    margin-left: 29%;
	height:100%;
	top:0;
	z-index: 1;
	background:url('../assets/dotted.png');
}
.time-line-detail>p{
	margin-left: 30px;
	margin-bottom: 10px;
}
.activiteShow-infor{
	background-color: aliceblue;
	float: right;
    margin-right: 169px	
}
</style>