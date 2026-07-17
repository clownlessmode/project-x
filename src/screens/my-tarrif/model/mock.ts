import type { DeviceModel } from "@entities/device/model/types";
import type { TarrifModel } from "@entities/tarrif/model/types";
import { TARRIFS_MOCK } from "@screens/tarrifs/model/mock";

export type MyTarrifAccess = {
  configuration: string;
  key: string;
  link: string;
};

export type MyTarrifModel = {
  tarrif: TarrifModel;
  access: MyTarrifAccess;
  devices: DeviceModel[];
};

const DEFAULT_ACCESS: MyTarrifAccess = {
  configuration: "988387329934",
  key: "988387329934",
  link: "988387329934",
};

const activeTarrif = TARRIFS_MOCK[0];

export function buildMyTarrifData(tarrif: TarrifModel): MyTarrifModel {
  return {
    tarrif: {
      ...tarrif,
      is_active: true,
    },
    access: DEFAULT_ACCESS,
    devices: [],
  };
}

export const MY_TARRIF_MOCK: MyTarrifModel = buildMyTarrifData(activeTarrif);
