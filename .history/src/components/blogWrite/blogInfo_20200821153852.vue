<template>
    <div class="blogInfo_container">
        <div class="blog_title blog_info">
            <i class="iconfont icon-xie"></i>
            <span>标题：</span>
            <input type="text" v-model="blogTitle" maxlength="100" @blur="sendInfo">
        </div>
        <div class="short_input_container">
            <div class="blog_author blog_info">
                <i class="iconfont icon-yonghu"></i>
                <span>作者：</span>
                <input type="text" v-model="blogAuthor" maxlength="30" @blur="sendInfo">
            </div>
            <div class="blog_direction blog_info">
                <i class="iconfont icon-leixing"></i>
                <span>方向：</span>
                <div class="direction" @click="changeDirListShow">
                    <div>{{directionNow}}</div>
                    <i class="tri_icon"></i>
                    <ul class="direction_list" v-show="isShowDirList">
                        <li v-for="(item,index) in direction" @click="changeDirection(index)" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../../assets/blogWriteIconfont/iconfont.css'

    export default{
        name : 'blogInfo',
        data() {
            return {
                blogTitle : '',
                blogAuthor : '',
                content : '',

                // 关于方向
                isNotShowAll : [true,true,true,true],
                isShowDirList : false,
                directionNow : '前端',
                direction : ['前端','后台','安卓','大数据'],
            }
        },
        methods: {
            // 控制修改方向列表是否出现
            changeDirListShow: function(e){
                this.isShowDirList = !this.isShowDirList;
            },

            // 修改博客的方向
            changeDirection: function(index,e){
                this.directionNow = this.direction[index];

                this.sendInfo();
            },

            // 传递标题、作者、方向给其他组件
            sendInfo: function(){
                this.$blogBus.$emit('sendInfo', this.blogTitle, this.blogAuthor, this.directionNow);
            },
        }
    }
</script>

<style scoped>


</style>