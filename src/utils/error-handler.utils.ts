import ToastUtils from './toast.utils';
export default class ErrorHandlerUtils {
  public static handleError(err: any): void {
    if (err?.error) {
      const errorMessage = err.error?.title || 'Erro desconhecido';
      const errors =
        err.error?.errors?.join(', ') || 'Não há detalhes adicionais';

      ToastUtils.showToast('error', errorMessage, 4000, errors);
    } else {
      ToastUtils.showToast(
        'error',
        'Erro inesperado',
        4000,
        'Ocorreu um erro desconhecido. Tente novamente mais tarde.'
      );
    }
  }
}
