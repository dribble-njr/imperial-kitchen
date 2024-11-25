/* eslint-disable @typescript-eslint/no-explicit-any */

import { makeCancelable, MakeCancelableType } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';

export enum AsyncFunctionStatus {
  Init,
  Pending,
  Success,
  Error
}

export interface AsyncResponse<T = unknown> {
  execute: () => Promise<void>;
  backgroundExecute: () => Promise<void>;
  status: AsyncFunctionStatus;
  result: T | null;
  error: Error | null;
  loading: boolean;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  callbackOption?: {
    onStart?: () => void;
    onSuccess?: (result: T) => void;
    onError?: (err: any) => void;
    onFinally?: () => void;
  }
): AsyncResponse<T> {
  const [status, setStatus] = useState(AsyncFunctionStatus.Init);
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(!!immediate);

  const promiseRef = useRef<MakeCancelableType<T> | null>(null);

  const callbackOptionRef = useRef(callbackOption);
  callbackOptionRef.current = callbackOption;

  useEffect(() => {
    return () => {
      promiseRef.current?.cancel();
    };
  }, []);

  // The execute function wraps asyncFunction and
  // handles setting state for pending, result, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus(AsyncFunctionStatus.Pending);
    setLoading(true);
    setResult(null);
    setError(null);
    promiseRef.current?.cancel();
    promiseRef.current = makeCancelable(asyncFunction());
    callbackOptionRef.current?.onStart?.();
    return promiseRef.current.promise
      .then((response) => {
        setResult(response);
        setStatus(AsyncFunctionStatus.Success);
        callbackOptionRef.current?.onSuccess?.(response);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setStatus(AsyncFunctionStatus.Error);
        callbackOptionRef.current?.onError?.(err);
      })
      .finally(() => {
        setLoading(false);
        callbackOptionRef.current?.onFinally?.();
      });
  }, [asyncFunction]);

  const backgroundExecute = useCallback(() => {
    setStatus(AsyncFunctionStatus.Pending);
    promiseRef.current?.cancel();
    promiseRef.current = makeCancelable(asyncFunction());
    callbackOptionRef.current?.onStart?.();
    return promiseRef.current.promise
      .then((response) => {
        setResult(response);
        setError(null);
        setStatus(AsyncFunctionStatus.Success);
        callbackOptionRef.current?.onSuccess?.(response);
      })
      .catch((err) => {
        console.error(err);
        setResult(null);
        setError(err);
        setStatus(AsyncFunctionStatus.Error);
        callbackOptionRef.current?.onError?.(err);
      })
      .finally(() => {
        callbackOptionRef.current?.onFinally?.();
      });
  }, [asyncFunction]);

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, result, error, loading, backgroundExecute };
}
