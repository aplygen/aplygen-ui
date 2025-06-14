
import * as React from "react";
import { BentoCard } from "@/components/BentoCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobSearchAndFiltersProps {
  search: string;
  setSearch: (val: string) => void;
}

const savedFilters = [
  {
    id: 1,
    name: "Remote React Jobs",
    criteria: "Remote, React, $90k+",
  },
  {
    id: 2,
    name: "Frontend (Remote or NYC)",
    criteria: "Frontend, NYC/Remote, $100k+",
  },
];

export const JobSearchAndFilters: React.FC<JobSearchAndFiltersProps> = ({
  search,
  setSearch,
}) => (
  <div className="flex flex-col md:flex-row gap-6">
    {/* Search Bento */}
    <BentoCard
      icon="search"
      title="Job Search"
      description="Use a smart filter to search for jobs."
      className="w-full md:w-1/2"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-3 flex gap-2"
      >
        <Input
          type="text"
          placeholder="Search for jobs (e.g., React remote)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="default">
          Search
        </Button>
      </form>
    </BentoCard>
    {/* Saved Filters Bento */}
    <BentoCard
      icon="save"
      title="Saved Filters"
      description="Quick access to your favorite searches."
      className="w-full md:w-1/2"
    >
      <ul className="mt-2 space-y-2">
        {savedFilters.map((filter) => (
          <li key={filter.id} className="flex justify-between items-center">
            <span className="font-medium">{filter.name}</span>
            <span className="text-xs text-muted-foreground">{filter.criteria}</span>
          </li>
        ))}
      </ul>
    </BentoCard>
  </div>
);
