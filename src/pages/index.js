import Head from "next/head";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <Head>
        <title>Learning PORTAL</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="container">
        <div className="content text-light">
          <div className="gradient pb-4">
            <div className="row d-flex align-items-center fw-bold">
              <div className="col">
                <span className="m-4 material-symbols-outlined">menu</span>
              </div>
              <div className="col text-center">
                <span className="m-4 mx-auto">
                  <img src="/logo_250.png"></img>
                </span>
              </div>
              <div className="col text-end">
                <span class="my-4 mx-2 material-symbols-outlined">help</span>
                <div className="m-4 material-symbols-outlined">
                  account_circle
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center pb-4">
              <div className="col-10 col-md-8 top-card text-center m-4 p-2">
                <p className="fw-bold font-main">メインタイトル表示エリア</p>
                <p className="font-sub">
                  2022年度課題用に作成されたデモサイト・ABCDEFG1234567890...
                  <br />
                  ここにサービス紹介文を挿入できます。
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            <div className="col-10 col-md-4 bottom-card text-center rounded bg-dark bg-opacity-75 m-1 p-3">
              <h1>NEWS</h1>
              <div className="mx-auto">
                <u>リリースノート</u>
              </div>
              <container>
                <div className="row text-start px-4 pt-4">
                  <div className="col-3">2023/03/01</div>
                  <div className="col-9">
                    verβ 1.0.2公開。 - 軽微なバグ修正。
                  </div>
                  <div className="col-3">2023/02/01</div>
                  <div className="col-9">
                    verβ 1.0.1公開。 - フォームのレスポンシブ対応。
                  </div>
                  <div className="col-3">2023/01/01</div>
                  <div className="col-9">verβ 1.0.0公開。</div>
                </div>
              </container>
            </div>
            <div className="col-10 col-md-4 bottom-card text-center rounded bg-dark bg-opacity-75 m-1 p-3">
              <h1 className="pb-3">こんにちは！</h1>
              <div>初めての方は、ここからアカウントを登録しましょう！</div>
              <Link href="/register">
                <button className="btn btn-light fw-bold my-4">
                  サインアップ
                </button>
              </Link>
              <div className="pt-4">既に登録済みの方は</div>
              <button className="btn btn-light fw-bold mt-4">
                サインイン(dummy)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="img-box">
        <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div>
      </div>
    </>
  );
}
