import React, {useState} from 'react';
import { Button, Steps, Form, Input, Row, Col } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import '../../styles.scss';

const {Step} = Steps;

const checkInfo: {[id: number]: any} = {
    1: {reason: '电源板故障', title: '请按照箭头方向依次测量电源模块红色点之间的的电压，电压量程（0-20V），是否为12V？'},
    2: {reason: '主板故障', title: '请按照箭头方向依次测量主板模块黄色点与公共区域之间的电压，电压量程（0-20V），是否为-12V？'},
    3: {reason: '主板故障', title: '请依次测量主板模块蓝色芯片与公共区域之间的电压，电压量程（0-20V），是否为5V？'},
    4: {reason: '主板故障', title: '请用示波器测量主板模板绿色两点之间的波形，是否为正弦波？'},
    5: {reason: '连接线或链接头故障', title: '请按照箭头方向依次测量主板模块橙色远点之间的电压，电压量程（0-20V），是否为12V？'},
    6: {reason: '连接线或链接头故障', title: '请按照箭头方向依次测量紫色点之间的的电压，电压量程（0-20V），是否为5V？'},
    7: {reason: 'AD板故障', title: '请使用万用表测量AD模块蓝色芯片，1.2引脚与2.3引脚之间的电压，电压量程（0-20V），是否为1.2=20V，2.3=-15V？'},
    8: {reason: 'AD板故障', title: '请用示波器测量AD模板绿色两点之间的波形，是否为正弦波？'},
    9: {reason: 'AD板故障', title: '请使用万用表测量AD模块黄色芯片与公共区域之间的电压，电压量程（0-20V），是否为-5V？'},
    10: {reason: '连接线或链接头故障', title: '请按照箭头方向测量紫色方形之间的的电压，电压量程（0-20V），是否为5V？'}
}

const StepFour = (props: any) => {
    const [myCurrent, setMyCurrent] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const {next, onError} = props;

    const handleNoErr = () => {
        setShowInput(false);
        if(myCurrent !== 9) {
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
        <Steps current={myCurrent} direction="vertical"  className="step-content">
            <Step key={'4_1'} icon={<AimOutlined />} title="Step 1" description={descDom(1)} />
            <Step key={'4_2'} icon={<AimOutlined />} title="Step 2" description={descDom(2)} />
            <Step key={'4_3'} icon={<AimOutlined />} title="Step 3" description={descDom(3)} />
            <Step key={'4_4'} icon={<AimOutlined />} title="Step 4" description={descDom(4)} />
            <Step key={'4_5'} icon={<AimOutlined />} title="Step 5" description={descDom(5)} />
            <Step key={'4_6'} icon={<AimOutlined />} title="Step 6" description={descDom(6)} />
            <Step key={'4_7'} icon={<AimOutlined />} title="Step 7" description={descDom(7)} />
            <Step key={'4_8'} icon={<AimOutlined />} title="Step 8" description={descDom(8)} />
            <Step key={'4_9'} icon={<AimOutlined />} title="Step 9" description={descDom(9)} />
            <Step key={'4_10'} icon={<AimOutlined />} title="Step 10" description={descDom(10)} />
        </Steps>
    )
}

export default StepFour;