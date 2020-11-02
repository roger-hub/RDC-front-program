<template>
    <div class="back_top_container" v-if="backTopBtnFlag" @click="backTop">
        <i class="back_top"></i>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                id: "",
                backTopBtnFlag: false,
            };
        },

        methods: {
			// 点击图片回到顶部方法，加计时器是为了过渡顺滑
			backTop() {
				const that = this
				let timer = setInterval(() => {
					let ispeed = Math.floor(-that.scrollTop / 5)
					document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
					if (that.scrollTop === 0) {
						clearInterval(timer)
					}
				}, 16)
			},

			// 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
			scrollToTop() {
				const that = this
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				that.scrollTop = scrollTop;
				if (that.scrollTop > 0) {
					that.backTopBtnFlag = true;
				} else {
					that.backTopBtnFlag = false;
				}
			}
		},
        
        mounted() {
            window.addEventListener('scroll', this.scrollToTop);
        },
		destroyed() {
			window.removeEventListener('scroll', this.scrollToTop);
		},
    }
</script>

<style scoped>

    .back_top_container {
		position: fixed;
		bottom: 50px;
		right: 50px;
		width: 45px;
		height: 45px;
		border-radius: 50%;
		background-color: #fff;
		border: 1px solid #1693C0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.25s;
	}

	.back_top_container:active{
		background-color: #efefef;
	}

	.back_top_container:hover{
		border-radius: 10px;
	}

	.back_top {
		width: 100%;
		height: 100%;
		background: url(../../assets/icon/up.png) center/40px no-repeat;
	}
    
</style>