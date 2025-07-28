import httpRequest from "@/utils/http-request";

export async function getProvinces() {
    try {
        const response = await httpRequest.get(
            "https://api.allorigins.win/raw?url=https://provinces.open-api.vn/api/?depth=2"
        );

        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API tỉnh/thành:", error);
        throw error;
    }
}

export async function getDistricts(provinceId: number) {
    try {
        const response = await httpRequest.get(
            `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API quận/huyện:", error);
        throw error;
    }
}

export async function getWards(districtId: number) {
    try {
        const response = await httpRequest.get(
            `https://esgoo.net/api-tinhthanh/3/${districtId}.htm`
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gọi API xã/phường:", error);
        throw error;
    }
}

