import React, { useState } from "react";

type Props = {
    onSearch: (keyword: string) => void;
};

const ProductSearch: React.FC<Props> = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(search.trim()); // gọi callback từ cha
    };

    // Khi xóa input, tự động trả về sản phẩm ban đầu
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (value === "") {
            onSearch("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 w-full">
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={handleChange}
                className="border rounded-xl px-3 py-2 flex-1"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
                Tìm kiếm
            </button>
        </form>
    );
};

export default ProductSearch;
