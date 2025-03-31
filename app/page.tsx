import { buttonVariants } from "@/components/ui/button";
import { MoveUpRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex mt-6 min-h-screen h-full flex-col sm:items-center justify-center text-center px-2 sm:py-8 py-12">
      <Link
        href="https://www.linkedin.com/in/sanjaytiwari/"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Follow along on LinkedIn{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <div className="flex flex-wrap flex-col md:flex-row-reverse justify-between w-full">
        <div className="md:w-1/3 w-full mt-8 h-96 rounded-lg overflow-hidden">
          <img
            src="/13193_2017_675_Figa_HTML.jpg"
            alt="Profile of Dr. Ram Mohan Tiwari"
            className="object-cover h-full"
          />
        </div>
        <div className="w-3/5 h-[80vh] content-center">
          <h1 className="text-[2.4rem] leading-5 sm:leading-[3rem] font-bold mb-4 sm:text-5xl text-left sm:text-center">
            The slides (transparencies) are from the archives of Dr Ram Mohan
            Tiwari (M.B.B.S, MS, FRCS, FACS, PhD).{" "}
          </h1>
          <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
            These slides were taken during head and neck oncology procedures
            performed by Dr Tiwari during his tenure at the Free University
            Hospital in Amsterdam, the Netherlands, between January 1979 and
            September 1999.
          </p>
          <Link
          href="/blog"
          className={buttonVariants({
            className: "px-6",
            size: "lg",
          })}
        >
          Read Blog
        </Link>
        </div>
      </div>

      <div className="sm:flex sm:flex-row grid grid-cols-2 items-center sm;gap-5 gap-3 mb-8">
      </div>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
        The slides are being hosted on this site to give medical practitioners
        and researchers the opportunity to use them as a resource, to be able to
        visualise some of the very innovative surgical procedures that were
        carried out by Dr Tiwari and his colleagues during those years. s
      </p>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground text-left sm:text-center">
        Additionally, the intent is to invite comment, to allow for a better
        categorisation than has been presented here by his decidedly nonmedical
        heirs, or to stimulate dialogue between practitioners on the many
        advances that would have taken place since this time. References can be
        made by practitioners and researchers to academic literature that
        corroborate or challenge the efficacy of certain procedure
      </p>
    </div>
  );
}
