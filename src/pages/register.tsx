import Head from "next/head";
import Link from "next/link";
import { fixUrl } from "../utils/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Textbox } from "../components/Textbox";

export interface FormValues {
  firstName: string;
  lastName: string;
  zip: string;
  pref: string;
  address1: string;
  address2: string;
  address3: string;
  phoneNumber: string;
  email: string;
  emailConfirm: string;
  terms: boolean;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      zip: "",
      pref: "",
      address1: "",
      address2: "",
      address3: "",
      phoneNumber: "",
      email: "",
      emailConfirm: "",
      terms: false,
    },
    mode: "onBlur",
  });

  // 登録
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onSubmit = (data) => {
    if (!isValid) return;
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    router.push("/");
  };

  // 入力クリア
  const handleClearErrors = () => {
    const confirmation = window.confirm(
      "入力状況は保存されません。よろしいですか？"
    );
    if (confirmation) {
      reset();
      clearErrors();
    }
  };

  // 住所自動入力関連
  const handleZipcodeSearch = async () => {
    const zipcode = watch("zip");
    const res = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
    );
    const json = await res.json();
    if (json.results) {
      // 各住所テキストボックスの値をクリアする
      clearErrors(["pref", "address1"]);
      // 各住所テキストボックスの値を設定する
      setValue("pref", json.results[0].address1);
      setValue("address1", json.results[0].address2 + json.results[0].address3);
    }
  };

  // ページ遷移処理
  const router = useRouter();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleBackToTop = () => {
    const confirmation = window.confirm(
      "入力状況は保存されません。よろしいですか？"
    );
    if (confirmation) {
      setShouldNavigate(true);
    }
  };

  if (shouldNavigate) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Head>
        <title>Learning PORTAL - 会員登録</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className="bg-secondary">
        <div className="gradient">
          <div className="row d-flex align-items-center fw-bold">
            <div className="col"></div>
            <div className="col text-center">
              <span className="m-4 mx-auto">
                <Link href="/">
                  <img src={fixUrl("/logo_250.png")} className="front"></img>
                </Link>
              </span>
            </div>
            <div className="col text-end">
              <span className="my-4 mx-4 material-symbols-outlined text-light opacity-75">
                help
              </span>
            </div>
          </div>
        </div>
        <div className="container card col-12 col-md-8 col-lg-6 px-5 py-3">
          <div className="col-12 text-center px-5 py-3 mb-2">
            <h2 className="text-dark">会員登録</h2>
          </div>
          <div className="col-12 border-bottom border-secondary-subtle mb-3"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="氏名(姓)"
                label="firstName"
                register={register}
                required
                errors={errors}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="氏名(名)"
                label="lastName"
                register={register}
                required
                maxLength={30}
                errors={errors}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="メールアドレス"
                label="email"
                register={register}
                required
                maxLength={255}
                errors={errors}
                size={"large"}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="メールアドレス(確認)"
                label="emailConfirm"
                register={register}
                required
                maxLength={255}
                errors={errors}
                size={"large"}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="電話番号"
                label="phoneNumber"
                register={register}
                required
                maxLength={30}
                errors={errors}
                size={"small"}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="郵便番号"
                label="zip"
                register={register}
                required
                maxLength={7}
                minLength={7}
                errors={errors}
                size={"small"}
              />
              <div className="col-12 col-md-3"></div>
              <div className="col-12 col-md-6 d-flex align-items-center py-2">
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleZipcodeSearch}
                >
                  郵便番号から住所を検索
                </button>
              </div>
            </div>
            <div className="row d-flex align-items-center textbox-wrapper pb-4">
              <Textbox
                name="住所(都道府県)"
                label="pref"
                register={register}
                required
                maxLength={10}
                errors={errors}
                isAuto
                size={"small"}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="住所(市区町村)"
                label="address1"
                register={register}
                required
                maxLength={255}
                errors={errors}
                isAuto
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="住所(丁目・番地・号)"
                label="address2"
                register={register}
                required
                maxLength={255}
                errors={errors}
              />
            </div>
            <div className="row d-flex align-items-center pb-4">
              <Textbox
                name="住所(マンション名等)"
                label="address3"
                register={register}
                maxLength={255}
                errors={errors}
                size={"large"}
              />
            </div>
            <div className="card px-5 py-5">
              <div className="text-start">
                <div className="text-center">利用規約</div>
                <br />
                スクロール有で埋め込み予定
                <br />
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                <br />
                <br />
                <br />
                <br />
                この利用規約は仮のものです。
              </div>
            </div>
            <div className="pt-3 pb-1 d-flex justify-content-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agree"
                  {...register("terms", { required: true })}
                />
                <label
                  className={`form-check-label ${
                    errors["terms"] ? "text-danger fw-bold" : ""
                  }`}
                  htmlFor="agree"
                >
                  利用規約に同意する
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-center text-danger pb-1">
              {errors["terms"] && <span>必須項目です</span>}
            </div>
            <div className="text-center">
              <div>
                <button type="submit" className="btn btn-dark mt-2 mb-3 px-5">
                  登録する
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary mt-5 mb-3 px-5"
                  onClick={handleClearErrors}
                >
                  入力内容をクリア
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary bg-gradient mt-2 mb-3 px-5"
                  onClick={handleBackToTop}
                >
                  TOPへ戻る
                </button>
              </div>
            </div>
            {isModalVisible && (
              <div className="modal d-block" tabIndex={-1}>
                <div className="modal-dialog modal-fullscreen-sm-down">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-center">登録完了</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                    <div className="modal-body text-center">
                      <div className="p-3">
                        <span className="material-symbols-outlined check-circle">
                          check_circle
                        </span>
                      </div>
                      <p>登録が完了しました！</p>
                      <p>「OK」をクリックするとTOPページへ遷移します。</p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={closeModal}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
