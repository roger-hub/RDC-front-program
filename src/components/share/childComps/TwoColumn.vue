<template>
<div>
    <div id="blog-content">
        <div class="container">
            <div id="blog-l" class="fl">
                <blog-content></blog-content>
            </div>
            <div id="blog-r" class="fr">
                <blog-search></blog-search>
                <blog-menu></blog-menu>
                <blog-tags></blog-tags>
                <blog-books></blog-books>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BlogCardAll from "@/components/share/childComps/BlogCardAll";
import BlogContent from "@/components/share/childComps/BlogContent";
import BlogMenu from "@/components/share/childComps/BlogMenu";
import BlogTags from "@/components/share/childComps/BlogTags";
import BlogBooks from "@/components/share/childComps/BlogBooks";
import BlogSearch from "@/components/share/childComps/BlogSearch";
export default {
    name: "TwoColumn",
    components: {
        BlogCardAll,
        BlogContent,
        BlogSearch,
        BlogMenu,
        BlogTags,
        BlogBooks,
    },
};
</script>

<style scoped>
#blog-l {
    width: 900px;
}

#blog-r {
    width: 280px;
    padding: 15px 0;
}

.container {
    width: 1200px;
    margin: 0 auto;
}

.container::before {
    content: "";
    display: block;
    clear: both;
}

.fr {
    float: right;
}

.fl {
    float: left;
}
</style>
