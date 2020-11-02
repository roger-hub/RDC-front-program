<template>
  <div class="messageArea wrapper" ref="messageBoard">
    <div class="each" ref="each">
      <div class="eachPartTitle messageBoardTitle" @click="clickTitle">-留言板-</div>
    </div>
    <empty-message v-show="!isShow"></empty-message>
    <message-list @isEmpty="hideMessageList" v-show="isShow"></message-list>
    <messageBox></messageBox>
  </div>
</template>

<script>
import emptyMessage from "@/components/home/messagedetails/emptyMessage";
import messageBox from "@/components/home/messagedetails/messageBox";
import messageList from "@/components/home/messagedetails/messageList";
export default {
  components: {
    emptyMessage,
    messageBox,
    messageList,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    hideMessageList(flag) {
      this.isShow = Boolean(flag);
    },
    clickTitle() {
      const each = this.$refs.each;
      this.$emit("showShadow", each);
    },
  },
  mounted(){
    let self = this;
    let target = this.$refs.messageBoard;
    let foo = function () {
      let oTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (Boolean(
        oTop >= (target.offsetTop-200) &&
        oTop <= target.offsetTop + target.offsetHeight
      )) {
        self.$emit('showmessageBoard');
        //只进行一次动画，避免每次滑动都重复动画
        window.removeEventListener("scroll", foo);
      }
    };
    window.addEventListener("scroll", foo);
  }
};
</script>
<style scoped></style>
