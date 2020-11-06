<template>
<div class="book_container">
    <div class="book_top">
        <i class="blog_icon"></i>
        <span>书 籍 推 荐</span>
        <div class="direction" @click="changeDirListShow">
            {{directionNow}}
            <i class="tri_icon"></i>
            <ul class="direction_list" v-show="isShowDirList">
                <li v-for="(item,index) in direction" @click="changeDirection(index)">{{item}}</li>
            </ul>
        </div>
    </div>

    <!-- 书籍推荐列表 -->
    <ul class="book_list">
        <li class="list_child" v-for="(item, index) in book" :key="item.id">
            <div class="book_info">
                <div class="book_left">
                    <img :src="item.picture" alt />
                </div>
                <div class="book_right">
                    <div class="book_name">{{item.name}}</div>
                    <div class="book_author">{{item.author}}</div>
                    <div class="book_content" v-show="isNotShowAll[index]">{{item.content}}</div>
                    <i :class="arrowClass[index]" class="open_icon" @click="changeShowAll(index)"></i>
                </div>
            </div>
            <div class="content_detail" :class="contActive[index]">{{item.content}}</div>
            <div class="book_underline"></div>
        </li>
    </ul>

    <button class="replace" @click="replaceBook">
        <i class="replace_icon"></i>
        <span>换一组</span>
    </button>
</div>
</template>

<script>
export default {
    name: "blogBook",
    components: {},
    props: {},
    data() {
        return {
            isNotShowAll: [true, true, true, true],
            isShowDirList: false,
            directionNow: "前端",
            direction: ["前端", "后台", "安卓", "大数据"],
            arrowClass: [{
                    down: true,
                    up: false,
                },
                {
                    down: true,
                    up: false,
                },
                {
                    down: true,
                    up: false,
                },
                {
                    down: true,
                    up: false,
                },
            ],
            contActive: [{
                    active: false
                },
                {
                    active: false
                },
                {
                    active: false
                },
                {
                    active: false
                },
            ],
            book: [],
        };
    },
    methods: {
        // 控制书籍说明内容是否展开
        changeShowAll: function (index, e) {
            this.isNotShowAll[index] = !this.isNotShowAll[index];
            this.arrowClass[index].down = !this.arrowClass[index].down;
            this.arrowClass[index].up = !this.arrowClass[index].up;
            this.contActive[index].active = !this.contActive[index].active;
        },
        closeShowAll: function (index, e) {
            this.isNotShowAll[index] = false;
            this.arrowClass[index].down = false;
            this.arrowClass[index].up = false;
            this.contActive[index].active = false;
        },

        // 修改书籍推荐的方向
        changeDirection: function (index, e) {
            this.directionNow = this.direction[index];

            this.$axios
                .post("/first/book/queryBooks_02", {
                    direction: this.directionNow,
                })
                .then((res) => {
                    let bookArr = res.data;
                    for (let i = 0; i < bookArr.length; i++) {
                        this.book[i].id = i;
                        this.book[i].picture = bookArr[i].coverUrl;
                        this.book[i].name = bookArr[i].bookName;
                        this.book[i].author = bookArr[i].author;
                        this.book[i].content = bookArr[i].bookContent;
                    }
                });
        },

        // 控制修改方向列表是否出现
        changeDirListShow: function (e) {
            this.isShowDirList = !this.isShowDirList;
        },

        // 改变一组书籍
        replaceBook: function (e) {
            this.$axios
                .post("/first/book/queryBooks_02", {
                    direction: this.directionNow,
                })
                .then((res) => {
                    let bookArr = res.data;
                    for (let i = 0; i < bookArr.length; i++) {
                        this.book[i].id = i;
                        this.book[i].picture = bookArr[i].coverUrl;
                        this.book[i].name = bookArr[i].bookName;
                        this.book[i].author = bookArr[i].author;
                        this.book[i].content = bookArr[i].bookContent;
                    }
                });
        },
    },
    mounted() {
        this.$axios
            .post("/first/book/queryBooks_02", {
                direction: this.directionNow,
            })
            .then((res) => {
                let bookArr = res.data;
                console.log(bookArr);
                for (let i = 0; i < bookArr.length; i++) {
                    this.book.push({
                        id: i,
                        picture: bookArr[i].coverUrl,
                        name: bookArr[i].bookName,
                        author: bookArr[i].author,
                        content: bookArr[i].bookContent,
                    });
                }
            });
    },
};
</script>

<style scoped>
@import url("../../assets/css/blog_details/base.css");
.book_container {
    width: 280px;
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10px;
    padding: 25px 20px;
    color: #666666;
    font-size: 14px;
    position: relative;
}

.book_top {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

i.blog_icon {
    display: block;
    width: 24px;
    height: 24px;
    background: url(../../assets/icon/book.png) 0 / contain no-repeat;
    margin-right: 10px;
}

.book_top span {
    font-size: 18px;
    color: #0d6aad;
}

.book_list{
    padding: 0;
}

.direction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    display: flex;
    align-items: center;
    z-index: 100;
}

.direction:hover {
    color: #1693C0;
}

.direction:hover li {
    color: #666;
}

.direction_list {
    position: absolute;
    top: 20px;
    right: -20px;
    background-color: #fff;
    animation: fadeInDirectionList 0.25s linear forwards;
}

@keyframes fadeInDirectionList {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.direction_list li {
    border: 1px solid #cacaca;
    border-bottom: none;
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 30px;
}

.direction_list li:hover {
    background-color: #1693C0;
    color: #fff;
}

.direction_list li:first-child {
    border-radius: 5px 5px 0 0;
}

.direction_list li:last-child {
    border-bottom: 1px solid #cacaca;
    border-radius: 0 0 5px 5px;
}

/* 书籍列表 */

.list_child {
    margin: 40px 0;
}

.book_info {
    display: flex;
    justify-content: space-between;
}

.book_left img {
    display: block;
    width: 100px;
    background-color: #1693c4;
}

.book_right {
    width: 160px;
    position: relative;
}

.book_right div:hover,
.content_detail.active:hover {
    color: #1693C0;
}

.book_name {
    margin-bottom: 30px;
}

.book_author {
    margin-bottom: 28px;
}

.book_content {
    width: 80%;
    overflow: hidden;
    line-height: 1.5;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.content_detail {
    margin-top: 15px;
    line-height: 1.5;
    min-height: 0;
    max-height: 0;
    transition: all 0.2s ease-out;
    overflow: hidden;
}

.content_detail.active {
    max-height: 900px;
}

.book_underline {
    width: 250px;
    margin: 15px auto 0;
    height: 1px;
    background-color: #eeeeee;
}

.open_icon {
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: 0;
    right: 10px;
}

.open_icon.down {
    background: url(../../assets/icon/down.png) 0 / contain no-repeat;
}

.open_icon.up {
    background: url(../../assets/icon/up.png) 0 / contain no-repeat;
}

.replace {
    color: #1693C0;
    position: absolute;
    bottom: 15px;
    right: 25px;
    display: flex;
    align-items: center;
}

.replace:active {
    color: #0d6aad;
}

i.replace_icon {
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/icon/refresh.png) 0 / contain no-repeat;
    margin-right: 5px;
}

i.tri_icon {
    display: block;
    width: 12px;
    height: 12px;
    margin-left: 5px;
    background: url(../../assets/icon/down_tri.png) 0 / contain no-repeat;
}
</style>
