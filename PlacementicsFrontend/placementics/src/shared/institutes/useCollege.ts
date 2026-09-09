"use client";

import { useEffect, useState } from "react";

import { fetchCollegeById, type College } from "@/shared/institutes/collegesApi";

export function useCollege(collegeId?: string): College | null {
  const [college, setCollege] = useState<College | null>(null);

  useEffect(() => {
    if (!collegeId) {
      return;
    }

    const id = collegeId;
    let cancelled = false;

    async function load() {
      try {
        const item = await fetchCollegeById(id);
        if (!cancelled) {
          setCollege(item);
        }
      } catch {
        if (!cancelled) {
          setCollege(null);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [collegeId]);

  if (!collegeId || college?.id !== collegeId) {
    return null;
  }

  return college;
}
