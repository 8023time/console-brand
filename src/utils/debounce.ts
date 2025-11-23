/**
 * Debounce a function, returns a debounced version with a `cancel` method.
 * 防抖函数，返回带有 `cancel` 方法的防抖版本
 *
 * @example
 * const debounced = debounce((value) => { console.log(value) }, 300);
 * debounced('a');
 * debounced.cancel();
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300, immediate = false) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: any, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(this, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait) as ReturnType<typeof setTimeout>;

    if (callNow) fn.apply(this, args);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
