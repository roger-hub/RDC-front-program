<template>
    <div class="wrapper">
        <div class="clearfix container">
            <div class="left">
                <img src="../assets/logo.png" alt="">
                <span>
                    <p>Reasearch and</p>
                    <p>Development Center</p>
                    <!-- 计算机研发中心 -->
                </span>
            </div>
            <div class="right">亲爱的RDCer，欢迎回来！</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"TopBar"
}
</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

.wrapper{
    width: 100%;
    height: 60px;
    padding: 0;
    margin: 0;
    background: #053a5e;
    box-shadow: 4px 8px 8px rgba(0,0,0,.2);
    /* border-bottom: 1px solid #aaa; */
}

.clearfix::before{
    content: '';
    clear: both;
    display: block;
}

.right
{
    margin-right: 100px;
    float: right;
    line-height: 60px;
    color: #fff;
}

.left img{
    width: 60px;
    margin-top: 5px;
    margin-left: 100px;
    vertical-align: bottom;
}

.left{
    float: left;
    height: 50px;
    margin: 0;
    padding: 0;
}

.left span{
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    color: #fff;
    font-weight: bolder;
    /* font-size: 30px; */
    /* font-family: Vladimir Script; */
    /* font-family: Microsoft YaHei; */
    /* font-weight: lighter; */
    font-family: "SF Pro SC","HanHei SC","SF Pro Text","Myriad Set Pro","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    text-align: left;
    line-height: 24px;
}
</style>