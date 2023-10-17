import React from "react";
interface Props {
  title: string;
  user?: object;
  description: string;
  status: string;
  className?: string;
}
const TaskCard: React.FC<Props> = ({
  title,
  user,
  description,
  status,
  className,
}) => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{status}</p>
    </div>
  );
};

export default TaskCard;
