export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center p-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-[var(--text-soft)]">The page you are looking for does not exist.</p>
        <a className="btn btn-primary inline-flex mt-2 text-white" href="/">
          Go back home
        </a>
      </div>
    </div>
  );
}
