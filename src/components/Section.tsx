import { ReactNode } from "react";
import Title from "./Title";

interface SectionProps<T> {
  title: string;
  items: T[] | undefined;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

const Section = <T,>({ title, items, renderItem, className = "mt-4 break-inside-avoid" }: SectionProps<T>) => {
  if (!items || items.length === 0) return null;
  return (
    <div className={className}>
      <Title title={title} />
      {items.map((item, i) => renderItem(item, i))}
    </div>
  );
};

export default Section;
