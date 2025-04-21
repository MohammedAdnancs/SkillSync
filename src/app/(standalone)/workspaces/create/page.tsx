import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspaces-form";

export const dynamic = 'force-dynamic';

export default function WorkspaceCreatePage() {
    return (
        <div className="w-full lg:max-w-xl">
            <CreateWorkspaceForm /> 
        </div>
    )
}