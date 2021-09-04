import { AjaxService } from '../../config/index';
import { networkUrl } from '../../config/Network';

const getListData = (pageNo: number) => {
  return AjaxService({
      method: 'GET',
      url: `${networkUrl}/swyData?pg=${pageNo}`
  })
}

const getOneData = (id: number) => {
  return AjaxService({
    method: 'GET',
    url: `${networkUrl}/swyData/${id}`
})
}

const addData = (data: any) => {
  return AjaxService({
    method: 'POST',
    url: `${networkUrl}/swyData`,
    data
  })
}

const updateOneData = (id: number, data: any) => {
  return AjaxService({
    method: 'POST',
    url: `${networkUrl}/swyData/${id}`,
    data
  })
}

export {
  getListData,
  getOneData,
  addData,
  updateOneData
}