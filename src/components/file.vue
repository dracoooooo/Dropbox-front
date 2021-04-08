<template>
    <el-row>
      <el-col :span="1">
        <i class="el-icon-folder"
            v-if="dir">
        </i>
        <i class="el-icon-document"
           v-else >
        </i>
      </el-col>
      <el-col :span="6"><span>{{name}}</span></el-col>
      <el-col :span="6" id="time"><span>{{time}}</span></el-col>
      <el-col :span="6"><span>{{size}}<span v-if="!dir">byte</span></span></el-col>

    </el-row>
</template>

<script>

export default {
  name: "user-file",
  props:{

      dir: Boolean,
      name: String,
      size: Number,
      time: [Date, String]

  }
}
</script>

<style scoped>
.el-col{
  text-align: left;
}


</style>
