<template>
    <div id="content">
        <h2 v-if="firstView">输入上下发id和命令号搜索</h2>
        <h2 v-if="loading">LOADING...</h2>
        <h2 v-if="errorMsg" :key="i">{{errorMsg}}</h2>
        <div class="row">
            <div class="idAndorder">
                
                <h2 v-if="searchBoard" :key="i">{{searchBoard}}</h2>
                
                <table class="idAndorder-table" v-if="tableView">
                    <thead>
                    <tr>
                    <th>id</th>
                    <th>card</th>
                    <th>module</th>
                    <th>action</th>
                    <th>para</th>
                    <th>description</th>
                    </tr>
                    
                    </thead>
                    <tbody>
                        <td >
                            <tr v-for="i in id"  :key="i">
                              <div class="follow">
                                {{i}}
                              </div>
                            </tr>
                        </td>
                        <td >
                            <tr v-for="i in card"  :key="i">
                              <div class="follow">
                                {{i}}
                              </div>
                            </tr>
                        </td>
                        <td>
                            <tr v-for="i in modle" :key="i">
                              <div class="follow">
                                {{i}}
                              </div>
                            </tr>
                        </td>
                        <td>
                            <tr v-for="i in action" :key="i">
                              <div class="hidden">
                                {{i}}
                              </div>
                            </tr>
                        </td>
                        <td>
                            <tr v-for="i in para" :key="i">
                              <div class="hidden">
                                {{i}}
                              </div>
                            </tr>
                        </td>
                        <td>
                            <tr v-for="i in description" :key="i">
                              <div class="hidden">
                                {{i}}
                              </div>
                            </tr>                           
                        </td>
                    </tbody>

                </table>
             
            </div>
        </div>
        
       
      

    </div>
    
</template>
<script>
import Pubsub from 'pubsub-js'

export default {
    /*el:{
        id:'#content'
    },*/
    created(){
        
        } ,
    data(){
        return{
            tableView:true,
            firstView:true,
            loading:false,
            id:[],
            searchBoard:'',
            card:[],
            modle:[],
            action:[],
            para:[],
            description:[],
            errorMsg:'',
             code:'',
            searchname:'',
            result:'',
            
            
        }
    },
    mounted(){
        //订阅消息
        Pubsub.subscribe('search',(searchname,searchBoard)=>{//需要发ajax进行搜索
          this.searchname=searchname
          this.searchBoard=searchBoard
          this.firstView=false
          this.tableView=false
            this.loading=true
            this.users=null
            this.errorMsg=''
           this.firstView=true
            this.loading=false
            this.ids=[]
           this.$http.get('api/code').then((response) => {
           this.result=response.data.code
        //this.code = response.data.code //数据位置
            
            var len=this.result.items.length
         
           for(var i=0;i<len;i++){
                  
                if(this.result.items[i].id==searchBoard||this.result.items[i].card==searchBoard){
                    this.tableView=true
                    this.id.push(this.result.items[i].id)
                    this.card.push(this.result.items[i].card)
                    this.modle.push(this.result.items[i].module)
                    this.action.push(this.result.items[i].action)
                    this.para.push(this.result.items[i].para)
                    this.description.push(this.result.items[i].description)
                }else if(searchBoard[0]!=="<"){
                    var newSearch=searchBoard.split(" ")
                    if(newSearch[0]==this.result.items[i].id[1]+this.result.items[i].id[2]&&newSearch[1][0]+newSearch[1][1].toUpperCase()==this.result.items[i].id[8]+this.result.items[i].id[9]){
                        this.tableView=true
                    this.id.push(this.result.items[i].id)
                    this.card.push(this.result.items[i].card)
                    this.modle.push(this.result.items[i].module)
                    this.action.push(this.result.items[i].action)
                    this.para.push(this.result.items[i].para)
                    this.description.push(this.result.items[i].description)
                    }
                }
            }
           
        })})
          
            //更新状态
           
           
            
        
          
            //更新状态
           
           
         },
            
            //发ajax请求
            /*axios.get(url).then(response=>{
                const result=response.data
                const users=result.code.map()
                //成功，更新状态
                this.loading=false
                this.users=users
            }

            ).catch(error=>{
                //失败，更新失败状态
                this.loading=false
                this.errorMsg='请求失败'
            })*/
        
        
   
    }
    

</script>
<style >
/*.idAndorder-table{
    text-align: center
}
*/
  table
        {
            border-collapse: collapse;
            margin: 0 auto;
            text-align: center;
            overflow: hidden;
            width: 100%;
        }
        table td, table th
        {
            border: 1px solid #cad9ea;
            color: #666;
            height: 30px;
        }
        table thead th
        {
            background-color: #CCE8EB;
            width: 100px;
        }
        table tr:nth-child(odd)
        {
            background: #fff;
            overflow: hidden;
        }
        table tr:nth-child(even)
        {
            background: #d5e7e7;
            overflow: hidden;
        }
        .hidden{
            height: 20.8px;
            overflow-y: scroll;
        }
        .hidden::-webkit-scrollbar {/*滚动条整体样式*/
            width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 4px;
        }
        .hidden::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 5px;
            -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            background: rgb(253, 251, 251);
        }
        .hidden::-webkit-scrollbar-track {/*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2);
            border-radius: 0;
            background: rgb(255, 255, 255);
        }
        .follow{
            width: 126px;
        }


</style>