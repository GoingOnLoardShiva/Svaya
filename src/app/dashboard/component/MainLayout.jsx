"use client";

import { useEffect, useState } from "react";
import LayoutCard from "./Layoutcard";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ClientOnly from "./ClientOnly";

export default function MainLayout() {
  const [layouts, setLayouts] = useState([]);
  const [userUuid, setUserUuid] = useState(null);

  // get user UUID from localStorage (client-only)
  useEffect(() => {
    const stored = localStorage.getItem("usertoken_details");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserUuid(parsed.userId);
    }
  }, []);

  // fetch layouts when userUuid is ready
  useEffect(() => {
    if (!userUuid) return;
    fetchLayouts();
  }, [userUuid]);

  const fetchLayouts = async () => {
    const res = await fetch("/api/user/get-layout-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid: userUuid }),
    });
    const result = await res.json();
    setLayouts(result.data || []);
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const newList = Array.from(layouts);
    const [moved] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, moved);

    setLayouts(newList);

    // Update order on backend
    const payload = newList.map((item, idx) => ({
      layout_uid: item.layout_uid,
      position: idx,
    }));

    await fetch("/api/user/reorder-layouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ useruuid: userUuid, order: payload }),
    });
  };

  return (
    <ClientOnly>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="layouts" isDropDisabled={false}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="space-y-4"
            >
              {layouts.map((layout, index) => (
                <Draggable
                  key={layout.layout_uid}
                  draggableId={layout.layout_uid.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <LayoutCard data={layout} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ClientOnly>
  );
}
