type Props = {
  message: string;
};

export function FormMessage({ message }: Props) {
  return <p className="text-red-600 text-sm ml-1">{message}</p>;
}
