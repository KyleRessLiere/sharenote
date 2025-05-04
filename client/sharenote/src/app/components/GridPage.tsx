// src/app/grid/page.tsx
'use client';

import Card from "@/components/ui/Card";

export default function GridPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
