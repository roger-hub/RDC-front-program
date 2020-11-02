<template>
  <div class="message-comment">
    <div class="basic-details">
      <img
        src="../../../assets/images/message-images/programmer.png"
        alt=""
        class="avatar"
      />
      <div class="name-date-details">
        <div class="name">
          <h2>管理员回复</h2>
        </div>
      </div>
    </div>
    <div class="page-details">
      <p v-for="(items, index) in commentReply" :key="index">
        {{ commentReply[index].commentContent }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    commentReply: {
      type: Object | Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(this.commentReply);
  },
};
</script>
<style scoped>
.message-comment {
  width: 100%;
  margin-top: 30px;
  border-top: 1px solid #ccc;
}
.basic-details {
  height: 80px;
}
.basic-details img {
  float: left;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 15px 0 0 60px;
}
.name {
  float: left;
}
.name h2 {
  margin: 30px 0 0 5px;
  font-size: 18px;
  font-weight: 400;
}
.page-details {
  margin-left: 123px;
  box-sizing: content-box;
}
.page-details p {
  line-height: 35px;
  font-size: 16px;
}
</style>
