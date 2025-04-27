import OsName from "../components/OsName";

export function ProjectsPage() {
    return (
        <div class="px-4 sm:px-6 lg:px-8 py-8">
            <OsName />
            <div class="sm:flex sm:items-center mb-6">
                <div class="sm:flex-auto">
                    <h1 class="text-base font-semibold leading-6 text-gray-900">
                        Projects
                    </h1>
                    <p class="mt-1 text-sm text-gray-700">
                        List of all projects.
                    </p>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        onClick={() => alert("Add Project Clicked!")}
                        type="button"
                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Project
                    </button>
                </div>
            </div>

            {/* TODO: add table */}
        </div>
    );
}
