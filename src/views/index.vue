<template>
  <div>



<!--    <button @click="getAllFile()">get</button>-->
<!--    <user-file v-for="f in files" v-bind="f" :key="f.id"></user-file>-->
    <el-container style="max-height: 100%">
      <el-aside width="240px" style="max-height: 100%">
        <el-main>
        <el-menu>
          <h1 align="center" style="color: #00a6ff;"><i class="el-icon-s-promotion"></i>&nbsp;dropbox</h1>
          <el-menu-item index="1"><i class="el-icon-document"></i>文件</el-menu-item>
          <el-menu-item index="2"><i class="el-icon-star-off"></i>收藏</el-menu-item>
          <el-menu-item index="3"><i class="el-icon-delete"></i>回收站</el-menu-item>
        </el-menu>
        </el-main>
        <el-footer>
          <span style="font-size: small">400MB / 100GB</span>
          <el-progress :percentage="50"></el-progress>
        </el-footer>
      </el-aside>

      <el-container>

        <el-header id="header">
          <div class="btn-div">
            <el-dropdown>
              <el-button id="settings" type="primary" icon="el-icon-s-tools" circle></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>给我打钱</el-dropdown-item>
                <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="btn-div">
            <el-dropdown>
            <el-button  type="primary" icon="el-icon-plus" circle></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-upload class="upload-demo"
                  action="http://localhost:9000/upload"
                           multiple
                  :http-request="uploadFile"
                  :show-file-list="false">上传文件
                </el-upload>
              </el-dropdown-item>
              <el-dropdown-item @click="newDir">新建文件夹</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
          </div>

<!--          <el-upload-->
<!--              class="upload-demo"-->
<!--              action="https://jsonplaceholder.typicode.com/posts/"-->
<!--              multiple>-->
<!--          </el-upload>-->
        </el-header>

        <el-main>
          <el-table :data="sortedFiles" @row-contextmenu="onContextmenu" @row-click="cd" >

            <el-table-column prop="isdir" width="35">
              <template slot-scope="scope">
                <i v-if="scope.row.dir" class="el-icon-folder"></i>
                <i v-else class="el-icon-document"></i>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称" min-width="100" sortable>
            </el-table-column>
            <el-table-column prop="time" label="修改时间" min-width="80" sortable>
            </el-table-column>
            <el-table-column prop="size" label="大小" min-width="50" sortable :formatter="formatSize">
            </el-table-column>
          </el-table>

        </el-main>
        <el-footer id="footer">
        </el-footer>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import {allFile, upload, download, Delete} from '@/api/api'

export default {
  name: "dropbox",
  components: {},
  data(){
    return{
      username: '',
      files: [],
    }
  },
  computed:{
    sortedFiles:function (){
      var tmp = this.files;
      tmp.sort(this.compare('name'));
      tmp.sort(this.compare('dir'));
      return tmp;
    }
  },
  methods: {
    getAllFile: function () {
      allFile(this.username).then((response) => {
        if (response.data['success'] === true) {
          this.files = response.data['data'];
          // console.log(this.files)
        }
      });
    },
    uploadFile: function (file) {
      console.log("upload")
      upload(file).then((response) => {
        if (response.data['success']) {
          this.Alert(response.data['msg'], "success");
          this.getAllFile();
        }
        else this.Alert(response.data['msg'], "error")
      })
    },
    // formatBoolean: function (row, column, cellValue){
    //   var ret = '';
    //   if(cellValue){
    //     ret = '<i class="el-icon-folder"></i>';
    //   }else {
    //     ret = '<i class="el-icon-document"></i>';
    //   }
    //   return ret;
    // }
    compare: function (p) {
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        if (p === 'dir') return b - a;
        return a - b;
      };
    },

    // sortByIsDir: function (obj1, obj2){
    //   var isDir1 = obj1.dir;
    //   var isDir2 = obj2.dir;
    //   return isDir1 >= isDir2;
    // },
    // sortByName: function (obj1, obj2){
    //   var name1 = obj1.name;
    //   var name2 = obj2.name;
    //   return name1 > name2;
    // }
    formatSize: function (row, column, cellValue) {
      var ret = '';
      if (cellValue === null) {
        return '';
      } else if (cellValue < 1024) {
        ret = cellValue + 'byte';
      } else if (cellValue < 1024 * 1024) {
        ret = (cellValue / 1024).toFixed(2) + 'KB';
      } else if (cellValue < 1024 * 1024 * 1024) {
        ret = (cellValue / 1024 / 1024).toFixed(2) + 'MB';
      }
      return ret;
    },

    newDir: function () {
      this.$prompt('新建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
    },

    onContextmenu(row, column, event) {
      event.preventDefault();
      this.$contextmenu({
        items: [
          {
            label: "下载",
            icon: "el-icon-download",
            onClick: () => {
              console.log("downloading " + row.name);
              this.downloadFile(row.name);
            },
            disabled: row.dir
          },
          {
            label: "收藏",
            icon: "el-icon-star-off",
            disabled: true,
            divided: true,
          },
          {
            label: "删除",
            icon: "el-icon-delete",
            onClick:()=>{
              console.log("delete " + row.name);
              this.deleteFile(row.name);
            }
          }
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "custom-class",
        zIndex: 3,
        minWidth: 230
      });
      return false;
    },
    cd: function (row) {
      if(row.dir){
        console.log("cd")
      }
    },
    logout: function (){
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    downloadFile:function (filePath){
      download(filePath).then((response)=>{
        console.log(response);

        const { data, headers } = response
        //http头不能放中文，所以先encode再decode
        const fileName = decodeURIComponent(escape(response.headers['file-name']))
        // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
        //const blob = new Blob([JSON.stringify(data)], ...)
        const blob = new Blob([data], {type: headers['content-type']})
        let dom = document.createElement('a')
        let url = window.URL.createObjectURL(blob)
        dom.href = url
        dom.download = decodeURI(fileName)
        dom.style.display = 'none'
        document.body.appendChild(dom)
        dom.click()
        dom.parentNode.removeChild(dom)
        window.URL.revokeObjectURL(url)
      })
    },
    deleteFile: function (filePath){
      Delete(filePath).then((response)=>{
        if(response.data.success === true){
          this.Alert(response.data.msg, 'success');
          this.getAllFile();
        }else {
          this.Alert(response.data.msg, 'error');
        }
      })
    }
  },

  mounted() {
    this.getAllFile();
  }
}
</script>

<style scoped>

#header{
  padding: 20px;
}
.el-menu{
  text-align: left;
  border-right: 0;

}

.el-aside {
  position: relative;
  float: left;
  width: 195px;
  top: 0px;
  bottom: 0px;
  /*background-color: #ebddca;*/
  height: 100vh;

  background: #fcfcff
}

.el-menu{
  background: #fcfcff;

}

.el-menu-item:hover{
  background: #eaeaed;
}

.el-footer{
  width: 100%;
  /*height:900px;*/
  position:absolute;
  bottom:0px;
  left:0px;
  align-items: center;
}

.btn-div{
  display: inline-block;
  width: 50px;
  height: 50px;
  float: right;
}


</style>
