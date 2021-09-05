import React, { useState, useEffect } from 'react';
// import { RouteComponentProps } from 'react-router';
import { Tag, Table, Space, Button } from 'antd';
import SearchForm from './compoments/SreachForm';
import HandleModal from './compoments/HandleModal';
import { representMap } from '../../common/commonData';
import { 
    getListData,
    updateOneData,
    // searchData
} from './http';
import './style.scss';

interface singleDataProps {
    id: number,
    position?: string,
    reason?: string,
    represent?: number,
    representExtra?: string,
    solution?: string,
    status?: number
}

const Tables = (props: any) => {
    const [showHandleModal, setShowHandleModal] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<singleDataProps>({id: 0});
    const [currentPage, setCurrentPage] = useState(1);
    const [listData, setListData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [searchData, setSearchData] = useState<{represent?: number, status?: number}>({})

    useEffect(() => {
        queryListData(1);
    }, [])

    // 获取列表数据
    const queryListData = (pageNo: number) => {
        getListData(pageNo, searchData).then((response: any) => {
            const { allCount = 0, data = [] } = response.data.retobj;
            const newList = data.map((item: any) => {
                const {id, position, reason, represent, representExtra, solution, status} = item;
                return {
                    id,
                    key: id,
                    representDesc: represent > 0 ? representMap[represent] : representMap[represent] + representExtra,
                    position, 
                    reason, 
                    solution, 
                    status
                }
            });
            setListData(newList)
            setTotalCount(allCount)
        })
    }

    // 更新解决方案
    const updateSolution = (solution: string) => {
        const newData = Object.assign({}, currentRecord, {solution, status: 1})
        updateOneData(currentRecord.id, newData).then((response: any) => {
            if(response.status === 200) {
                queryListData(currentPage)
            }
        })
    }

    // 点击“查询”的处理
    const handleSearchClick = (value: any) => {
        const search = {represent: value.selects, status: value.status === 'all' ? undefined : value.status}
        setSearchData({...search})
        getListData(1, search).then((response: any) => {
            const { allCount = 0, data = [] } = response.data.retobj;
            const newList = data.map((item: any) => {
                const {id, position, reason, represent, representExtra, solution, status} = item;
                return {
                    id,
                    key: id,
                    representDesc: represent > 0 ? representMap[represent] : representMap[represent] + representExtra,
                    position, 
                    reason, 
                    solution, 
                    status
                }
            });
            setListData(newList)
            setTotalCount(allCount)
        })
    }

    // 点击页码的处理
    const onPageNoChange = (pageNo: number, psize?: number) => {
        setCurrentPage(pageNo);
        queryListData(pageNo);
    }

    // 点击“去处理”
    const onHandleClick = (record: any) => {
        setCurrentRecord(record);
        setShowHandleModal(true)
    }

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '故障现象',
            dataIndex: 'representDesc',
            key: 'representDesc',
        },
        {
            title: '故障原因',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: '故障位置',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: '解决方案',
            dataIndex: 'solution',
            key: 'solution',
        },
        {
            title: '处理状态',
            key: 'status',
            dataIndex: 'status',
            render: (status: any) => (
                <Tag color={status === 0 ? 'volcano' : 'green'}>
                    {status === 0 ? '未处理' : '已处理'}
                </Tag>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text: any, record: any) => (
                <Space size="middle">
                    {record.status === 0 && <Button type="link" onClick={() => onHandleClick(record)}>去处理</Button>}
                    {false && <Button type="link">查看</Button>}
                </Space>
            ),
        },
    ];

    return (
        <div className="tables">
            <SearchForm onFinish={handleSearchClick}/>
            <Table 
                columns={columns} 
                size={'small'}
                scroll={{ y: 300 }}
                dataSource={listData}
                pagination={{
                    total:totalCount, 
                    pageSize: 10,
                    showSizeChanger: false,
                    onChange: onPageNoChange
                }}/>
            <HandleModal 
                visible={showHandleModal}
                disVisable={() => setShowHandleModal(false)}
                onOk={updateSolution}
            />
        </div>
    )
}
export default Tables;