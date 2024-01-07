import Image from "next/image";
import styles from "./page.module.css";
import { QuestionList } from "./QuestionList";

export default function Home() {
  return (
    <>
      <h2 className="text-center">Qs For All</h2>
      <QuestionList />
    </>
  );
}
