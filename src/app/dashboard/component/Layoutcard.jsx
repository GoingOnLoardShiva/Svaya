"use client";

import { useRef, useState } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";
import { GiNetworkBars } from "react-icons/gi";
import { AiOutlineDelete } from "react-icons/ai";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { PLATFORM_CONFIG } from "./platformConfig";
import { debounce } from "../../../../lib/debounce";
import { isValidUrl } from "../../../../lib/validation";

export default function LayoutCard({ data, onDeleted = () => {}, onUpdated = () => {} }) {
  // ✅ Initialize directly from data to match SSR
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingLink, setEditingLink] = useState(false);
  const [title, setTitle] = useState(data.platform_Tittle || "");
  const [link, setLink] = useState(data.platform_link || "");
  const [active, setActive] = useState(!!data.layout_active);
  const [saving, setSaving] = useState(false);
  const undoTimerRef = useRef(null);
  const [showUndo, setShowUndo] = useState(false);
  const [deleted_uid, setDeletedUid] = useState(null);

  const config = PLATFORM_CONFIG[data.platform?.toLowerCase()] || {
    bg: "bg-white",
    color: "text-gray-600",
    label: data.platform || "Platform",
  };

  // Debounced save
  const doSave = async (payload) => {
    setSaving(true);
    const res = await fetch("/api/user/update-layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout_uid: data.layout_uid, ...payload }),
    });
    const r = await res.json();
    setSaving(false);
    if (r.success) onUpdated();
    return r;
  };
  const debouncedSave = useRef(debounce(doSave, 300)).current;

  const onTitleBlur = () => {
    setEditingTitle(false);
    debouncedSave({ platform_Tittle: title });
  };

  const onLinkBlur = () => {
    setEditingLink(false);
    if (link && !isValidUrl(link)) {
      alert("Please enter a valid URL (include http:// or https://)");
      return;
    }
    debouncedSave({ platform_link: link });
  };

  const onToggleActive = (val) => {
    setActive(val);
    debouncedSave({ layout_active: val });
  };

  const onDelete = async () => {
    const res = await fetch("/api/user/delete-layout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout_uid: data.layout_uid }),
    });
    const r = await res.json();
    if (r.success) {
      setDeletedUid(data.layout_uid);
      setShowUndo(true);
      undoTimerRef.current = setTimeout(() => {
        setShowUndo(false);
        onDeleted();
      }, 7000);
    }
  };

  const undoDelete = async () => {
    clearTimeout(undoTimerRef.current);
    setShowUndo(false);
    await fetch("/api/user/undo-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ layout_uid: deleted_uid }),
    });
    setDeletedUid(null);
    onUpdated();
  };

  const onClickVisit = async () => {
    try {
      const res = await fetch("/api/user/track-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout_uid: data.layout_uid }),
      });
      const r = await res.json();
      if (r.success && r.data?.platform_link) {
        window.open(r.data.platform_link, "_blank", "noopener");
        onUpdated();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`rounded-xl p-4 shadow-sm border ${config.bg}`}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <label className={`text-sm font-medium ${config.color}`}>{config.label}</label>

          {/* Title */}
          <div className="flex items-center gap-2">
            {editingTitle ? (
              <input
                autoFocus
                value={title}
                placeholder="Enter title"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={onTitleBlur}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                className="border rounded px-2 py-1 text-sm"
              />
            ) : (
              <>
                <span className="font-bold cursor-pointer" onClick={() => setEditingTitle(true)}>
                  {title || "Add Title"}
                </span>
                <BiSolidEditAlt className="cursor-pointer w-4 h-4" onClick={() => setEditingTitle(true)} />
              </>
            )}
          </div>

          {/* Link */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {editingLink ? (
              <input
                autoFocus
                value={link}
                placeholder="Enter link (https://...)"
                onChange={(e) => setLink(e.target.value)}
                onBlur={onLinkBlur}
                onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                className="border rounded px-2 py-1 text-sm w-64"
              />
            ) : (
              <>
                <span className="cursor-pointer" onClick={onClickVisit}>
                  {link || "Add Link"}
                </span>
                <BiSolidEditAlt className="cursor-pointer w-4 h-4" onClick={() => setEditingLink(true)} />
              </>
            )}
          </div>
        </div>

        <Switch checked={active} onCheckedChange={onToggleActive} />
      </div>

      <div className="flex justify-between mt-3">
        <div className="flex gap-4 items-center">
          <Tooltip>
            <TooltipTrigger>
              <MdOutlineImage className="w-5 h-5 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Add Logo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1 cursor-pointer" onClick={onClickVisit}>
                <GiNetworkBars className="w-4 h-4" />
                <span className="text-xs">{data.platform_clicks ?? 0} Clicks</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Clicks</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-3">
          <AiOutlineDelete className="text-red-500 cursor-pointer w-5 h-5" onClick={onDelete} />
          {saving && <span className="text-xs text-gray-400">Saving...</span>}
        </div>
      </div>

      {/* Undo toast */}
      {showUndo && (
        <div className="mt-2 p-2 bg-yellow-50 border rounded flex justify-between items-center">
          <div>Layout deleted</div>
          <button className="text-blue-600 underline" onClick={undoDelete}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
