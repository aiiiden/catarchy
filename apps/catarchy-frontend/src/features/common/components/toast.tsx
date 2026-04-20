import { type ToastVariant } from "../stores/toast";

type ToastProps = {
  id: string;
  message: string;
  variant?: ToastVariant;
};

export function ToastItem({ message }: ToastProps) {
  return <div>{message}</div>;
}
