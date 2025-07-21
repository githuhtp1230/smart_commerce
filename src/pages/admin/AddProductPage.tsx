import {
  Bold,
  ChevronDown,
  Image,
  Italic,
  List,
  ListOrdered,
  Plus,
  Underline,
} from "lucide-react";
import React, { useState } from "react";

const AddProductPage = () => {
  const [description, setDescription] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  return (
    <div className="min-h-screen ">
      <div className="flex bg-background-system-white">
        {/* Main Content */}
        <div className="flex-1 min-w-0 text-txt-primary">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-semibold ">Add a product</h1>
              <div className="space-x-4 text-txt-primary">
                <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-sm hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                  Save draft
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-sm hover:bg-blue-700 cursor-pointer whitespace-nowrap">
                  Publish product
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-2xl font-medium  mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 text-xl text-muted-foreground border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                  placeholder="Write title here..."
                />
              </div>

              <div>
                <label className="block text-2xl font-medium  mb-2">
                  Product Description
                </label>
                <div className="border border-gray-300 rounded-lg">
                  <div className="border-b border-gray-300 px-3 py-2">
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <Bold />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <Italic />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <Underline />
                      </button>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <List />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded cursor-pointer">
                        <ListOrdered />
                      </button>
                    </div>
                  </div>
                  <textarea
                    className="w-full px-4 py-3 text-xl border-none focus:ring-0 text-muted-foreground"
                    rows={6}
                    placeholder="Write a description here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-2xl font-medium  mb-2">
                  Display Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <Image className="ml-140 size-20" />
                    <p className="text-sm text-gray-500">
                      Drag your photo here or{" "}
                      <span className="text-blue-600 cursor-pointer">
                        browse files
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-medium  mb-4">Inventory</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xl font-medium  mb-2">
                      Regular price
                    </label>
                    <div className="relative">
                      <span className="absolute right-2 top-3 ">VNĐ</span>
                      <input
                        type="text"
                        className="w-full pl-8 pr-4 py-2 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xl font-medium  mb-2">
                      Sale price
                    </label>
                    <div className="relative">
                      <span className="absolute right-2 top-3 ">VNĐ</span>
                      <input
                        type="text"
                        className="w-full pl-8 pr-4 py-2 text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={salePrice}
                        onChange={(e) => setSalePrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 min-h-screen  border-l border-gray-200 px-6 py-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-medium  mb-3">Organize</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xl font-medium  mb-2">
                    Category
                  </label>
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm   border border-gray-300 rounded-lg hover:bg-background-system-white cursor-pointer">
                    <span>Select category</span>
                    <ChevronDown />
                  </button>
                </div>

                <div>
                  <label className="block text-xl font-medium  mb-2">
                    Collection
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm text-muted-foreground border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Collection name"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-medium  mb-3">Variants</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xl font-medium  mb-2">
                    Size
                  </label>
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <span>Select size</span>
                    <ChevronDown />
                  </button>
                </div>

                <button className="w-full flex items-center justify-center px-4 py-2 text-sm text-blue-600 bg-white border border-blue-600 rounded-button hover:bg-blue-50 cursor-pointer whitespace-nowrap">
                  <Plus />
                  Add another option
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
