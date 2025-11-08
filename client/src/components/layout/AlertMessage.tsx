import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertTitle } from '../ui/alert';

export default function AlertMessage({
  message,
  variant,
}: {
  message: string;
  variant: 'default' | 'destructive';
}) {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
