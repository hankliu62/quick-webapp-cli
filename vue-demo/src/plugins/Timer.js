export default class Timer {
  static setAccurateInterval = (func, interval, totalTime, timeoutRef = {}) => {
    let continueInterval = true;
    const startTimestamp = new Date().getTime();
    let remainingTime = totalTime;
    let count = 0;

    const clearHandle = () => {
      clearTimeout(timeoutRef.id);
      // eslint-disable-next-line
      timeoutRef.id = null;
      continueInterval = false;
    };

    const intervalFunc = () => {
      count += 1;
      const offset = new Date().getTime() - (startTimestamp + (count * interval));
      const nextime = Math.max(interval - offset, 0);

      remainingTime -= interval;
      if (continueInterval && remainingTime > 0) {
        func();
        // eslint-disable-next-line
        timeoutRef.id = setTimeout(intervalFunc, nextime);
      } else {
        clearHandle();
      }
    };

    // eslint-disable-next-line
    timeoutRef.id = setTimeout(intervalFunc, interval);

    return clearHandle;
  }

  static clearInterval = clearHandle => {
    if (clearHandle) {
      clearHandle();
    }
  }

  static setInterval = (func, interval, timeoutRef = {}) => {
    let continueInterval = true;

    const intervalFunc = () => {
      if (continueInterval) {
        if (func.length > 0) {
          const next = () => { setTimeout(intervalFunc, interval); };

          func(next);
        } else {
          func();
          setTimeout(intervalFunc, interval);
        }
      }
    };

    // eslint-disable-next-line
    timeoutRef.id = setTimeout(intervalFunc, interval);

    const clearHandle = () => {
      clearTimeout(timeoutRef.id);
      continueInterval = false;
    };

    return clearHandle;
  }

  static clearInterval = clearHandle => {
    if (clearHandle) {
      clearHandle();
    }
  }
}
