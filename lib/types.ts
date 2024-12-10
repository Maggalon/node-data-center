import { CountryName } from "./countryCodes";

export interface Noder {
    address: string;
    moniker: string;
  }
  
export interface MapItem {
    as: string;
    city: string;
    country: CountryName;
    ip: string;
    isp: string;
    lat: number;
    lon: number;
    noder: Noder;
}

export interface ChartGroup {
    [k: string]: MapItem[] | undefined;
}

export interface RpcItem {
    noder: Noder;
    rpcIp?: string;
    grpcIp?: string;
    apiIp?: string;
    evmIp: string;
    tx_index: string;
    uptime: string;
}

export interface PeerItem {
    noder: Noder;
    peer: string;
}

export interface NetworkData {
    peers: {
        cosmos: PeerItem[];
        evm: PeerItem[];
    };
    rpcs: {
        cosmos: RpcItem[];
        evm: RpcItem[];
    }
}