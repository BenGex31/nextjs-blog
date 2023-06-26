import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    "https://newsapi.org/v2/everything?q=motogp&from=2023-05-26&sortBy=publishedAt&apiKey=2474fba8daed4dbfa7136f82eb4d6491",
    requestOptions
  );
  const news = await response.json();
  return {
    props: {
      allPostsData,
      news,
    },
  };
}

export default function Home({ allPostsData, news }) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>News</h2>
        <ul>
          {news?.articles?.map(({ title }) => (
            <li>{title}</li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
