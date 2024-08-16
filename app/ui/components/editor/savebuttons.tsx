type SaveButtonsProps = {
    handleSave: (status: "draft" | "published") => void;
    isSaving: boolean;
};

const SaveButtons: React.FC<SaveButtonsProps> = ({ handleSave, isSaving }) => (
    <div className="mt-6 flex gap-4">
        <button
            onClick={() => handleSave("draft")}
            className={`p-3 text-light-primary bg-light-buttonDefault rounded-lg font-semibold transition-colors duration-300 hover:bg-light-buttonHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium disabled:opacity-50`}
            disabled={isSaving}
        >
            {isSaving ? "Saving..." : "Save as Draft"}
        </button>
        <button
            onClick={() => handleSave("published")}
            className={`p-3 text-light-primary bg-light-accentMedium rounded-lg font-semibold transition-colors duration-300 hover:bg-light-accentDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accentMedium disabled:opacity-50`}
            disabled={isSaving}
        >
            {isSaving ? "Publishing..." : "Publish"}
        </button>
    </div>
);

export default SaveButtons;
