import { AjaxService } from '../../config/index';
import { networkUrl } from '../../config/Network';

// const getOneData = (id: number) => {
//   return AjaxService({
//     method: 'GET',
//     url: `${networkUrl}/swyData/${id}`
//   })
// }

const addData = (data: any) => {
  return AjaxService({
    method: 'POST',
    url: `${networkUrl}/swyData`,
    data
  })
}

export {
  addData
}