import { toast } from 'ngx-sonner';

export default class ToastUtils {
  public static showToast(
    type: 'success' | 'error' | 'warning' | 'info' | 'loading',
    title: string,
    timeOutDuration: number = 3000,
    description?: string,
  ) {
    const toastId = toast[type](title, {
      description,
      duration: Infinity,
    });

    ToastUtils.dismissToast(toastId, timeOutDuration);
  }

  private static dismissToast(toastId: number | string, duration: number) {
    setTimeout(() => {
      toast.dismiss(toastId);
    }, duration);
  }
}
