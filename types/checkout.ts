export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  stock: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  type: "home" | "work";
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking" | "cod";
  label: string;
  icon: string;
  processingFee?: number;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  minAmount: number;
}

export interface OrderSummary {
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  processingFee: number;
  total: number;
}

export interface CheckoutState {
  step: number;
  selectedAddressId: string | null;
  selectedPaymentId: string | null;
  appliedPromoCode: PromoCode | null;
}
