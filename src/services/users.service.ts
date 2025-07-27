import type { IUser } from "@/type/auth";
import httpRequest from "@/utils/http-request";

export const fetchUsers = async (): Promise<IUser[]> => {
    try {
        const res = await httpRequest.get("users");
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export const fetchCustomer = async (): Promise<IUser[]> => {
    try {
        const res = await httpRequest.get("users?isCustomer=true");
        return res.data.data;
    } catch (error) {
        throw error;
    }
}

export const fetchMembership = async (): Promise<IUser[]> => {
    try {
        const res = await httpRequest.get("users?isMemberShip=true");
        return res.data.data;
    } catch (error) {
        throw error;
    }
}