import QuantityButton from "@/components/common/button/QuantityButton";
import CustomInput from "@/components/common/input/CustomInput";
import Tiptap from "@/components/common/tiptap/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAttributes } from "@/services/attributes.service";
import { fetchSubCategories } from "@/services/categories.service";
import { createProduct } from "@/services/products.service";
import { uploadFile } from "@/services/upload.service";
import { toastError, toastSuccess } from "@/components/common/sonner";
import type { IAttribute } from "@/type/attribute";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import AddImageCarousel from "./AddImageCarousel";
import RequirementAttribute from "./RequirementAttribute";

const ItemAttributeSchema = z
  .object({
    attributeId: z.number().min(1, { message: "Attribute is required" }),
    attributeValueId: z.number().nullable().optional(),
    attributeValue: z.string().optional(),
  })
  .refine(
    (data) => {
      return (
        (data.attributeValueId != null && data.attributeValueId > 0) ||
        (data.attributeValue && data.attributeValue.trim() !== "")
      );
    },
    {
      message: "Attribute value is required",
      path: ["attributeValue"],
    }
  );

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, { message: "Description is required" }),
  itemAttributes: z.array(ItemAttributeSchema),
  images: z
    .array(z.object({ image: z.instanceof(File) }))
    .min(1, { message: "At least one image is required" }),
  categoryId: z.number().min(1, { message: "Category is required" }),
  productType: z.enum(["simple", "variant"]),
  price: z.number().min(1, { message: "Giá phải lớn hơn 0" }).optional(),
  stock: z.number().min(1, { message: "Số lượng phải lớn hơn 0" }).optional(),
});

const AddProductPage = () => {
  const { data: attributes } = useQuery({
    queryKey: ["attributes"],
    queryFn: () => fetchAttributes({ isDeleted: false }),
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchSubCategories(false),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      categoryId: 0,
      productType: "simple",
    },
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control: form.control,
    name: "itemAttributes",
  });

  const { replace: replaceImage } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setIsLoading(true);
      
      // Upload images first
      const imageUrls: string[] = [];
      for (const imageData of data.images) {
        const uploadedUrl = await uploadFile(imageData.image);
        if (uploadedUrl) {
          imageUrls.push(uploadedUrl);
        }
      }
      
      // Prepare product data
      const productData = {
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        price: data.price || 0,
        stock: data.stock || 0,
        images: imageUrls,
      };
      
      // Create product
      const result = await createProduct(productData);
      console.log("Product created successfully:", result);
      
      // Show success message
      toastSuccess("Product added successfully!");
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error("Error creating product:", error);
      toastError("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const [requiredAttributes, setRequiredAttributes] = useState<IAttribute[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex px-5 pb-7">
      <Form {...form}>
        <form
          className="flex-1 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(Number(value));
                    }}
                  >
                    <SelectTrigger className="!bg-primary !h-full w-full">
                      <SelectValue placeholder="Select category ..." />
                    </SelectTrigger>
                    <SelectContent className="bg-primary">
                      {categories?.map((cate) => (
                        <SelectItem value={`${cate.id}`} key={cate.id}>
                          {cate.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Product title</FormLabel>
                <FormControl>
                  <CustomInput
                    placeholder="Write title here ..."
                    field={field}
                    containerClassName="bg-primary"
                    hasError={!!form.formState.errors.title}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Product description</FormLabel>
                <FormControl>
                  <Tiptap content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Attribute</TableHead>
                  <TableHead className="text-center">Attribute value</TableHead>
                  <TableHead className="w-0"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attributeFields.length > 0 ? (
                  attributeFields.map((field, index) => (
                    <TableRow key={field.id} className="hover:bg-transparent">
                      <TableCell className="w-1/3 align-top">
                        <FormField
                          control={form.control}
                          name={`itemAttributes.${index}.attributeId`}
                          render={({ field }) => (
                            <FormItem>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(Number(value));
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger className="!bg-primary !h-full w-full">
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-primary">
                                  {attributes?.map((attr) => (
                                    <SelectItem
                                      value={`${attr.id}`}
                                      key={attr.id}
                                    >
                                      {attr.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="align-top">
                        <FormField
                          control={form.control}
                          name={`itemAttributes.${index}.attributeValue`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormControl>
                                <CustomInput
                                  placeholder="Write attribute value here ..."
                                  field={field}
                                  containerClassName="bg-primary"
                                  hasError={
                                    !!form.formState.errors.itemAttributes?.[
                                      index
                                    ]?.attributeValue
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="w-fit p-0 pt-2 pl-2 align-top">
                        <div className="flex justify-center items-start">
                          <QuantityButton
                            type="button"
                            onClick={() => removeAttribute(index)}
                            action="decrease"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No attributes added
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-end">
              <QuantityButton
                type="button"
                onClick={() => appendAttribute({ attributeId: 0 })}
                action="increase"
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Images</FormLabel>
                <FormControl>
                  <AddImageCarousel
                    onChangeValue={(files) => {
                      replaceImage(files.map((file) => ({ image: file })));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <RadioGroup
              onValueChange={(value) => {
                form.setValue("productType", value as "simple" | "variant");
              }}
              defaultValue="simple"
              className="flex items-center gap-2"
            >
              <div className="flex items-center space-x-2" key="simple">
                <RadioGroupItem
                  value="simple"
                  id="r1"
                  className="focus:!ring-0 focus:ring-offset-0"
                />
                <Label htmlFor="r1">Simple</Label>
              </div>
              <div className="flex items-center space-x-2" key="variant">
                <RadioGroupItem
                  value="variant"
                  id="r2"
                  className="focus:!ring-0 focus:ring-offset-0"
                />
                <Label htmlFor="r2">Variant</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            {form.watch("productType") === "simple" ? (
              <div>
                <div className="flex items-center gap-5 w-full items-start">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-base">Price</FormLabel>
                        <FormControl>
                          <CustomInput
                            placeholder="Price ..."
                            field={field}
                            containerClassName="bg-primary"
                            hasError={!!form.formState.errors.price}
                            type="number"
                            onChange={(e) => {
                              if (Number.isInteger(Number(e.target.value))) {
                                field.onChange(Number(e.target.value));
                              }
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-base">Stock</FormLabel>
                        <FormControl>
                          <CustomInput
                            placeholder="Stock ..."
                            field={field}
                            containerClassName="bg-primary"
                            hasError={!!form.formState.errors.stock}
                            type="number"
                            onChange={(e) => {
                              if (Number.isInteger(Number(e.target.value))) {
                                field.onChange(Number(e.target.value));
                              }
                            }}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ) : (
              <RequirementAttribute
                onChange={(selected) => setRequiredAttributes(selected)}
              />
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Adding product..." : "Add product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddProductPage;
