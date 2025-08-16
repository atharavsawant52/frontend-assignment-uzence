import { ChevronUpIcon, ChevronDownIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortKey(col.key);
    setSortOrder(newOrder);
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const valA = a[sortKey as keyof T];
        const valB = b[sortKey as keyof T];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : data;

  const handleSelect = (row: T) => {
    let updated: T[] = [];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  if (loading) return <div className="p-6 text-center text-gray-500 animate-pulse">Loading...</div>;
  if (!data.length) return <div className="p-6 text-center text-gray-500">No records found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white/70 backdrop-blur-md dark:bg-gray-900/60"
    >
      <table className="w-full border-collapse">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            {selectable && <th className="p-3 text-left">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-3 cursor-pointer select-none text-left text-sm font-semibold tracking-wide"
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-1">
                  {col.title}
                  {col.sortable && (
                    sortKey === col.key ? (
                      sortOrder === "asc" ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )
                    ) : (
                      <ArrowsUpDownIcon className="w-4 h-4 opacity-60" />
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/40" : ""} transition hover:bg-indigo-50 dark:hover:bg-indigo-900 ${
                selectedRows.includes(row) ? "bg-indigo-100 dark:bg-indigo-800/70" : ""
              }`}
            >
              {selectable && (
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleSelect(row)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-3 text-sm text-gray-700 dark:text-gray-200">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}