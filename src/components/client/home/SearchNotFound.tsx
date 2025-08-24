import { Search } from "lucide-react";

interface ProductNotFoundProps {
  mode: "category" | "search";
  value: string;
}

export function SearchNotFound({ mode, value }: ProductNotFoundProps) {
  const title = "Không tìm thấy sản phẩm";

  const description =
    mode === "category"
      ? "Danh mục này hiện chưa có sản phẩm, vui lòng quay lại sau một thời gian."
      : value.trim() !== ""
      ? `Không tìm thấy sản phẩm có từ khóa "${value}".`
      : "Không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center space-y-8">
        {/* Main animated icon */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <Search className="w-12 h-12 text-white" />
          </div>
          {/* Floating dots */}
          <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
