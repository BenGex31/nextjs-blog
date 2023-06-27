import Head from "next/head";
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const response = await fetch(
    "https://newsapi.org/v2/everything?q=motogp&from=2023-05-27&sortBy=publishedAt&apiKey=2474fba8daed4dbfa7136f82eb4d6491",
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData?.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>News</h2>
        {news.status === "error" ? (
          <p style={{ color: "red", fontStyle: "italic" }}>{news.message}</p>
        ) : (
          <ul>
            {news?.articles?.map(({ title }) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
