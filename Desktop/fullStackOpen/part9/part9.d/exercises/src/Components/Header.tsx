type Props = {
  name: string;
};

export default function Header(props: Props) {
  return <div>{props.name}</div>;
}
