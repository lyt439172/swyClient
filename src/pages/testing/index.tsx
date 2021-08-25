import React, {useState} from 'react';
// import { RouteComponentProps } from 'react-router';
import { Steps, Image, Result, Button } from 'antd';
import {ResultStatusType} from 'antd/lib/result';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFive from './components/StepFive';
import './styles.scss';

const { Step } = Steps;

const Testing = (props: any) => {
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<{
    status: ResultStatusType,
    title: string,
    subTitle?: string
  }>({status: 'info', title: ''});


  const next = () => {
    if(current === 4) {
      // todo 结束
      setResult({status: 'info', title: '未检出异常', subTitle: '请重新进行逐步检测，确认故障问题'})
    } else {
      setCurrent(current + 1);
    }
  };
  const onError = (reason: string, position: string = '') => {
    console.log('errorInfo:', reason, position)
    // todo 请求接口
    // todo 请求成功后，流程终止
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

  const goToList = () => {
    props.changePath && props.changePath({key: 'testing', path: '/index/testing'})
  }



  return (
    <div className="testing">
      { result.title.length > 0 ? 
        <Result
          extra={[
            <Button type="primary" key="reText" onClick={goToList}>
              重新检测
            </Button>,
            <Button key="goList" onClick={goToList}>查看结果</Button>,
          ]}
          {...result}
        />
        :
        <div>
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
    </div>
    
  )

}

export default Testing;