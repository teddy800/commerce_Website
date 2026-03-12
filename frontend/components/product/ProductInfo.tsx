interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
}

export default function ProductInfo({ title, description, price }: ProductInfoProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100); // Price is in cents

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-3xl font-bold text-gray-900">{formattedPrice}</p>
      </div>

      {description && (
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>{description}</p>
        </div>
      )}

      <div className="border-t pt-4">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-700">In Stock</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            <span className="text-gray-700">Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
