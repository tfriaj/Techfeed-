import React from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import { marked } from "marked";
import AboutAuthor from "../About/AboutAuthor";
import config from "../../config/config.json";

const SinglePosts = ({
  frontmatter,
  content,
  socialMedia,
  slug,
  data,
  author,
}) => {
  const { sharePost } = config.perameter;

  const currentDate = new Date();
  let options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      <div key={slug} className=" w-full mt-14">
        <div className="block">
          <Image
            alt="abc"
            src={frontmatter.image}
            width={1200}
            height={700}
            layout="responsive"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col w-full sm:w-4/5 justify-center items-center mx-auto ">
          <div className="mt-14">
            <h2 className="title cursor-default">{frontmatter.category}</h2>
          </div>
          <h1 className="pageTitle  text-center mt-6 text-5xl mb-5">{frontmatter.title}</h1>

          <div className="">
            <p
              className="  italic  font-secondary md:text-lg mb-5 text-sm font-normal text-textLight"
            >
              Posted on{" "}
              {currentDate.getFullYear() >
              new Date(frontmatter.date).getFullYear() ? (
                new Date(frontmatter.date).toLocaleDateString("en-US", options)
              ) : currentDate.getMonth() >
                new Date(frontmatter.date).getMonth() ? (
                new Date(frontmatter.date).toLocaleDateString("en-US", options)
              ) : currentDate.getDate() ==
                new Date(frontmatter.date).getDate() ? (
                <span>Today</span>
              ) : currentDate.getDate() -
                  new Date(frontmatter.date).getDate() <=
                3 ? (
                <span>
                  {currentDate.getDate() - new Date(frontmatter.date).getDate()}{" "}
                  day ago{" "}
                </span>
              ) : (
                new Date(frontmatter.date).toLocaleDateString("en-US", options)
              )}{" "}
              by{" "}
              <Link href="/about">
                <a>
                  <span className="hover">{frontmatter.author}</span>
                </a>
              </Link>
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
            className="markdown mt-8"
            //
          ></div>

          {sharePost == true && (
            <div className="my-10">
              <div className="flex justify-start">
                {socialMedia.slice(0, 3).map((i) => (
                  <div key={i.name} className="">
                    <Link
                      href={
                        i.name == "facebook"
                          ? `https://www.facebook.com/sharer/sharer.php?u=+https://lifistyle-blog.vercel.app/${slug}`
                          : i.name == "twitter"
                          ? `https://twitter.com/intent/tweet/?text=${frontmatter.heading}&url=${slug}`
                          : i.name == "pinterest"
                          ? `https://www.pinterest.com/pin/?text=${frontmatter.heading}&url=${slug}`
                          : "#"
                      }
                    >
                      <a
                        target="_blank"
                        rel="noflow"
                        className={`
                                          socialMedia
                                           cursor-pointer
                                           ${i.name}
                                           `}
                      >
                        <i className={`${i.icon} not-italic`}></i>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          <AboutAuthor data={data} author={author}></AboutAuthor>
        </div>
      </div>
    </>
  );
};

export default SinglePosts;
