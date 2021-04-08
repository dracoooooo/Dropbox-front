<template>
  <div>
    <button @click="getAllFile()">get</button>
    <user-file v-for="f in files" v-bind="f" :key="f.id"></user-file>
  </div>
</template>

<script>
import {allFile} from '@/api/api'
import UserFile from "@/components/file";

export default {
  name: "main",
  components: {UserFile},
  data(){
    return{
      username: 'draco',
      files: [],
    }
  },
  computed:{
    f: function (){
      return this.files[0];
    }
  },
  methods: {
    getAllFile: function (){
      allFile(this.username).then((response)=>{
        if(response.data['success'] === true){
          this.files = response.data['data'];
          console.log(this.files)
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
