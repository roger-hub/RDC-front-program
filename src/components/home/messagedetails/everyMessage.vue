<template>
<li>
    <div class="basic-details">
        <img :src="imgUrl" alt="" class="avatar" />
        <div class="name-date-details">
            <div class="name">
                <h2>{{ everyItem.messageUsername }}</h2>
            </div>
            <div class="date">
                <p>{{ currentTime }}</p>
            </div>
        </div>
    </div>
    <div class="page-details">
        <p>{{ everyItem.messageContent }}</p>
    </div>
    <message-comment v-show="isComment" :commentReply="reply"></message-comment>
</li>
</template>

<script>
import messageComment from "@/components/home/messagedetails/messageComment";
export default {
    components: {
        messageComment,
    },
    props: {
        everyItem: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isComment: Boolean(this.everyItem.messageComment),
            currentTime: this.timeChange(),
            reply: [],
        };
    },
    watch: {},
    computed: {
        imgUrl: () => {
            return require("../../../assets/images/message-images/touristAvatar" +
                Math.floor(Math.random() * 2 + 1) +
                ".png");
        },
    },
    methods: {
        timeChange() {
            let originTime = new Date(this.everyItem.messageTime).getTime();
            let currentClock = new Date().getTime();
            let diffValue = Math.floor((currentClock - originTime) / 1000);
            if (diffValue <= 3600) return "刚刚";
            else if (diffValue <= 86400)
                return Math.floor(diffValue / 3600) + "小时前";

            if (diffValue <= 2592000) return Math.floor(diffValue / 86400) + "天前";
            if (diffValue <= 31104000)
                return Math.floor(diffValue / 2592000) + "个月前";
            else return;
            originTime.getFullYear() +
                "年" +
                (originTime.getMonth() + 1) +
                "月" +
                originTime.getDate() +
                "日";
        },
        getComment() {
            if (this.isComment) {
                this.$axios
                    .post("/first/comment/get", {
                        messageId: this.everyItem.messageId,
                    })
                    .then((res) => {
                        this.reply = res.data;
                        console.log(this.reply);
                    })
                    .catch((err) => {
                        console.log("error");
                    });
            } else {
                return;
            }
        },
    },
    mounted() {
        this.getComment();
    },
};
</script>

<style scoped>
li {
    list-style: none;
    width: 900px;
    background-color: #f9fafc;
    margin-bottom: 20px;
    border-radius: 15px;
    margin: 0 auto 20px;
    padding: 20px;
    box-sizing: border-box;
}

.basic-details {
    width: 100%;
    height: 80px;

    padding-top: 15px;
}

.avatar {
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.name-date-details {
    float: left;
}

.name {
    margin-left: 15px;
}

.name h2 {
    font-size: 18px;
    margin-top: 4px;
    font-weight: 400;
}

.date {
    margin-left: 15px;
}

.date p {
    margin: 0;
    font-size: 14px;
    color: #8e9caf;
    margin-top: 15px;
}

.page-details {
    margin: 20px 0;
}

.page-details p {
    text-indent: 3em;
    color: #8c9bad;
    font-size: 16px;
}
</style>
