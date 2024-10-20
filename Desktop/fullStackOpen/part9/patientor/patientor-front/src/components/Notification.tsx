type Props = {
  message: string;
};

export default function Notification({ message }: Props) {
  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}
