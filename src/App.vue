<template>
    <div>
        <ss :width="400"
             :height="400"
             :url="url"
             @image-info="handleImageInfo"></ss>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                url: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
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
