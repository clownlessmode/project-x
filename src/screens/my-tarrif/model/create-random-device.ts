import type { DeviceModel } from "@entities/device/model/types";

const DEVICE_MODELS = [
  "iPhone 17",
  "iPhone 16 Pro",
  "iPad Air",
  "MacBook Pro",
  "Apple Watch",
] as const;

export function createRandomDevice(): DeviceModel {
  const now = new Date();
  const model =
    DEVICE_MODELS[Math.floor(Math.random() * DEVICE_MODELS.length)];
  const appId = Math.floor(Math.random() * 9_000_000) + 1_000_000;

  return {
    id: now.getTime(),
    name: `${appId} App (${model})`,
    platform: "apple",
    added_at: now,
    created_at: now,
    updated_at: now,
  };
}
