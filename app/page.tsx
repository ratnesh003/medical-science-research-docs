import { buttonVariants } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center px-2 sm:py-8 py-12">
      <Link
        href="https://www.linkedin.com/in/kartikkeyy/"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Follow along on LinkedIn{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-[2.4rem] leading-10 sm:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-left sm:text-center">
        The vast collection of the Medical Science Data in Images.
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
        More Details can go here.
      </p>
      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
        <Link
          href="/blog"
          className={buttonVariants({
            // variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}
