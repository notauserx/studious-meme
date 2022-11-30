import { FaExternalLinkAlt, FaTrashAlt, FaUserTimes } from "react-icons/fa";
import { Story } from "./types";

const StoryListItem = ({
  item,
  onRemoveItem,
}: {
  item: Story;
  onRemoveItem: (item: Story) => void;
}) => (
  <>
    <div className="story-list-item-container">
      
      <div className="left">
        <div className="header text-blue-700 dark:text-blue-500 font-semibold text-2xl">
          <a href={item.url} target="_blank">{item.title}</a>
        </div>
        <div className="desc text-gray-600 dark:text-gray-100">
          <span>{item.author}</span> {item.num_comments} comments : {item.points} points
        </div>
      </div>
      <div className="flex right m-auto mr-0">
        <a className="mx-3" href={item.url} target="_blank">
          <FaExternalLinkAlt />
        </a>
        <a onClick={() => onRemoveItem(item)}>
          <FaTrashAlt />
        </a>
      </div>
    </div>
  </>
);

export default StoryListItem;