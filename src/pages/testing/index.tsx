import React, {useState} from 'react';
import { Steps, Image, Result, Button, Modal, Form, Select, Input, message } from 'antd';
import {ResultStatusType} from 'antd/lib/result';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import { representList } from '../../common/commonData';

import './styles.scss';

const { Step } = Steps;
const { Item } = Form;


const Testing = (props: any) => {
  const [form] = Form.useForm();

  const [current, setCurrent] = useState(0); // 当前步骤
  const [result, setResult] = useState<{ // 检测结果
    status: ResultStatusType,
    title: string,
    subTitle?: string
  }>({status: 'info', title: ''});
  const [represent, setRepresent] = useState({info: '', extra: ''}); // 故障现象信息


  const next = () => {
    if(current === 4) {
      setResult({status: 'info', title: '未检出异常', subTitle: '请重新进行逐步检测，确认故障问题'})
    } else {
      setCurrent(current + 1);
    }
  };

  const onError = (reason: string, position: string = '') => {
    console.log('errorInfo:', reason, position, represent)
    // todo 请求接口

    // 请求成功后，流程终止
    setResult({status: 'warning', title: '故障已检出', subTitle: ''})
  }

  const steps = [
    {
      title: '开箱检查',
      content: <StepOne next={next} onError={onError}/>,
    },
    {
      title: '上电检查',
      content: <StepTwo next={next} onError={onError}/>,
    },
    {
      title: '网络检查',
      content: <StepThree next={next} onError={onError}/>,
    },
    {
      title: '芯片检查',
      content: <StepFour next={next} onError={onError}/>,
    },
    {
      title: '拷机测试',
      content: <StepFive next={next} onError={onError}/>,
    }
  ];

  // 跳转数据统计列表菜单
  const goToList = () => {
    props.changePath && props.changePath({key: 'table', path: '/index/table'})
  }

  // 重新加载逐步检测页面
  const reTesting = () => {
    setCurrent(0);
    setResult({status: 'info', title: ''});
    setRepresent({info: '', extra: ''})
  }

  // 确认故障现象
  const onModalOk = () => {
    const data = form.getFieldsValue();
    if(typeof(data.selects) === 'undefined') {
      message.error('请选择故障现象');
    } else {
      setRepresent({info: data.selects, extra: data.extra || ''})
    }
  }


  return (
    <div className="testing">
      { result.title.length > 0 ? 
        <Result
          extra={[
            <Button type="primary" key="reTesting" onClick={reTesting}>
              重新检测
            </Button>,
            <Button key="goList" onClick={goToList}>查看结果</Button>,
          ]}
          {...result}
        />
        :
        <div style={{height: '100%'}}>
          <Steps current={current} size="small">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          {current === 3 && <div className='img-content'>
            <Image src={require('./images/sample.png')} />
          </div>}
        </div>
      }
      <Modal 
        closable={false}
        destroyOnClose={true}
        onCancel={() => {}}
        onOk={onModalOk}
        visible={represent.info.length === 0}
        title="请选择故障现象"
        footer={[<Button key="submit" type="primary" onClick={onModalOk}>确定</Button>]} >
          <Form form={form} preserve={false} >
            <Item name="selects" label="故障现象：" required={true} style={{marginBottom: 12}}>
              <Select
                  placeholder="请选择故障现象"
                  options={representList}
                  >
              </Select>
            </Item>
            <Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.selects !== currentValues.selects}
            >
              { ({ getFieldValue }) => 
              getFieldValue('selects') === 0 ?
                <Item name="extra" label="现象描述：">
                  <Input placeholder="请输入故障现象" />
                </Item>
                : null
            }
            </Item>
            
          </Form>
      </Modal>
    </div>
    
  )

}

export default Testing;