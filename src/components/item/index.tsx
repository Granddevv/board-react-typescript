import { memo } from "react";
import { useGrid } from "muuri-react";
import { ITask } from "../../context/app.context";
import { Link } from "react-router-dom";

interface IItemProps {
  id: string;
  data: ITask;
}

const Item = memo(({ id, data }: IItemProps) => {
  const gridId = useGrid()?.id?.toLowerCase();

  return (
    <div className="board-item">
      <div className="board-item-content h-full">
        <div className="flex justify-between">
          <span>{data.title} </span>
          <Link to={`/ticket/${data.id}`} className="underline">
            Detail
          </Link>
        </div>
        <div className={`tab-item ${gridId}-tab-item`} />
      </div>
    </div>
  );
});

export default Item;
