import { Card, Form, Input, Checkbox, Button, message } from 'antd'
import { useNavigate } from "react-router-dom"
import { gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'
//导入样式文件
import './index.scss'
//import { useStore } from "../../store"


const Login = () => {
    //const { loginStore } = useStore()
    const navigate = useNavigate()
    const client = new ApolloClient({
        uri: 'http://localhost:3000/graphql',
        cache: new InMemoryCache(),
    })
    async function onFinish (values) {
        console.log(values)
        //values:放置的是所有表单项中用户输入的内容
        //todo:登录
        const GET_USERS = gql`
            query  GetUserByAccount($account: String!){
                getUserByUsername(username: $account)  {
                username
                password
                }
            }
            `
        let countvalue = values.username
        let coutpassword = values.password
        console.log(countvalue)
        console.log(coutpassword)
        client
            .query({
                query: GET_USERS,
                variables: {
                    account: countvalue,
                },
            })
            .then((response) => {
                console.log(response.data)
                //console.log(response.data.getUserByUsername.password)
                if (response.data.getUserByUsername == null) {
                    message.error("该用户未注册")
                } else if (coutpassword === response.data.getUserByUsername.password && countvalue === response.data.getUserByUsername.username) {
                    console.log('登录成功')
                    //跳转首页
                    navigate('/', { replace: true })
                    //提示用户
                    message.success('登录成功')
                } else {
                    message.error('密码错误')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className="login">
            <Card className="login-container">

                {/* 登录表单 */}
                {/*子项用到的触发事件 需要在Form中都声明一下才可以*/}
                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur'
                            }
                        ]}>
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                len: 6,
                                message: '请输入6位密码',
                                validateTrigger: 'onBlur'
                            }
                        ]}>
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox className="login-checkbox-label">
                            我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
