<template>
    <div class="magnagemusic">
        <!-- 音频 -->
        <audio ref="musicPlayer" :src="toListenSrc" @ended="ended" autoplay preload="load"></audio>
        <Row style="padding:20px 60px 20px 40px">
            <i-col :span="5">
                <i-input prefix="ios-musical-notes" clearable v-model="searchName" @keypress.enter.native="searchSong()">
            </i-col>
            <i-col :span="3">
                <Button type="primary" style="margin-left:5px;" @click="getAllSong()">所有歌曲</Button>
            </i-col>
            <i-col :span="4">
                <Button type="success" style="margin-left:5px;" @click="toListen = true">试听歌曲</Button>
            </i-col>
            <i-col :span="12" style="text-algin:right">
                <Avatar id="musicPoster" @click.native="operaMusic" class="listen-poster" v-if="toListenPoster" :src="toListenPoster" size="large" style="margin-right:40px;" />
                <Button type="primary" @click="showAddSongBtn()">添加</Button>
            </i-col>
        </Row>
    </div>
</template>