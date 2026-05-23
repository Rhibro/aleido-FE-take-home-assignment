interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Something went wrong. Please try again." }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px] rounded-lg bg-red-50 border border-red-200 px-6">
      <div className="text-center">
        <p className="text-red-800 font-medium">{message}</p>
      </div>
    </div>
  );
}
