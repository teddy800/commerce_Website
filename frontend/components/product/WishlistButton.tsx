'use client';

import { useWishlistStore } from '@/lib/store/wishlistStore';
import { toast } from '@/components/common/Toast';

interface WishlistButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
  };
  className?: string;
}

export default function WishlistButton({ product, className = '' }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeItem(product.id);
      toast.info('Removed from wishlist');
    } else {
      addItem(product);
      toast.success('Added to wishlist ❤️');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative p-2 rounded-full transition-all ${
        inWishlist
          ? 'bg-red-50 text-red-500'
          : 'bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500'
      } ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        className={`w-6 h-6 transition-transform ${inWishlist ? 'scale-110' : 'group-hover:scale-110'}`}
        fill={inWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      </span>
    </button>
  );
}
