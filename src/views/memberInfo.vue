<template>
<div class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
    <el-container>
        <el-header>
            <top-bar :isShowHome="true" :isShowRest="false"></top-bar>
        </el-header>
        <el-container>
            <el-aside width="16%">
                <div class="aside-menu-container">
                    <span class="aside-menu">菜单</span>
                </div>
                <memberMenu @spreadClick="spreadItem" :everygrade="memberGrade"></memberMenu>
            </el-aside>
            <el-main>
                <individual :cInfo="info"></individual>
            </el-main>
        </el-container>
        <el-footer>© copyright 2020 RDC Studio All Rights Reserved</el-footer>
    </el-container>
</div>
</template>

<script>
import memberMenu from "@/components/memberMenu/memberMenu";
import individual from "@/components/memberMenu/individual";
import TopBar from "@/components/common/TopBar";
export default {
    components: {
        memberMenu,
        individual,
        TopBar,
    },
    props: {},
    data() {
        return {
            info: [],
            memberGrade: {},
            fullscreenLoading: true,
        };
    },
    methods: {
        spreadItem(item) {
            this.$axios
                .post("/first/member/get", {
                    grade: item.grade.toString(),
                    direction: item.direction,
                })
                .then((res) => {
                    this.fullscreenLoading = false;
                    this.info = res.data;
                });
        },
    },
    mounted() {
        this.$axios
            .post("/first/member/get", {
                stat: 1,
            })
            .then((res) => {
                res.data['安卓'] = res.data['安卓'].sort((a, b) => a - b)
                this.memberGrade = res.data;
            });
        this.spreadItem({
            direction: "前端",
            grade: 18,
        });
    },
};
</script>

<style scoped>
.wrapper {
    margin-top: 0;
}

.el-header {
    padding: 0;
}

.aside-menu-container {
    text-align: left;
    margin-left: 20px;
}

.aside-menu {
    line-height: 50px;
    color: #606266;
    font-size: 18px;
}

.el-aside /deep/ .aside-menu::before {
    content: "\e602";
    font-family: element-icons;
    margin-right: 10px;
}

.el-footer {
    text-align: center;
    background: #606266;
    color: #fff;
    padding: 20px 0;
}

.el-aside {
    color: #333;
    text-align: center;
    /* min-height: 600px; */
    border-right: 1px solid #ccc;
    overflow: unset;
    background-color: #fff;
}

.el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    /* min-height: 600px; */
    overflow: unset;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-header {
    height: 50px !important;
}
</style>
