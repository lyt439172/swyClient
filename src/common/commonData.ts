export const representList = [
    {value: 1, label: "5V灯不亮"},
    {value: 2, label: "12V灯不亮"},
    {value: 3, label: "15V灯不亮"},
    {value: 4, label: "无任何显示"},
    {value: 5, label: "输入电压为0"},
    {value: 6, label: "输入电压超量程"},
    {value: 7, label: "状态等常亮"},
    {value: 8, label: "时钟不准"},
    {value: 9, label: "时钟时走时停"},
    {value: 10, label: "无数据"},
    {value: 11, label: "网络不通"},
    {value: 12, label: "网页打不开"},
    {value: 13, label: "数据无法下载"},
    {value: 0, label: "其他"}
]

export const representMap: {[id: number]: string} = {
    0: '其他',
    1: '5V灯不亮',
    2: '12V灯不亮',
    3: '15V灯不亮',
    4: '无任何显示',
    5: '输入电压为0',
    6: '输入电压超量程',
    7: '状态等常亮',
    8: '时钟不准',
    9: '时钟时走时停',
    10: '无数据',
    11: '网络不通',
    12: '网页打不开',
    13: '数据无法下载'
}