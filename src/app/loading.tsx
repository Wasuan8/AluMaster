export default function Loading() {
    return <div className="container space-y-6 py-20" role="status">
        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
        <div className="h-72 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <span className="sr-only">Loading page</span>
    </div>;
}
