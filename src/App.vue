<template>
    <div>
        <image-screen-shoot :width="400"
             :height="400"
             :url="url"
             @image-info="handleImageInfo">
        </image-screen-shoot>
    </div>
</template>

<script>
    import imageComponent from 'image-screen-shoot-tjc'
    export default {
        components:{
            imageScreenShoot:imageComponent.imageComponent,
        },
        data() {
            return {
                url: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            };
        },
        methods: {
            handleImageInfo(e) {
                console.log(e);
            },
        },
    }
</script>

<style scoped>

</style>
