import { toast } from 'ngx-sonner';

export default class ErrorHandlerUtils {
  public static handleError(err: any): void {
    if (err?.error) {
      const errorMessage = err.error?.Message || 'Erro desconhecido';
      const statusCode = err.error?.StatusCode || 'Desconhecido';
      const errors =
        err.error?.Errors?.join(', ') || 'Não há detalhes adicionais';

      toast.error(`${errorMessage} (Código: ${statusCode})`, {
        description: errors,
        duration: 4000,
      });
    } else {
      toast.error('Erro inesperado', {
        description:
          'Ocorreu um erro desconhecido. Tente novamente mais tarde.',
        duration: 4000,
      });
    }
  }
}
