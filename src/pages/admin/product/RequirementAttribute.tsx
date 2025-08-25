import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchAttributes } from "@/services/attributes.service";
import type { IAttribute } from "@/type/attribute";

interface RequirementAttributeProps {
  onChange: (selected: IAttribute[]) => void;
}

const RequirementAttribute: React.FC<RequirementAttributeProps> = ({ onChange }) => {
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<IAttribute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttributes = async () => {
      try {
        const response = await fetchAttributes();
        setAttributes(response || []);
      } catch (error) {
        console.error("Error loading attributes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  const handleAttributeToggle = (attribute: IAttribute, checked: boolean) => {
    let newSelected: IAttribute[];
    
    if (checked) {
      newSelected = [...selectedAttributes, attribute];
    } else {
      newSelected = selectedAttributes.filter(attr => attr.id !== attribute.id);
    }
    
    setSelectedAttributes(newSelected);
    onChange(newSelected);
  };

  if (loading) {
    return (
      <Card className="bg-primary rounded-md p-6">
        <CardHeader className="p-0">
          <CardTitle className="p-0">Required Attributes</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading attributes...</div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-primary rounded-md p-6">
      <CardHeader className="p-0">
        <CardTitle className="p-0">Required Attributes</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Select the attributes that will be used for product variations
        </p>
        
        {attributes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No attributes available
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {attributes.map((attribute) => (
              <div key={attribute.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`attribute-${attribute.id}`}
                  checked={selectedAttributes.some(attr => attr.id === attribute.id)}
                  onCheckedChange={(checked) => 
                    handleAttributeToggle(attribute, checked as boolean)
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:text-white"
                />
                <Label 
                  htmlFor={`attribute-${attribute.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {attribute.name}
                </Label>
              </div>
            ))}
          </div>
        )}
        
        {selectedAttributes.length > 0 && (
          <div className="mt-4 p-3 bg-muted/80 rounded-md">
            <p className="text-sm font-medium mb-2">Selected Attributes:</p>
            <div className="flex flex-wrap gap-2 ">
              {selectedAttributes.map((attr) => (
                <span
                  key={attr.id}
                  className="px-2 py-1 text-sm rounded bg-background-gray"
                >
                  {attr.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RequirementAttribute;
