<template>
    <div class="wrapper">
        <slot></slot>
        <span class="scrip">
            {{msg}}
        </span>
    </div>
</template>

<script>
export default {
    name:"Ac-singlePhoto",
    props: {
        msg: String,
    }
}
</script>

<style scoped>
.wrapper{
    display: inline-block;
    position: relative;
    width: 320px;
    background: #fff;
    border: 1px solid #ddd;
}

.wrapper img{
    width: 300px;
    padding: 20px 10px 20px;
}

span{
    display: inline-block;
    width: 100%;
    color:#666;
    font-weight: bolder;
    text-align: center;
    padding-bottom: 20px;
}
</style>