// 时间格式化：正则识别fmt写的日期格式，用date数据替换
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); // RegExp.$1是4个y
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份从0开始
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) { // 补左侧0的函数
  return ('00' + str).substr(str.length);
}

// js正则语法： /正则表达式主体/修饰符(可选)
// test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false

// RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串，以此类推，RegExp.$2，RegExp.$3，..RegExp.$99总共可以有99个匹配
// 当执行任意正则表达式匹配操作时，JavaScript会自动更新全局对象RegExp上的全局属性，用以存储此次正则表达式模式的匹配结果。
// 当再次执行正则表达式匹配时，RegExp上的全局属性又会更新，覆盖掉之前的存储数据，以反映本次正则表达式模式的匹配结果
