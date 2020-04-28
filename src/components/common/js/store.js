export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__; // localStorage 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除。
  if (!seller) { // 如果是第一次存取
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) { // 如果没没保存该商家
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def; // 没有存过东西返回默认值
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def; // 没有存过该id返回默认值
  }
  let ret = seller[key];
  return ret || def; // 如果对应键没有值，也返回默认值
};
