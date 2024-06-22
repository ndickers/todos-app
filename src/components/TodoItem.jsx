import deleteBtn from "../assets/images/icon-cross.svg";
import checked from "../assets/images/icon-check.svg";
export default function TodoItem({
  content,
  id,
  isChecked,
  onDelete,
  dispatchChecked,
}) {
  function handleCheckClick() {
    dispatchChecked({ type: "check", itemId: id });
  }

  return (
    <div className="todo-div">
      <div>
        <button
          onClick={handleCheckClick}
          className={`btns ${isChecked && "btn-check"}`}
        >
          <img src={isChecked ? checked : ""} alt="" />
        </button>
        <p className={isChecked ? "check-through" : ""}>{content}</p>
      </div>
      <button className="delete-btn" onClick={() => onDelete(id)}>
        <img src={deleteBtn} alt="" />
      </button>
    </div>
  );
}
