"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { NewsItem } from "@/types/news";

interface Props {
  item: NewsItem;
  onEdit: (item: NewsItem) => void;
  onDelete: (id: string) => void;
}

export default function NewsTableRow({ item, onEdit, onDelete }: Props) {
  return (
    <tr className="group border-b border-line/20 transition-colors hover:bg-subtle/80">
      {/* Thumbnail + title */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-line/20 bg-subtle">
            {item.images[0] ? (
              <Image
                src={item.images[0]}
                alt={item.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-subtle" />
            )}
            {item.images.length > 1 && (
              <span className="absolute bottom-0 right-0 bg-black/70 px-1 text-[8px] leading-4 text-white/70">
                +{item.images.length - 1}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="max-w-xs line-clamp-2 text-xs font-medium leading-snug text-foreground">
              {item.title}
            </p>
          </div>
        </div>
      </td>

      {/* Tag */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="rounded-md border border-primary/30 bg-primary/8 px-2 py-1 text-[10px] font-medium uppercase tracking-widest text-primary">
          {item.tag}
        </span>
      </td>

      {/* Date */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-[11px] text-gray-mid">
          {new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className="rounded-md px-2 py-1 text-[10px] font-medium uppercase tracking-widest"
          style={{
            background:
              item.status === "Published"
                ? "rgba(0,95,117,0.2)"
                : "rgba(132, 146, 166, 0.12)",
            color:
              item.status === "Published"
                ? "#005f75"
                : "rgb(107, 114, 128)",
          }}
        >
          {item.status}
        </span>
      </td>

      {/* Images count */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-[11px] text-gray-mid">
          {item.images.length} image{item.images.length !== 1 ? "s" : ""}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(item)}
            className="rounded-md p-1.5 text-gray-mid transition-colors hover:bg-primary/10 hover:text-primary"
            title="Edit"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded-md p-1.5 text-gray-mid transition-colors hover:bg-red-400/10 hover:text-red-400"
            title="Delete"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}
