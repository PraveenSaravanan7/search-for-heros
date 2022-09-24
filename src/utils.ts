export const debounce = <F extends (...args: any) => any>(
  func: F,
  waitFor = 500
) => {
  let timeout: NodeJS.Timer | null = null;

  const debounced = (...args: any) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};
