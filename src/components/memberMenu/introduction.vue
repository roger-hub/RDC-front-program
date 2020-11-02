<template>
  <div class="introduction-wrapper">
    <div class="introduction">
      <h3>{{cIndividual.name}}</h3>
      <span>{{cIndividual.major}}</span>
      <p>{{cIndividual.introduce}}</p>
    </div>
    <div class="avatar">
      <img :src="cIndividual.picture" alt />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    cIndividual: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style scoped>
.introduction-wrapper {
  position: relative;
  height: 400px;
}
.introduction {
  position: absolute;
  width: 800px;
  height: 300px;
  background-color: rgba(13, 106, 167, 0.05);
  left: 50px;
  border-radius: 5px;
}

.avatar {
  position: absolute;
  width: 220px;
  height: 300px;
  background-color: pink;
  top: 30px;
  left: 680px;
  box-shadow: 15px 15px 1px rgba(13, 106, 167, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.avatar img {
  width: 220px;
  height: 300px;
}

.introduction h3 {
  text-align: left;
  font-size: 50px;
  margin: 20px 0 0 40px;
  color: rgba(119, 119, 119, 0.3);
  cursor: default;
}
.introduction span {
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  color: #999;
  margin-top: 10px;
  cursor: default;
}

.introduction p {
  margin: 60px 300px 0 40px;
  line-height: 24px;
  text-align: left;
  cursor: default;
}
.introduction-wrapper:nth-child(even) /deep/ .introduction {
  background-color: rgba(13, 106, 167, 0.3);
  left: 120px;
}
.introduction-wrapper:nth-of-type(even) /deep/ .avatar {
  left: 50px;
  box-shadow: -15px 15px 1px rgba(13, 106, 167, 0.1);
}
.introduction-wrapper:nth-of-type(even) /deep/ .introduction h3 {
  margin: 20px 0 0 600px;
}

.introduction-wrapper:nth-of-type(even) /deep/ .introduction p {
  margin: 30px 40px 0 300px;
}
</style>