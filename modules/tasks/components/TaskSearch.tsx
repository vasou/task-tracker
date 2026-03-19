"use client";

import { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import InputField from "@/components/common/form/InputField";

export default function TaskSearch() {
  const setFilters = useTaskStore((s) => s.setFilters);
  const [search, setSearch] = useState("");

  return (
    <InputField
      name="search"
      label="Search Tasks"
      value={search}
      onChange={(value) => {
        setSearch(value);
        setFilters({ search: value || undefined });
      }}
    />
  );
}
