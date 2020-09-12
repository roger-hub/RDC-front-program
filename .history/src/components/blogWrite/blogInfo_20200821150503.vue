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

    .blog_info,
    .short_input_container{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .blogInfo_container {
        font-size: 16px;
        font-family: Microsoft YaHei;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .short_input_container {
        margin-top: 10px;
        width: 710px;
        justify-content: space-between;
    }

    .blog_info {
        margin-right: 40px;
    }

    .blog_info span {
        margin-right: 10px;
    }


    .blog_info input,
    .direction {
        width: 150px;
        height: 28px;
        border: 1px solid #0D6AA7;
        border-radius: 5px;
        padding: 2px 5px;
    }

    .blog_title input {
        width: 575px;
    }

    /* 方向 */
    .direction {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }

    .direction div {
        width: 80px;
    }

    .direction i.tri_icon {
        display: block;
        width: 12px;
        height: 12px;
        margin-left: 5px;
        background: url(../../assets/img/down_tri.png) 0/contain no-repeat;
    }

    .direction .direction_list {
        position: absolute;
        top: 33px;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
        padding: 0;
        border-radius: 5px;
        background-color: #fcfcfc;
        border: 1px solid #999;
    }

    .direction_list li{
        border-bottom: none;
        text-align: center;
        width: 160px;
        height: 30px;
        line-height: 30px;
        margin: 0;
        font-size: 14px;
    }

    .direction_list li:hover{
        background-color: #4199d3;
        color: #fff;
    }

    i.iconfont{
        color: #0D6AA7;
        margin-right: 10px;
    }

</style>