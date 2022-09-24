import React, { useEffect, useState } from "react";

import * as Service from "../service";
import { Hero } from "../types";
import { debounce } from "../utils";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [heros, setHeros] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const debouncedHandleSearch = debounce<typeof handleSearch>(handleSearch);

  const doSearch = async (query: string, controller?: AbortController) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await Service.Search.getSeach(query, controller);

      if (data.response === "success") setHeros(data.results);
      else setError("No results found");

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (search.length) doSearch(search, controller);

    return () => controller.abort();
  }, [search]);

  const Content = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <>
        {heros.map((hero) => (
          <div className="p-2" key={hero.id}>
            {hero.name}
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for heros"
        onChange={debouncedHandleSearch}
      />
      <Content />
    </div>
  );
};
