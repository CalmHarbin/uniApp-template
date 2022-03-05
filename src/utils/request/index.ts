/**
 * uni-request请求封装
 * 1. 统一配置接口地址
 * 2. 统一设置超时时间/报文格式/报文加密
 * 3. 统一身份认证
 * 4. 统一处理登录超时/接口异常提示
 * 5. 统一返回接口格式
 */

type responseType = {
    code: number
    success: boolean
    msg: string
    result: any
}

const request = (config: UniApp.RequestOptions) => {
    let url: string
    if (/^(http|https):\/\/.*/.test(config.url)) {
        // 如果是以http/https开头的则不添加VUE_BASE_URL
        url = config.url
    } else {
        url = import.meta.env.VUE_BASE_URL + config.url
    }
    return new Promise<responseType>((resolve, reject) => {
        uni.request({
            ...config,
            url,
            timeout: config.timeout || 60000,
            success(res) {
                // 200状态码表示成功
                if (res.statusCode === 200) {
                    resolve(res.data as any)
                    return
                }
                /**
                 * 这里可以做一些登录超时/接口异常提示等处理
                 */
                reject(res.data)
            },
            fail(result) {
                reject(result)
            }
        })
    })
}

export default {
    /**
     * get请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    get: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'GET'
        })
    },
    /**
     * post请求
     * @param url 请求地址
     * @param data 请求的参数
     * @param options 其他请求配置
     */
    post: (url: string, data?: UniApp.RequestOptions['data'], options?: UniApp.RequestOptions) => {
        return request({
            ...options,
            url,
            data,
            method: 'POST'
        })
    }
}
