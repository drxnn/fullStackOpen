type Props = {
  items: { name: string; exerciseCount: number }[];
};

export default function Content({ items }: Props) {
  return (
    <div>
      {items.map((el, i) => (
        <div key={i}>
          <p>
            {el.name} <br /> {el.exerciseCount}
          </p>
        </div>
      ))}
    </div>
  );
}
