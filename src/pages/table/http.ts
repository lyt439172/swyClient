import { AjaxService } from '../../config/index';
import { networkUrl } from '../../config/Network';

const getListData = (pageNo: number, searchData: any) => {
  const dataString = JSON.stringify(searchData).length > 2 ? `&data=${JSON.stringify(searchData)}` : ''
  return AjaxService({
      method: 'GET',
      url: `${networkUrl}/findData?pg=${pageNo}${dataString}`
  })
}

const updateOneData = (id: number, data: any) => {
  return AjaxService({
    method: 'POST',
    url: `${networkUrl}/swyData/${id}`,
    data
  })
}

// const searchData = (represent: string) => {
//   return AjaxService({
//     method: 'POST',
//     url: `${networkUrl}/find`,
//     data: {represent}
//   })
// }

export {
  getListData,
  updateOneData,
}