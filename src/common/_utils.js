// 格式化时间至年月日
export function fmtTime(str) {
  const data = new Date(str)
  const year = data.getFullYear()
  let month = data.getMonth() + 1
  if (month < 10) month = '0' + month
  let day = data.getDate()
  if (day < 10) day = '0' + day
  return year + '-' + month + '-' + day
}

// 删除html标签和空格
export function deleteHTMLTag(ele) {
  return ele.replace(/<[^>]+>/g, '').replace(/&nbsp;/ig, '').replace(/\s*/g, '')
}

//
export function handleLists(obj) {
  for (const i in obj) {
    if (i === 'class_') {
      obj[i] = obj[i].replace(/\"/g, '')
    }
  }
  return obj
}
