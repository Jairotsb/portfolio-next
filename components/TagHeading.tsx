import { useRouter } from "next/router";
import { useDictionary } from "../context/DictionaryContext";

export function TagHeading() {
  const dict = useDictionary();
  const { tag } = useRouter().query;
  return (
    <h1>
      {dict.blog.taggedWith}
      {tag}
      {dict.blog.taggedWithClose}
    </h1>
  );
}
