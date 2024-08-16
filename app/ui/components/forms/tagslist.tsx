

interface TagListProps {
    tags: string[];
    selectedTags: string[];
    onTagClick: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTags, onTagClick }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag: string) => (
          <button
            type="button"
            key={tag}
            onClick={() => onTagClick(tag)}
            className={`p-2 rounded ${
              selectedTags.includes(tag)
                ? "bg-light-accentMedium text-light-primary"
                : "bg-light-accentLight text-light-text"
            } hover:bg-light-accentDark`}
          >
            {tag}
          </button>
        ))}
      </div>
      
    );
};

export default TagList;
