export function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";

  const existing = localStorage.getItem("deviceId");
  if (existing) return existing;

  // generate unique device ID
  const newId = crypto.randomUUID();

  localStorage.setItem("deviceId", newId);
  return newId;
}
