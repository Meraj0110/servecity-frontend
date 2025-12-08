export default function AddressCardUC({ address }: { address: any }) {
  if (!address) return null;

  return (
    <div className="border rounded-xl p-4 bg-white">
      <p className="font-semibold">{address.fullName}</p>
      <p className="text-sm">{address.phone}</p>
      <p className="text-sm mt-1">
        {address.street}, {address.city}, {address.state} 
      </p>
    </div>
  );
}
