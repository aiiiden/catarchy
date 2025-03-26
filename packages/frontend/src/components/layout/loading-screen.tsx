export default function LoadingScreen() {
  return (
    <div>
      <div className="absolute inset-0 flex items-center justify-center bg-white">
        {/* Spinner */}
        <div className="w-4 h-4 border-4 border-primary animate-spin"></div>
      </div>
    </div>
  );
}
