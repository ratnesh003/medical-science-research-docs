import React from "react";

const CommunityPage = () => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="min-h-screen w-3/5 content-center ">
          <h1 className="text-[2.4rem] leading-10 sm:leading-[4.5rem] font-bold sm:text-5xl mt-2">
            About Dr Ram Mohan Tiwari
          </h1>
          <p className="sm:text-lg text-muted-foreground mt-4">
            Ram Mohan Tiwari was born in Durg, then Madhya Pradesh, India in
            1934, one of eight siblings. He went on to study medicine at Nagpur
            Medical College in 1953, having just lost his father to cancer. From
            Nagpur he went on to Bombay where he secured his MS (Master of
            Surgery) from the University of Bombay in 1961, juggling jobs at
            hospitals such as KEM (King Edward Memorial), Bombay Hospital and
            Tata Memorial Hospital.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            After borrowing money from one of his elder sisters he sailed for
            England in 1961 and found a job as an ENT surgeon in Lancaster. He
            married Catharina Verhoeff in 1964, a Dutch nurse who was working at
            the same hospital were Ram Tiwari worked in Lancaster and was
            planning on migrating to the United States.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            Together Ram Mohan and Ina lived in Birmingham, West Bromwich,
            Middlesborough, Hartlepool and Stockton. In 1969 they moved to New
            Delhi, India with their two young children.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            In 1966 he had passed the exam to be admitted as a Fellow of the
            Royal College of Surgeons.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            In 1972 Ram Mohan accepted a job to work in Suriname, South America,
            then a Dutch Colony. In 1977 he completed and successfully defended
            his PhD thesis, with Professors Jesserun (Suriname), Luyendijk
            (Leiden, the Netherlands) and Sheehy (Los Angeles, the United
            States) as promoters.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            In 1979 Ram Mohan took on a position as Associate Professor of Head
            and Neck Oncology at the Free University of Amsterdam Hospital, part
            of the Free University (Vrije Universiteit) and continued to work
            there until his retirement in 1999. In 1994 he was admitted as a
            Fellow of the American College of Surgeons.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            In 1999 Ram Mohan and Ina moved to Bangalore, India and Ram Mohan
            continued to work for a few days a week at the Bangalore Institute
            of Oncology.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            He helped co-found the Foundation for Head and Neck Oncology (FHNO,
            fhno.org) in 2000, together with his mentor Professor L.H.
            Hiranandani and others.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            Ram Mohan Tiwari (or RMT as he was known in medical circles) passed
            away in 2017, suffering from pulmonary fibrosis. Ina Tiwari passed
            away in Bangalore in February 2024.
          </p>
          <p className="sm:text-lg text-muted-foreground mt-4">
            During his lifetime Ram Mohan Tiwari had authored and co-authored
            124 academic publications and co-edited one book on head and neck
            surgery.
          </p>
        </div>
        <div className="w-1/3 mt-8 h-96 rounded-lg overflow-hidden">
          <img
            src="/13193_2017_675_Figa_HTML.jpg"
            alt="Profile of Dr. Ram Mohan Tiwari"
            className="object-cover h-full"
          />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
