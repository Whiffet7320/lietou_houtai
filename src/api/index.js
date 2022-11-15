import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
import qs from 'qs'
const vue = new Vue()
axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8";
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
})
let myPut = axios.create({
    baseURL: urls.baseUrl,
    method: 'put',
})

myPut.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    config.headers = {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    if (sessionStorage.getItem("token")) {
        // config.headers = {
        //     'token': sessionStorage.getItem("token"),
        // }
        config.headers.token = sessionStorage.getItem("token")
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})

myGet.interceptors.request.use(config => {
    config.headers = {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }
    if (sessionStorage.getItem("token")) {
        // config.headers = {
        //     'token': sessionStorage.getItem("token"),
        // }
        config.headers.token = sessionStorage.getItem("token")
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myPut.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myDelete.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.login,
            data: obj
        })
    },
    user_list(obj) {
        return myGet({
            url: `${urls.user_list}`,
            params: {
                ...obj
            }
        })
    },
    foreignlanguagecategorylist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.foreignlanguagecategorylist,
            data: obj
        })
    },
    add_foreignlanguagecategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.add_foreignlanguagecategory,
            data: obj
        })
    },
    edit_foreignlanguagecategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.edit_foreignlanguagecategory,
            data: obj
        })
    },
    del_foreignlanguagecategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_foreignlanguagecategory,
            data: obj
        })
    },
    industrylist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.industrylist,
            data: obj
        })
    },
    add_industry(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.add_industry,
            data: obj
        })
    },
    edit_industry(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.edit_industry,
            data: obj
        })
    },
    del_industry(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_industry,
            data: obj
        })
    },
    jobcategorylist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.jobcategorylist,
            data: obj
        })
    },
    add_jobcategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.add_jobcategory,
            data: obj
        })
    },
    edit_jobcategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.edit_jobcategory,
            data: obj
        })
    },
    del_jobcategory(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_jobcategory,
            data: obj
        })
    },
    swiperlist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.swiperlist,
            data: obj
        })
    },
    add_swiper(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.add_swiper,
            data: obj
        })
    },
    aliyun_osssts(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.aliyun_osssts,
            data: obj
        })
    },
    edit_swiper(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.edit_swiper,
            data: obj
        })
    },
    del_swiper(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_swiper,
            data: obj
        })
    },
    com_team(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.com_team,
            data: obj
        })
    },
    compaylist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compaylist,
            data: obj
        })
    },
    compayexaminelist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compayexaminelist,
            data: obj
        })
    },
    compayexamineoperation(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compayexamineoperation,
            data: obj
        })
    },
    compayview(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compayview,
            data: obj
        })
    },
    compostlist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compostlist,
            data: obj
        })
    },
    compostoperation(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compostoperation,
            data: obj
        })
    },
    compostcandidatelist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compostcandidatelist,
            data: obj
        })
    },
    memberlist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.memberlist,
            data: obj
        })
    },
    del_member(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_member,
            data: obj
        })
    },
    app_logo(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.app_logo,
            data: obj
        })
    },
    editapp_logo(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.app_logo,
            data: obj
        })
    },
    foreignlang_keyword(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.foreignlang_keyword,
            data: obj
        })
    },
    editforeignlang_keyword(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.foreignlang_keyword,
            data: obj
        })
    },
    post_rank(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.post_rank,
            data: obj
        })
    },
    editpost_rank(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.post_rank,
            data: obj
        })
    },
    vocabulary(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.vocabulary,
            data: obj
        })
    },
    editvocabulary(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.vocabulary,
            data: obj
        })
    },
    com_enterpriseagreement(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.com_enterpriseagreement,
            data: obj
        })
    },
    editcom_enterpriseagreement(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.com_enterpriseagreement,
            data: obj
        })
    },
    com_jobsagreement(obj) {
        obj = qs.stringify(obj)
        return myGet({
            url: urls.com_jobsagreement,
            data: obj
        })
    },
    editcom_jobsagreement(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.com_jobsagreement,
            data: obj
        })
    },
    problemlist(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.problemlist,
            data: obj
        })
    },
    add_problem(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.add_problem,
            data: obj
        })
    },
    edit_problem(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.edit_problem,
            data: obj
        })
    },
    del_problem(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.del_problem,
            data: obj
        })
    },
    compostnavigation_view(obj) {
        obj = qs.stringify(obj)
        return myPost({
            url: urls.compostnavigation_view,
            data: obj
        })
    },
    async productUpload(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'token': `${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_product_pic`, image, configs)
        return `${urls.baseUrl}/${res.data.data.path}`
    },
    async upload_pic(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/admin/upload_pic`, image, configs)
        return res.data
    },
}