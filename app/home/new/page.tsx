
import ContentEditor from "@/app/ui/components/editor/contenteditor";
import {Header} from "@/app/ui/components/general/basicheader";


export const dynamic = 'force-dynamic';
export default function CreatePage() {
    return (
        <div>
        <Header />
            <ContentEditor />
        </div>
    );
}