<template>
  <div class="par-container" id="app">
    <div class="container">
    
      
    <Search/>
     <Content/>
     
   
      
    </div>
    
  </div>
  
</template>

<script>
import Search from '../components/search'
import Content from '../components/content'

export default {
   
    
    
    components:{
      Search,
      Content
    }
}
</script>
<style >
.par-container{
  display: flex;
  justify-content: center;
  align-items:center
}

</style>