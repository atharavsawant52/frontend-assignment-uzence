import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";
import type { Column } from "./components/DataTable";


interface User {
  id: number;
  name: string;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "Atharav", email: "atharav@example.com" },
  { id: 2, name: "Rahul", email: "rahul@example.com" },
  { id: 3, name: "Sneha", email: "sneha@example.com" },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

export default function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 min-h-screen dark:from-gray-900 dark:via-gray-950 dark:to-black dark:text-white">
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        helperText="This is your public username"
        variant="outlined"
        size="md"
        clearable
      />
      <DataTable data={sampleData} columns={columns} selectable />
    </div>
  );
}
