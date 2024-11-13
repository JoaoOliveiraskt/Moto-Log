"use client";

import { Link } from "next-view-transitions";
import React from "react";
import { Button } from "./ui/button";
import { Meteors } from "./meteors";

interface Props {
  title: string;
  description: string;
  href: string;
  btnContent: string;
}

export const MeteorBanner = ({
  title,
  description,
  href,
  btnContent,
}: Props) => {
  return (
    <div className="w-full max-w-screen-lg mx-auto pb-4 md:py-10">
      <div className="relative w-full">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-200 to-teal-200 dark:from-blue-500 dark:to-teal-500 blur-3xl" />
        <div className="relative flex h-full items-start justify-between overflow-hidden rounded-3xl border dark:border-gray-800 px-4 md:px-14 py-8 md:py-16 shadow-xl dark:bg-gray-900 dark:bg-opacity-70">
          <div className="flex flex-col min-h-full justify-between w-full">
            <div>
              <h1 className="relative z-50 mb-4 text-3xl font-bold ">
                {title}
              </h1>

              <p className=" relative z-50 text-muted-foreground">
                {description}
              </p>
            </div>
            <Link href={`/${href}`} rel="noopener noreferrer">
              <Button
                size={"rounded"}
                className="md:mt-6 border border-foreground/60 h-11 font-semibold px-8 bg-transparent hover:bg-transparent text-foreground hover:shadow-2xl hover:shadow-foreground/20"
                
              >
                {btnContent}
              </Button>
            </Link>
          </div>
          {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
};
