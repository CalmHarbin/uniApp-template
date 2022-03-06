import Mock from 'mockjs'

// 基于我们制定的规则，这里必须做下判断，这个很重要。
if (/\/mock$/.test(import.meta.env.VITE_REQUEST_BASE_URL)) {
    Mock.mock(`${import.meta.env.VITE_REQUEST_BASE_URL}/getUserInfo`, {
        code: 200,
        success: true,
        msg: '',
        result: {
            name: Mock.Random.cname()
        }
    })
}
