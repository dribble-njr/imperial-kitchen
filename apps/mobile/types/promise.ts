/* eslint-disable @typescript-eslint/no-explicit-any */

export function makeCancelable<T>(promise: Promise<T>) {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise
      .then((val) => {
        if (isCanceled) {
          // console.info('promise has canceled:', val);
        } else {
          resolve(val);
        }
      })
      .catch((error) => {
        if (isCanceled) {
          // console.info('promise has canceled:', error);
        } else {
          reject(error);
        }
      });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    }
  };
}

export interface MakeCancelableType<T = any> {
  cancel: () => void;
  promise: Promise<T>;
}
