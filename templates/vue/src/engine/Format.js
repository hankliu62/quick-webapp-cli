export default class Format {
  static date = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
    if (!time) {
      // eslint-disable-next-line
      console.warn(`formatDate got first args: ${time}`);
      return format;
    }
    let date;

    try {
      date = new Date(time);
    } catch (e) {
      // eslint-disable-next-line
      console.warn(`formatDate error, when new Date(${time})`);
      return format;
    }
    const oDate = {
      Y: date.getFullYear(),
      M: date.getMonth() + 1,
      D: date.getDate(),
      H: date.getHours(),
      h: date.getHours() % 12,
      m: date.getMinutes(),
      s: date.getSeconds(),
      S: date.getMilliseconds()
    };

    return format.replace(/(Y|M|D|H|h|m|s|S)+/g, (res, key) => {
      let len = 2;

      switch (res.length) {
        case 1:
          len = res.slice(1, 0) === 'Y' ? 4 : 2;
          break;
        case 2:
          len = 2;
          break;
        case 3:
          len = 3;
          break;
        case 4:
          len = 4;
          break;
        default:
          len = 2;
      }
      return (`0${oDate[key]}`).slice(-len);
    });
  }
}
