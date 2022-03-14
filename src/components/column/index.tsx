interface IColumnProps {
  children: any;
  actionClass: any;
  title: any;
}

const Column = ({ children, actionClass, title }: IColumnProps) => {
  return (
    <div className={"board-column " + actionClass}>
      <div className="board-column-header">{title}</div>
      {children}
    </div>
  );
};

export default Column;
