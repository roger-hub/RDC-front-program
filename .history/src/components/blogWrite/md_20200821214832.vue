<template>
    <div>
        <div id="area">
            <table>
                <tr>
                    <td><textarea name="" id="md-area" @keyup="mdSwitch" @blur="getContent" ></textarea></td>
                    <td class="show-area-container">
                        <div id="show-area" class="clearfix"></div>
                    </td>
                </tr>
            </table>

            <div class="submit_btn">
                <button @click="submitBlog">提交</button>
            </div>
        </div>
       
    </div>
</template>

<script>
    import showdown from 'showdown'
    export default {
        name:'md',
        data() {
            return {
                title : '',
                author : '',
                content : '',
                direction : '',
                around : '内'

            };
        },

        created() {
            this.getBlogInfo();
        },

        methods: {

            // 将左边内容转换成md格式，并显示在右边区域
            mdSwitch: function() {
                
                let showArea = document.getElementById("show-area");

                let mdValue = document.getElementById("md-area").value;
                let converter = new showdown.Converter();
                let html = converter.makeHtml(mdValue);

                showArea.innerHTML = html;
                // showArea.scrollTop = showArea.scrollHeight;
            },

            // 获取博客各信息
            getBlogInfo: function(){
                // 利用事件车进行数据传递
                this.$blogBus.$on('sendInfo',(title, author, direction) => {
                    this.title = title;
                    this.author = author;
                    this.direction = direction;
                    
                    console.log(this.title);
                    console.log(this.author);
                    console.log(this.direction);
                })
            },

            // 提交博客
            submitBlog: function(){

                console.log(this.title);
                console.log(this.author);
                console.log(this.direction);
                console.log(this.content);

                this.$axios.post('/api/blog/post',{
                    title : this.title,
                    author : this.author,
                    class_ : this.direction,
                    content : this.content,
                    around : this.around
                })
                .then(res => {
                    console.log(res);
                })
            },

            
            // 将md区域中的html内容传入到content里
            getContent: function(){
                let showAreaHtml = document.getElementsByClassName('show-area-container')[0].innerHTML;
                this.content = showAreaHtml;
            },

        },
    }
</script>

<style scoped>
    @import url(../../assets/css/blogWrite/sspai.css);

    *::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 8px;/*定义纵向滚动条宽度*/
        height: 8px;/*定义横向滚动条高度*/
    }

    *::-webkit-scrollbar-thumb {
        /*滚动条内部滑块*/
        border-radius: 8px;
        background-color: hsla(220, 4%, 58%, 0.3);
        transition: background-color 0.3s;
    }

    *::-webkit-scrollbar-thumb:hover {
        /*鼠标悬停滚动条内部滑块*/
        background: #bbb;
    }

    *::-webkit-scrollbar-track {
        /*滚动条内部轨道*/
        background: #ededed;
    }

    #area{
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;
    }
    #area>table {
        width: 100%;
        table-layout: fixed;
    }

    #area table tr td {
        margin: 0;
        padding: 6px;
        border: 0;
    }


    #md-area {
        width: 100%;
        height: 600px;
        font-size: 18px;
        overflow-y: auto;
        outline: none;
        resize: none;
        box-sizing: border-box;
        padding: 30px;
        line-height: 1.5;
    }

    #show-area {
        overflow-x: hidden;
        height: 600px;
        /* background-color: rgba(13, 102, 167,.7); */
        background: #333;
        overflow-y: auto;
        padding: 0 10px;
        color: #eee;
        vertical-align: middle;
    }


    .clearfix:before {
        content: "";
        display: table;
    }


    .submit_btn{
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }

    .submit_btn button{
        padding: 12px 40px;
        font-size: 18px;
        background-color: #0d66a7;
        color: #fff;
        border-radius: 5px;
        margin-right: 30px;
        cursor: pointer;
    }



</style>