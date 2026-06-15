interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => (
  <p className="min-h-5 text-sm text-red-500">{message}</p>
);
