import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiSearch } from "react-icons/fi";

type DataTableProps<TData, TValue> = {
  title?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  rightActions?: React.ReactNode;
  rowClassName?: (row: TData) => string | undefined;
};

export default function DataTable<TData, TValue>({
  title,
  columns,
  data,
  globalFilter,
  onGlobalFilterChange,
  rightActions,
  rowClassName,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm w-full max-w-full overflow-hidden" style={{ background: "var(--color-surface)" }}>
      {/* Header toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>{title}</div>
        <div className="lg:flex items-center gap-2 hidden">
          <div className="relative">
            <input
              placeholder="Search by ID, Name, or Subject"
              value={globalFilter ?? ""}
              onChange={(e) => onGlobalFilterChange?.(e.target.value)}
              className="rounded-full border pl-9 pr-3 py-2 text-sm focus:outline-none"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"><FiSearch className="h-5 w-5" /></span>
          </div>
          {rightActions}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="text-left" style={{ color: "var(--color-text-primary)" }}>
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id} className="px-4 py-3 font-medium bg-[var(--color-text-gray)]/60 first:rounded-l-xl last:rounded-r-xl">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row: any) => (
              <tr key={row.id} className={`border-b last:border-0`} style={{ borderColor: "var(--color-border)" }}>
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id} className={`px-4 py-3 ${rowClassName ? rowClassName(row.original) : ""}`}> 
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={table.getAllLeafColumns().length} className="px-4 py-10 text-center text-sm" style={{ color: "var(--color-muted-text)" }}>
                  No results
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      
      <div className="flex items-center justify-between pt-3">
        <div className="text-xs lg:block hidden" style={{ color: "var(--color-muted-text)" }}>
          Showing {table.getPaginationRowModel().rows.length} of {table.getRowModel().rows.length}
        </div>
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <button
            className="w-12 h-8 rounded border flex items-center justify-center text-sm cursor-pointer"
            style={{ 
              borderColor: "var(--color-border)", 
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-surface)"
            }}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </button>
          
          {/* Page Numbers */}
          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1;
            const totalPages = table.getPageCount();
            const pages = [];
            
            // Always show first page
            pages.push(
              <button
                key={1}
                className="w-8 h-8 rounded text-sm cursor-pointer"
                style={{
                  backgroundColor: currentPage === 1 ? "var(--color-text-quaternary)" : "var(--color-surface)",
                  color: currentPage === 1 ? "var(--color-text-primary)" : "var(--color-text-primary)",
                  borderColor: "var(--color-border)"
                }}
                onClick={() => table.setPageIndex(0)}
              >
                1
              </button>
            );
            
            // Show pages around current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            
            // Add ellipsis after page 1 if needed
            if (startPage > 2) {
              pages.push(
                <span key="ellipsis1" className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                  ...
                </span>
              );
            }
            
            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
              if (i !== 1 && i !== totalPages) {
                pages.push(
                  <button
                    key={i}
                    className="w-8 h-8 rounded text-sm cursor-pointer"
                    style={{
                      backgroundColor: currentPage === i ? "var(--color-text-quaternary)" : "var(--color-surface)",
                      color: currentPage === i ? "var(--color-text-primary)" : "var(--color-text-primary)",
                      borderColor: "var(--color-border)"
                    }}
                    onClick={() => table.setPageIndex(i - 1)}
                  >
                    {i}
                  </button>
                );
              }
            }
            
            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
              pages.push(
                <span key="ellipsis2" className="text-sm" style={{ color: "var(--color-muted-text)" }}>
                  ...
                </span>
              );
            }
            
            // Always show last page (if more than 1 page)
            if (totalPages > 1) {
              pages.push(
                <button
                  key={totalPages}
                  className="w-8 h-8 rounded text-sm cursor-pointer"
                  style={{
                    backgroundColor: currentPage === totalPages ? "var(--color-text-quaternary)" : "var(--color-surface)",
                    color: currentPage === totalPages ? "var(--color-text-primary)" : "var(--color-text-primary)",
                    borderColor: "var(--color-border)"
                  }}
                  onClick={() => table.setPageIndex(totalPages - 1)}
                >
                  {totalPages}
                </button>
              );
            }
            
            return pages;
          })()}
          
          {/* Next Button */}
          <button
            className="w-12 h-8 rounded border flex items-center justify-center text-sm cursor-pointer"
            style={{ 
              borderColor: "var(--color-border)", 
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-surface)"
            }}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}


