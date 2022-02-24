
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'carolli_apexc';

let productsModal = {}; //建議寫在外面可直接呼叫

createApp({
    data(){
        return{
            temp: {
                // 多圖(array)
                imagesUrl: [],
            },
            products: [],
        }
    },
    methods:{
        // 確認是否有登入
        checkLogin(){
            axios.post(`${url}/api/user/check`)
            .then((res)=>{
                // console.log(res);
                // 成功就執行取得資料
                this.getData();
            })
            .catch((err)=>{
                console.dir(err);
                // 錯誤跳出通知
                alert(err.data.message);
            })
        },
        getData(){
            axios.get(`${url}/api/${path}/admin/products`)
            .then(res=>{
                console.log(res.data.products);
                // 成功新增 data 到 products
                this.products = res.data.products;
            }).catch(err=>{
                // 錯誤跳出通知
                alert(err.data.message);
            })
        },
        showProduct(item){
            this.temp = item;
        },
        openModal(){
            productsModal.show();
        }
    },
    mounted(){ //當作 init
        // 取出 token，經過驗證之後才會執行 check
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
        console.log(token);
        productsModal = new bootstrap.Modal(document.getElementById('productModal'));
    }
}).mount('#app');