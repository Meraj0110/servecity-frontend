import { CartItem, OrderSummary, PromoCode, PaymentMethod } from '@/types/checkout';

export const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

export const calculateOrderSummary = (
  items: CartItem[],
  promoCode: PromoCode | null,
  selectedPayment: PaymentMethod | null
): OrderSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.servicePrice * item.quantity), 0);
  
  let discount = 0;
  if (promoCode && subtotal >= promoCode.minAmount) {
    discount = promoCode.type === 'percentage' 
      ? (subtotal * promoCode.discount) / 100 
      : promoCode.discount;
  }
  
  const deliveryCharges = subtotal > 50000 ? 0 : 200;
  const processingFee = selectedPayment?.processingFee || 0;
  const total = subtotal - discount + deliveryCharges + processingFee;
  
  return { subtotal, discount, deliveryCharges, processingFee, total };
};
