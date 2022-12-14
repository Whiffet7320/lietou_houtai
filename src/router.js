import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.config.productionTip = false;


const routes = [{
        path: '/',
        name: 'Home',
        component: () => import('./components/Home'),
        children: [{
            path: 'Shouye',
            name: 'Shouye',
            component: () => import('./components/Home/Shouye'),
        }, ]
    }, {
        path: '/Fenlei',
        name: 'Fenlei',
        component: () => import('./components/Fenlei'),
        children: [{
            path: 'Waiyuzhonglei',
            name: 'Waiyuzhonglei',
            component: () => import('./components/Fenlei/Waiyuzhonglei'),
        },{
            path: 'Hangyefenlei',
            name: 'Hangyefenlei',
            component: () => import('./components/Fenlei/Hangyefenlei'),
        },{
            path: 'Gangweifenlei',
            name: 'Gangweifenlei',
            component: () => import('./components/Fenlei/Gangweifenlei'),
        }]
    }, {
        path: '/Guanggao',
        name: 'Guanggao',
        component: () => import('./components/Guanggao'),
        children: [{
            path: 'Guanggaoguanli',
            name: 'Guanggaoguanli',
            component: () => import('./components/Guanggao/Guanggaoguanli'),
        }]
    },{
        path: '/Lieqi',
        name: 'Lieqi',
        component: () => import('./components/Lieqi'),
        children: [{
            path: 'Lieqichengyuan',
            name: 'Lieqichengyuan',
            component: () => import('./components/Lieqi/Lieqichengyuan'),
        },{
            path: 'Lieqiliebiao',
            name: 'Lieqiliebiao',
            component: () => import('./components/Lieqi/Lieqiliebiao'),
        },{
            path: 'Lieqishenheliebiao',
            name: 'Lieqishenheliebiao',
            component: () => import('./components/Lieqi/Lieqishenheliebiao'),
        }]
    }, {
        path: '/Peizhi',
        name: 'Peizhi',
        component: () => import('./components/Peizhi'),
        children: [{
            path: 'LOGO',
            name: 'LOGO',
            component: () => import('./components/Peizhi/LOGO'),
        },{
            path: 'Waiyu',
            name: 'Waiyu',
            component: () => import('./components/Peizhi/Waiyu'),
        },{
            path: 'Gangweizhiji',
            name: 'Gangweizhiji',
            component: () => import('./components/Peizhi/Gangweizhiji'),
        },{
            path: 'Mingganci',
            name: 'Mingganci',
            component: () => import('./components/Peizhi/Mingganci'),
        },{
            path: 'LTyonghuxieyi',
            name: 'LTyonghuxieyi',
            component: () => import('./components/Peizhi/LTyonghuxieyi'),
        },{
            path: 'QZyonghuxieyi',
            name: 'QZyonghuxieyi',
            component: () => import('./components/Peizhi/QZyonghuxieyi'),
        },{
            path: 'Wenti',
            name: 'Wenti',
            component: () => import('./components/Peizhi/Wenti'),
        }]
    },{
        path: '/Yonghu',
        name: 'Yonghu',
        component: () => import('./components/Yonghu'),
        children: [{
            path: 'Yonghuguanli',
            name: 'Yonghuguanli',
            component: () => import('./components/Yonghu/Yonghuguanli'),
        }]
    }, {
        path: '/Dingdan',
        name: 'Dingdan',
        component: () => import('./components/Dingdan'),
        children: [{
            path: 'Dingdanguanli',
            name: 'Dingdanguanli',
            component: () => import('./components/Dingdan/Dingdanguanli'),
        },{
            path: 'Tixianliebiao',
            name: 'Tixianliebiao',
            component: () => import('./components/Dingdan/Tixianliebiao'),
        }]
    }, {
        path: '/Xiaoyuanbiaobai',
        name: 'Xiaoyuanbiaobai',
        component: () => import('./components/Xiaoyuanbiaobai'),
        children: [{
            path: 'Biaobaiqiang',
            name: 'Biaobaiqiang',
            component: () => import('./components/Xiaoyuanbiaobai/Biaobaiqiang'),
        }]
    }, {
        path: '/Xiaoyuanjishi',
        name: 'Xiaoyuanjishi',
        component: () => import('./components/Xiaoyuanjishi'),
        children: [{
            path: 'Bangbangshougou',
            name: 'Bangbangshougou',
            component: () => import('./components/Xiaoyuanjishi/Bangbangshougou'),
        }, {
            path: 'Bangbangzhuanmai',
            name: 'Bangbangzhuanmai',
            component: () => import('./components/Xiaoyuanjishi/Bangbangzhuanmai'),
        }]
    }, {
        path: '/Xiaoyuanshudong',
        name: 'Xiaoyuanshudong',
        component: () => import('./components/Xiaoyuanshudong'),
        children: [{
            path: 'Shudongliebiao',
            name: 'Shudongliebiao',
            component: () => import('./components/Xiaoyuanshudong/Shudongliebiao'),
        }]
    }, {
        path: '/Xiaoyuanyijiao',
        name: 'Xiaoyuanyijiao',
        component: () => import('./components/Xiaoyuanyijiao'),
        children: [{
            path: 'Bangbangbaoxiu',
            name: 'Bangbangbaoxiu',
            component: () => import('./components/Xiaoyuanyijiao/Bangbangbaoxiu'),
        }, {
            path: 'Xiaoyuanfengjing',
            name: 'Xiaoyuanfengjing',
            component: () => import('./components/Xiaoyuanyijiao/Xiaoyuanfengjing'),
        }]
    }, {
        path: '/Shiwuzhaoling',
        name: 'Shiwuzhaoling',
        component: () => import('./components/Shiwuzhaoling'),
        children: [{
            path: 'Bangbangxunwu',
            name: 'Bangbangxunwu',
            component: () => import('./components/Shiwuzhaoling/Bangbangxunwu'),
        }, {
            path: 'Bangbangxunzhu',
            name: 'Bangbangxunzhu',
            component: () => import('./components/Shiwuzhaoling/Bangbangxunzhu'),
        }]
    }, {
        path: '/Xiaoyuanpindan',
        name: 'Xiaoyuanpindan',
        component: () => import('./components/Xiaoyuanpindan'),
        children: [{
            path: 'Bangbangpinche',
            name: 'Bangbangpinche',
            component: () => import('./components/Xiaoyuanpindan/Bangbangpinche'),
        }, {
            path: 'Bangbangpindan',
            name: 'Bangbangpindan',
            component: () => import('./components/Xiaoyuanpindan/Bangbangpindan'),
        }]
    },
    // 
    {
        path: '/Wenzhang',
        name: 'Wenzhang',
        component: () => import('./components/Wenzhang'),
        children: [{
            path: 'Wenzhangliebiao',
            name: 'Wenzhangliebiao',
            component: () => import('./components/Wenzhang/Wenzhangliebiao'),
        }, {
            path: 'Tianjiawenzhang',
            name: 'Tianjiawenzhang',
            component: () => import('./components/Wenzhang/Tianjiawenzhang'),
        }]
    }, {
        path: '/Qita',
        name: 'Qita',
        component: () => import('./components/Qita'),
        children: [{
            path: 'Fankuiliebiao',
            name: 'Fankuiliebiao',
            component: () => import('./components/Qita/Fankuiliebiao'),
        }, {
            path: 'Chengshiliebiao',
            name: 'Chengshiliebiao',
            component: () => import('./components/Qita/Chengshiliebiao'),
        }, {
            path: 'Gudingweizhi',
            name: 'Gudingweizhi',
            component: () => import('./components/Qita/Gudingweizhi'),
        }, {
            path: 'Gudingweizhishangping',
            name: 'Gudingweizhishangping',
            component: () => import('./components/Qita/Gudingweizhishangping'),
        }, {
            path: 'Jiangpingliebiao',
            name: 'Jiangpingliebiao',
            component: () => import('./components/Qita/Jiangpingliebiao'),
        }, {
            path: 'Zhongjiangliebiao',
            name: 'Zhongjiangliebiao',
            component: () => import('./components/Qita/Zhongjiangliebiao'),
        }, ]
    }, {
        path: '/Shezhi',
        name: 'Shezhi',
        component: () => import('./components/Shezhi'),
        children: [{
            path: 'Xiaoxiguanli',
            name: 'Xiaoxiguanli',
            component: () => import('./components/Shezhi/Xiaoxiguanli'),
        }, {
            path: 'Qitashezhi',
            name: 'Qitashezhi',
            component: () => import('./components/Shezhi/Qitashezhi'),
        }, {
            path: 'Lunbotushezhi',
            name: 'Lunbotushezhi',
            component: () => import('./components/Shezhi/Lunbotushezhi'),
        }, {
            path: 'Lunbotuliebiao',
            name: 'Lunbotuliebiao',
            component: () => import('./components/Shezhi/Lunbotuliebiao'),
        }, {
            path: 'Kaipinyeshezhi',
            name: 'Kaipinyeshezhi',
            component: () => import('./components/Shezhi/Kaipinyeshezhi'),
        }, {
            path: 'Shujuzhongxin',
            name: 'Shujuzhongxin',
            component: () => import('./components/Shezhi/Shujuzhongxin'),
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})


export default router