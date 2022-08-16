/**
 * 重置 rem
 */
 class ResetRootREM {
  constructor() {
    this.scale = 1;
    this.width = 3840;
  }

  init = () => {
    const ometa = document.getElementsByName('viewport')[0];
    ometa.content = `width=device-width,initial-scale=${1}`;
  }

  resize() {
    this.width = document.documentElement.clientWidth;
    this.scale = this.width / 1920;
    document.documentElement.style.fontSize = `${this.scale * 100}px`;
    return {
      width: this.width,
      scale: this.width / 1920,
      dpr: window.devicePixelRatio,
    };
  }
}

/**
 * 将数字转化为千分位字符串
 * 若不能转化为数字或无穷大数原样输出
 * @param {T: any} value
 * @returns string | T
 */
const numberSeparatorFormat = (value) => {
  const number = Number(value);
  if (Number.isNaN(number) || !Number.isFinite(number)) {
    console.error('格式化为千分位失败');
    return value;
  }
  return number.toLocaleString('en-US');
};

/**
 * Oject 转化为 FormData
 *
 * @param {Object} data 要转换的 Object
 * @returns {FormData}
 */
const object2FormData = (data) => {
  const fromData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(data)) {
    fromData.set(key, value);
  }
  return fromData;
};

export default {
  ResetRootREM,// rem
  numberSeparatorFormat,// 将数字转化为千分位字符串
  object2FormData,// Oject 转化为 FormData
};
