<template>
<div id="blog-header">
    <div class="container">
        <div class="blog-tit fl">
            <span>技术分享</span>
        </div>
        <div class="blog-home fr">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>技术分享</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
#blog-header {
    height: 60px;
    min-width: 1200px;
    margin-bottom: 30px;
    background-color: #fafafa;
}

#blog-header .container {
    width: 1200px;
    margin: 0 auto;
}

#blog-header .container::before {
    content: '';
    display: block;
    clear: both;
}

.blog-tit {
    float: left;
    width: 180px;
    background-color: #fff;
    font-weight: 600;
    font-size: 28px;
    line-height: 60px;
    text-align: center;
}

.blog-home {
    float: right;
    font-size: 12px;
    padding: 20px 0;
}

.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
    color: #0d6aa7;
}
</style>
