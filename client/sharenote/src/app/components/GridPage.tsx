"use client";

import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import AddNoteCard from "@/components/ui/AddNoteCard";
import { useEffect, useState } from "react";

export default function GridPage() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      const accountId = 1;
      try {
        const res = await fetch(`/api/notes/account/${accountId}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCards(data.notes);
      } catch {
        console.log("Failed to load notes:", accountId);
      }
    };

    handleLoad();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
      <AddNoteCard />
      {cards.map((card) => (
        <Card
          key={card.id}
          title={card.title}
          subtitle={card.content}
          footer={new Date(card.created_at).toLocaleDateString()}
          onClick={() => router.push(`/editor?id=${card.id}`)}
        />
      ))}
    </div>
  );
}
