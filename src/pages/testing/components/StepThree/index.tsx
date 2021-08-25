import React, {useState} from 'react';
import { Button, Steps, Form, Input, Row, Col } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import '../../styles.scss';

const {Step} = Steps;

const checkInfo: {[id: number]: any} = {
    1: {reason: '网络配置错误', title: '与电脑直连，通过ping命令测试网络是否通？'},
    2: {reason: '网络接口板故障', title: "PC机登录仪器网页，检查仪器网页登录是否正常？"},
    3: {reason: '网络故障', title: "网页参数配置及数据下载功能是否正常？"}
}

const StepThree = (props: any) => {
    const [myCurrent, setMyCurrent] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const {next, onError} = props;

    const handleNoErr = () => {
        setShowInput(false);
        if(myCurrent !== 2) {
            setMyCurrent(myCurrent + 1)
        } else {
            next();
        }
    }

    const handleSubmit = (values: any) => {
        onError(checkInfo[myCurrent + 1].reason, values.position || '')
    }

    const descDom = (index: number) => (
        <div className="desc-container">
            <div>{checkInfo[index].title}</div>
            {(myCurrent + 1 === index)  && <div>
                <Row style={{margin: '12px 0'}}>
                    <Col span={4}><Button type="primary" onClick={handleNoErr}>否</Button></Col>
                    <Col span={4}><Button onClick={() => {setShowInput(true)}}>是</Button></Col>
                </Row>
                {showInput && 
                    <Form onFinish={handleSubmit}>
                        <Row>
                            <Col span={12}>
                                <Form.Item name="position" label={'故障位置：'}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={2}>
                                <Button type="primary" htmlType="submit">提交</Button>
                            </Col>
                        </Row>
                    </Form>
                }
            </div>}
            
        </div>
    )
    return (
        <div>
            <Steps current={myCurrent} direction="vertical" className="step-content">
                <Step key={'3_1'} icon={<AimOutlined />} title="Step 1" description={descDom(1)} />
                <Step key={'3_2'} icon={<AimOutlined />} title="Step 2" description={descDom(2)} />
                <Step key={'3_3'} icon={<AimOutlined />} title="Step 3" description={descDom(3)} />
            </Steps>
        </div>
    )
}

export default StepThree;