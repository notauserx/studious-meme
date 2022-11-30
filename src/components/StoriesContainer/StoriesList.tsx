import StoryListItem from "./StoryListItem";
import { Story } from "./types";

const StriesList = ({
  list,
  onRemoveItem,
}: {
  list: Story[];
  onRemoveItem: (item: Story) => void;
}) => (
  <>
    <div className="main flex flex-col m-5">
      <div className="header">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stories from the Hacker News api
        </div>
      </div>

      {list.map((item) => (
        <StoryListItem
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  </>
);

export default StriesList;