import imageComponent from  './imageScreenShoot.vue';

const image =  {
    install(Vue){
        console.log('install vue is :')
        console.log(Vue);
        Vue.component('imageScreenShoot',imageComponent);
    }

};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(imageComponent);
}



export default {
    image,
    imageComponent
};
