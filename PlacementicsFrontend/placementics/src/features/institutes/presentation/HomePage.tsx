"use client";

import { useState } from "react";

import Header from "@/shared/layouts/Header";
import SearchBar from "@/shared/ui/Searchbar";
import InstituteGrid from "./components/InstituteGrid";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <main className="page">
      <Header />

      <section className="hero">
        <div className="step">
          STEP 1 OF 2
        </div>

        <h1>
          Which institute
          <br />
          are you part of?
        </h1>

        <p className="description">
          Select your college to see its placement history,
          company feedback from past drives, and openings
          shared by your own teachers and alumni.
        </p>

        <SearchBar onSearch={setSearch} />
      </section>

      <InstituteGrid search={search} />
    </main>
  );
}
