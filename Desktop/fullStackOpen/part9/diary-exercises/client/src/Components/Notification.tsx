type NotificationProps = {
  error: string;
};

export default function Notification({ error }: NotificationProps) {
  return (
    <div>
      <h2 style={{ color: "red" }}>{error}</h2>
    </div>
  );
}
