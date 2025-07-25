// src/store/address.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Address } from '@/types';

interface AddressState {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (address: Address) => void;
  updateAddress: (id: number, address: Address) => void;
  deleteAddress: (id: number) => void;
  setSelectedAddress: (address: Address | null) => void;
  getMainAddress: () => Address | null;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddress: null,
      
      addAddress: (address) => {
        const newAddress = { ...address, id: Date.now() };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
          selectedAddress: state.addresses.length === 0 ? newAddress : state.selectedAddress,
        }));
      },
      
      updateAddress: (id, updatedAddress) => {
        set((state) => ({
          addresses: state.addresses.map(addr => 
            addr.id === id ? { ...updatedAddress, id } : addr
          ),
          selectedAddress: state.selectedAddress?.id === id 
            ? { ...updatedAddress, id } 
            : state.selectedAddress,
        }));
      },
      
      deleteAddress: (id) => {
        set((state) => {
          const newAddresses = state.addresses.filter(addr => addr.id !== id);
          return {
            addresses: newAddresses,
            selectedAddress: state.selectedAddress?.id === id 
              ? (newAddresses[0] || null) 
              : state.selectedAddress,
          };
        });
      },
      
      setSelectedAddress: (address) => set({ selectedAddress: address }),
      
      getMainAddress: () => {
        const { addresses, selectedAddress } = get();
        return selectedAddress || addresses[0] || null;
      },
    }),
    {
      name: 'address-storage',
    }
  )
);