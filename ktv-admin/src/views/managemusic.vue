<template>
    <div class="magnagemusic">
        <!-- 音频 -->
        <audio ref="musicPlayer" :src="toListenSrc" @ended="ended" autoplay preload="load"></audio>
      <Row style="padding:20px 60px 20px 40px;">
            <el-col :span="5">
                <Input prefix="ios-musical-notes" clearable v-model="searchName" @keypress.enter.native="searchSong()" placeholder="按 歌名, 歌手 搜索歌曲..." style="width: auto" />
            </el-col>
            <el-col :span="3">
                <Button type="primary" style="margin-left:5px;" @click="getAllSong()">所有歌曲</Button>
            </el-col>
            <el-col :span="4">
                <Button type="success" style="margin-left:5px;" @click="toListen = true">试听歌曲</Button>
            </el-col>
            <el-col :span="12" style="text-align:right;">
                <Avatar id="musicPoster" @click.native="operaMusic" class="listen-poster" v-if="toListenPoster" :src="toListenPoster" size="large" style="margin-right:40px;" />
                <Button type="primary" @click="showAddSongBtn()">添加</Button>
            </el-col>
        </Row>
        <!-- 歌曲数据表 -->
        <div style="width:100%;background-color:#f40;">
            <el-table :data="allSongs" class="song-table" style="width:100%;" border >
                <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                <el-table-column label="歌曲 ID" prop="_id" align="center" width="240"></el-table-column>
                <el-table-column label="歌曲名" prop="songName" align="center" width="200"></el-table-column>
                <el-table-column label="歌手" prop="artist" align="center" width="170"></el-table-column>
                <el-table-column label="歌曲地址" prop="src" align="center" width="200"></el-table-column>
                <el-table-column label="歌曲封面" align="center" width="120"><template slot-scope="scope">
                    <Avatar :src="'http://localhost:8633/api/music/poster?img=' + scope.row.poster" size="large" />
                </template>
                </el-table-column>
                 <el-table-column
                    align="center"
                    prop="language"
                    width="120"
                    label="语种">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="style"
                    width="120"
                    label="风格">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="playcount"
                    width="80"
                    label="播放次数">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    width="200"
                    label="最近更新时间">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    min-width="150">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning"
                            size="small"
                            circle
                            icon="el-icon-star-off"
                            @click='likeSongs(scope.row)'
                        ></el-button>
                        <el-button 
                            type="primary" 
                            icon="el-icon-edit" 
                            size="small"
                            circle
                            @click='onEditSong(scope.row)'
                        ></el-button>
                        <el-button 
                            type="danger" 
                            icon='el-icon-delete' 
                            size="small"
                            circle
                            @click='onDeleteSong(scope.row,scope.$index)'
                        ></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!-- 分页 -->
        <Row>
            <el-col span="24" style="text-align:right;padding:10px;">
                <el-pagination v-if='paginations.total > 0' 
                    :page-sizes="paginations.page_sizes" 
                    :page-size="paginations.page_size"
                    :layout="paginations.layout"
                    :total="paginations.total"
                    :current-page.sync="paginations.page_index"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"></el-pagination>
            </el-col>
        </Row>
        <!-- 添加歌曲 -->
        <el-dialog 
        :title="addDialog.title"
        :visible.sync="addDialog.show"
        :close-on-click-modal="false"
        :close-on-click-escape="false"
        :modal-append-to-body="false">
        <div class="form">
            <el-form 
            ref="addForm"
            :model="addForm"
            :rules="addForm_rules"
            label-width="120px"
            style="margin:10px;width:auto;">
            <el-form-item prop="songName" label="歌曲名">
                <el-input type="songName" v-model="addForm.songName"></el-input>
            </el-form-item>
            <el-form-item prop="artist" label="歌手">
                <el-input type="artist" v-model="addForm.artist"></el-input>
            </el-form-item>
            <el-form-item prop="src" label="歌曲地址">
                <Upload action="http://localhost:8633/api/admin/upload/music"
                     :on-success="handleAddSongSuccess"
                     ref="uploadmusic"
                     :format="['mp3']">
                    <Button @click.native="clearFiles" icon="ios-cloud-upload-outline">上传歌曲</Button>
                </Upload>
            </el-form-item>
            <el-form-item label="歌曲封面" prop="poster">
                <Upload :show-upload-list="false"
                            :format="['jpg','png']"
                            :max-size="10000"
                            multiple
                            type="drag"
                            :on-success="handleAddPosterSuccess"
                            action="http://localhost:8633/api/admin/upload/poster"
                            style="display:block;width:44px;">
                   <span style="float:left;">
                                <Avatar :src="'http://localhost:8633/api/music/poster?img=' + addForm.poster" size="large" />
                            </span>
                </Upload>
            </el-form-item>
            <el-form-item prop='language'  label="语种:">
                        <Select v-model="addForm.language" clearable style="width:200px">
                            <Option v-for="item in Languages" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </el-form-item>
                    <el-form-item prop='style'  label="风格:">
                        <Select v-model="addForm.style" clearable style="width:200px">
                            <Option v-for="item in SongStyle" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </el-form-item>
                    <el-form-item  class="text_right">
                        <el-button @click="addDialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='addSong("addForm")'>提  交</el-button>
                    </el-form-item>
            </el-form>
        </div>
        </el-dialog>

        <!-- 验证密码 -->
        <Modal
            v-model="isCheckPassword"
            draggable
            :mask-closable="false"
            width="360"
            >
            <p slot="header" style="color:#f60;">
                <Icon type="ios-information=circle" />
                <span>验证密码</span>
            </p>
            <div style="text-align:left;font-size:14px;">
                <Row>
                    <el-col span="18">
                        <Input v-model="inputPassword" type="password" icon="ios=key" @keyup.enter.native="checkPws()" placeholder="请输入管理员密码..." style="width: 200px" />
                    </el-col>
                    <el-col span="6">
                        <Button type="primary" size="large" @click="checkPwd()">验证</Button>
                    </el-col>
                </Row>
            </div>
            <div slot="footer"></div>
        </Modal>
        <!-- 音乐试听 -->
        <Modal v-model="toListen" width="700">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-musical-notes" />
                <span> 点击试听</span>
            </p>
            <div v-if="toListen">
                <div style="width:100%;">
                    <el-table
                    :data="allSongs"
                    height="300"
                    style="width: 100%">
                        <el-table-column
                            prop="songName"
                            align="center"
                            width="200"
                            label="歌名">
                        </el-table-column>
                        <el-table-column
                            prop="artist"
                            align="center"
                            width="200"
                            label="歌手">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            width="200"
                            label="试听">
                            <template slot-scope="scope">
                                <span class="toListen-link" @click="listenMusic(scope.row)">播放</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div slot="footer" v-if="toListen" style="height:30px;">
                <el-col span="24" style="text-align:right;padding:0px 10px;">
                    <el-pagination
                        v-if='paginations.total > 0'
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total"
                        :current-page.sync='paginations.page_index'
                        @current-change='handleCurrentChange'
                        @size-change='handleSizeChange'>
                    </el-pagination>
                </el-col>
            </div>
        </Modal>
    </div>
</template>
<script>
import wsmLoading from "@/plugins/wsmLoading";
import $ from "jquery";
export default {
    name:"magnagemusic",
    data(){
        return{
            isfirst:false,
            firstEdit:true,
            isCheckPassword:false,
            inputPassword:"",
            searchName:"",
            flag:""
        }
    },
    created(){
        this.getAllSong();
    },
    methods:{
        //验证密码
        checkPwd(){
            if(this.inputPassword.trim().length){
                this.isCheckPassword = false;
                wsmLoading.start("正在验证密码，请稍后");
                setTimeout(() => {
                    this.$axios.post("http://localhost:8633/api/admin/islegal", {
                        password:this.inputPassword,
                        email:this.$store.getters.adminInfo.email
                    }).then((res) => {
                       console.log(res);
                       if(res.data == true){
                           if(this.flag == 1){//添加歌曲
                              wsmLoading.start("密码正确，正在添加歌曲");
                              this.$axios.post("http://localhost:8633/api/admin/music/add", this.addForm)
                              .then(res=>{
                                  this.getAllSong();
                                  this.$nextTick(() => {
                                      wsmLoading.end();
                                      this.inputPassword = "",
                                      this.$Message.success('添加成功');
                                  })
                              })
                           } else if(this.flag == 2) {
                               //编辑歌曲
                               ws
                           }
                       } 
                    }).catch((err) => {
                        
                    });
                })
            }
        }
    }
}
</script>
