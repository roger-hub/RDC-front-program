// 格式化时间至年月日
export function fmtTime(str) {
  const data = new Date(str);
  if (isNaN(data)) return '未知'
  const year = data.getFullYear();
  let month = data.getMonth() + 1
  if (month < 10) month = '0' + month
  let day = data.getDate()
  if (day < 10) day = '0' + day
  const tm = {
    year,
    month,
    day
  };
  return tm;
}

// 删除html标签和空格
export function deleteHTMLTag(ele) {
  return ele.replace(/<[^>]+>/g, "").replace(/&nbsp;/ig, "").replace(/\s*/g, "");
}
