import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { toastSuccess } from "@/components/common/sonner";

const AddCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryType, setCategoryType] = useState<string | null>(null);
  const [parentCategories, setParentCategories] = useState<string[]>([]);
  const [newParentName, setNewParentName] = useState("");
  const [newChildName, setNewChildName] = useState("");
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const handleAddParent = () => {
    if (newParentName.trim()) {
      setParentCategories([...parentCategories, newParentName]);
      setNewParentName("");
      setIsDialogOpen(false); // Close dialog after adding
      toastSuccess("Add category success!");
    }
  };

  const handleAddChild = () => {
    if (newChildName.trim() && selectedParent) {
      console.log(
        `Added child: ${newChildName} with parent: ${selectedParent}`
      );
      setNewChildName("");
      setIsDialogOpen(false); // Close dialog after adding
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-30 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Plus /> Add category
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 rounded-lg w-[400px] bg-background-system-white border mt-3">
        <div className="space-x-4 mb-4">
          <Button
            onClick={() => setCategoryType("parent")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Parent Category
          </Button>
          <Button
            onClick={() => setCategoryType("child")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Child Category
          </Button>
        </div>
        {categoryType && (
          <div>
            {categoryType === "parent" && (
              <div className="ml-6 mt-2 space-y-2">
                <Input
                  value={newParentName}
                  onChange={(e) => setNewParentName(e.target.value)}
                  placeholder="Enter parent category name"
                  className="w-full p-2 border rounded"
                />
                <Button
                  onClick={handleAddParent}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <Plus /> Add Parent
                </Button>
              </div>
            )}
            {categoryType === "child" && (
              <div className="ml-6 mt-2 space-y-2">
                <select
                  value={selectedParent || ""}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Parent Category</option>
                  {parentCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <Input
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="Enter child category name"
                  className="w-full p-2 border rounded"
                />
                <Button
                  onClick={handleAddChild}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <Plus /> Add Child
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddCategories;
