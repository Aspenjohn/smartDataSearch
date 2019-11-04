<template>
<div>
    <div class="left">
	   <OutCommand @funcOut="getOut"></OutCommand>
	</div>
    <div class="right">
	 <BackCommand @funcBack="getBack"/>
    </div>
	<div class="activiteShow-infor">
		<div ref="outMsg" class="infor-outMsg">
		<span>ID:</span>{{outMsgId}},
		<span>板卡编号:</span>{{outMsgCard}},
		<span>模块名称：</span>{{outMsgMdel}},
		<span>命令名称：</span>{{outMsgAct}},
		<span>参数：</span>{{outMsgPara}},
		<span>参数说明:</span>{{outMsgDescr}}
		</div>
		<hr>
		<div ref="backMsg" class="infor-backMsg">
		<span>ID:</span>{{backMsgId}},
		<span>板卡编号:</span>{{backMsgCard}},
		<span>模块名称：</span>{{backMsgMdel}},
		<span>命令名称：</span>{{backMsgAct}},
		<span>参数：</span>{{backMsgPara}},
		<span>参数说明:</span>{{backMsgDescr}}
		</div>
	</div>
    
	
	
	
</div>

</template>

<script>
import OutCommand from '../components/outCommand'
import BackCommand from '../components/backCommand'
//import Demo from '../components/ssdemo'
export default {
   data(){
			return {
				backMsgId:'',
				backMsgDescr:'',
				backMsgCard:'',
				backMsgAct:'',
				backMsgPara:'',
				backMsgMdel:'',
				outMsgId:'',
				outMsgCard:'',
				outMsgMdel:'',
				outMsgAct:'',
				outMsgPara:'',
				outMsgDescr:''
				}
		}, 
		components:{
		OutCommand,
		BackCommand
		//Demo
		},
		methods:{
			getBack(data){
				
				this.backMsgId=data.id
				this.backMsgCard=data.card
				this.backMsgMdel=data.module
				this.backMsgAct=data.action
				this.backMsgPara=data.para
				this.backMsgDescr=data.description
				this.$refs['backMsg'].style.display="block"
			},
			getOut(data){
				this.outMsgId=data.id
				this.outMsgCard=data.card
				this.outMsgMdel=data.module
				this.outMsgAct=data.action
				this.outMsgPara=data.para
				this.outMsgDescr=data.description
				this.$refs['outMsg'].style.display="block"
			}

		}
	}
   
	
</script>

<style>
.infor-outMsg span{
  color: #FF6600
}
.infor-outMsg{
  display: none
}
.infor-backMsg span{
  color: #FF6600
}
.infor-backMsg{
  display: none
}
.rigth{
 float: left;
      width: 50%;
      height: 100%;
}
.left{
	float: left;
      width: 50%;
      height: 100%;
}
.activite-see{
	height: 300px;
	overflow-y: scroll;
	padding-left: 52px;
    float: left;
	width: 45%;

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
	margin:0 auto;
	width: 977px;
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
    margin-right: 169px;
    float: left;
    border: 2px solid bisque;
    width: 100%;
    height: 210px;
    margin-top: 30px;
    box-sizing: content-box;
    
}
.timeline-info:hover{
	background:lightblue
}

</style>