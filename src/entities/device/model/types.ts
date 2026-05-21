import { DefaultEntity } from "@shared/utils/default.entity";

export type DevicePlatform = "apple";

export interface DeviceModel extends DefaultEntity {
  name: string;
  platform: DevicePlatform;
  added_at: Date;
}
