<template>
<div class="detailed">
    <el-row class="tac">
        <el-col :span="24">
            <el-menu default-active="1-1" class="el-menu-vertical-demo" unique-opened>
                <el-submenu index="1">
                    <template slot="title">
                        <i>&#xe602;</i>
                        <span>前端</span>
                    </template>
                    <el-menu-item-group>
                        <member-list v-for="(item, index) in everygrade['前端']" :key="index" :detailgrade="everygrade['前端'][index]" :currentIndex="1" :specificIndex="index + 1" :currentItem="'前端'" @spreadClick="spread"></member-list>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i>&#xe6fe;</i>
                        <span>后台</span>
                    </template>
                    <el-menu-item-group>
                        <member-list v-for="(item, index) in everygrade['后台']" :key="index" :detailgrade="everygrade['后台'][index]" :currentIndex="2" :specificIndex="index + 1" :currentItem="'后台'" @spreadClick="spread"></member-list>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i>&#xe600;</i>
                        <span>安卓</span>
                    </template>
                    <el-menu-item-group>
                        <member-list v-for="(item, index) in everygrade['安卓']" :key="index" :detailgrade="everygrade['安卓'][index]" :currentIndex="3" :specificIndex="index + 1" :currentItem="'安卓'" @spreadClick="spread"></member-list>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i>&#xe62a;</i>
                        <span>大数据</span>
                    </template>
                    <el-menu-item-group>
                        <member-list v-for="(item, index) in everygrade['大数据']" :key="index" :detailgrade="everygrade['大数据'][index]" :currentIndex="4" :specificIndex="index + 1" :currentItem="'大数据'" @spreadClick="spread"></member-list>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>
</div>
</template>

<script>
import memberList from "@/components/memberMenu/memberList";
export default {
    components: {
        memberList,
    },
    props: {
        everygrade: {
            type: Object,
            required: true,
        },
    },
    methods: {
        spread(object) {
            this.$emit("spreadClick", {
                direction: object.direction,
                grade: object.grade,
            });
        },
    },
};
</script>

<style scoped>
.el-menu {
    border-right: none;
}

.el-menu li {
    text-align: left;
}

.el-submenu__title i {
    font-family: element-icons;
    font-style: normal;
    margin: 0 10px 0 7px;
    vertical-align: middle;
}

.el-submenu__title .ml1 {
    margin-left: 8px;
}

.el-submenu__title .special {
    font-size: 17px !important;
    margin-left: 6px;
}

.el-menu .el-menu-item {
    margin-left: 10px;
}

.el-menu-item-group /deep/.el-menu-item-group__title {
    padding: 0;
}
</style>
