import { create } from 'zustand';
import { BookingState, Service, Product, Address, DeliveryType } from '@/types';

interface BookingStore extends BookingState {
  currentStep: number;
  
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetBooking: () => void;
  
  // Service selection
  setSelectedService: (service: Service | null) => void;
  
  // Item management
  addItem: (product: Product, service: Service) => void;
  removeItem: (productId: number, serviceId: number) => void;
  updateItemQuantity: (productId: number, serviceId: number, quantity: number) => void;
  clearItems: () => void;
  
  // Booking details
  setDeliveryType: (type: DeliveryType) => void;
  setPickupDate: (date: Date | null) => void;
  setAddress: (address: Address | null) => void;
  setNeedsPickup: (needs: boolean) => void;
  setNeedsDelivery: (needs: boolean) => void;
  
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  canProceed: () => boolean;
}

const initialBookingState: BookingState = {
  selectedService: null,
  selectedItems: [],
  deliveryType: 'standard',
  pickupDate: null,
  address: null,
  needsPickup: false,
  needsDelivery: false,
};

export const useBookingStore = create<BookingStore>()((set, get) => ({
  ...initialBookingState,
  currentStep: 0,
  
  // Navigation
  nextStep: () => {
    const { currentStep, canProceed } = get();
    if (canProceed() && currentStep < 4) {
      set({ currentStep: currentStep + 1 });
    }
  },
  
  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  goToStep: (step) => set({ currentStep: step }),
  
  resetBooking: () => set({ ...initialBookingState, currentStep: 0 }),
  
  // Service selection
  setSelectedService: (service) => set({ selectedService: service }),
  
  // Item management
  addItem: (product, service) => {
    const { selectedItems } = get();
    const existingItemIndex = selectedItems.findIndex(
      item => item.product.id === product.id && item.service.id === service.id
    );
    
    if (existingItemIndex >= 0) {
      const newItems = [...selectedItems];
      newItems[existingItemIndex].quantity += 1;
      set({ selectedItems: newItems });
    } else {
      set({
        selectedItems: [...selectedItems, { product, service, quantity: 1 }]
      });
    }
  },
  
  removeItem: (productId, serviceId) => {
    const { selectedItems } = get();
    set({
      selectedItems: selectedItems.filter(
        item => !(item.product.id === productId && item.service.id === serviceId)
      )
    });
  },
  
  updateItemQuantity: (productId, serviceId, quantity) => {
    const { selectedItems } = get();
    if (quantity <= 0) {
      get().removeItem(productId, serviceId);
      return;
    }
    
    const newItems = selectedItems.map(item => {
      if (item.product.id === productId && item.service.id === serviceId) {
        return { ...item, quantity };
      }
      return item;
    });
    set({ selectedItems: newItems });
  },
  
  clearItems: () => set({ selectedItems: [] }),
  
  // Booking details
  setDeliveryType: (type) => set({ deliveryType: type }),
  setPickupDate: (date) => set({ pickupDate: date }),
  setAddress: (address) => set({ address }),
  setNeedsPickup: (needs) => set({ needsPickup: needs }),
  setNeedsDelivery: (needs) => set({ needsDelivery: needs }),
  
  // Computed values
  getTotalItems: () => {
    const { selectedItems } = get();
    return selectedItems.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    const { selectedItems } = get();
    return selectedItems.reduce((total, item) => {
      return total + (parseFloat(item.product.unit_price) * item.quantity);
    }, 0);
  },
  
  canProceed: () => {
    const { currentStep, selectedItems, pickupDate, address } = get();
    
    switch (currentStep) {
      case 0: // Service selection
        return selectedItems.length > 0;
      case 1: // Item selection
        return selectedItems.length > 0;
      case 2: // Address selection
        return address !== null;
      case 3: // Date/time selection
        return pickupDate !== null;
      case 4: // Review
        return true;
      default:
        return false;
    }
  },
}));
