import { useDictionary } from "../context/DictionaryContext";

export function BlogHeading() {
  const dict = useDictionary();
  return <h1 style={{ textAlign: "center" }}>{dict.blog.latestPosts}</h1>;
}
