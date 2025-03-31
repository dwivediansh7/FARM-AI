export default function StaticPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">Static Test Page</h1>
      <p className="mt-4">
        This is a simple static page to test if Next.js can serve content without middleware.
      </p>
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">
          Return to home
        </a>
      </div>
    </div>
  );
} 