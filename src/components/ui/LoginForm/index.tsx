"use client";

import InputWithLabel from "@/components/InputWithLabel";
import Button from "@/components/base/Button";
import useLoginStore from "@/store/useLogin";
import customAxios from "@/utils/api/axios";
import { setCookie } from "@/utils/cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

type shelterType = {
  shelterId: number;
  shelterName: string;
};

type LoginFormType = {
  shelters: shelterType[];
};

type loginInfoType = {
  shelterId: string;
  password: string;
};

const LoginForm = ({ shelters }: LoginFormType) => {
  const { isLogin, setIsLogin } = useLoginStore();
  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    shelterId: "",
    password: "",
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
  };
  const handleShelterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoginInfo({ ...loginInfo, shelterId: e.target.value });
  };
  useEffect(() => {
    if (isLogin) {
      redirect("dashboard");
    }
  }, [isLogin]);
  const handleLoginSubmit = async () => {
    const submitData = {
      id: parseInt(loginInfo.shelterId, 10),
      pw: loginInfo.password,
    };

    const res = await customAxios({
      method: "POST",
      url: "/api/v1/shelter-admin/login",
      data: JSON.stringify(submitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      setCookie("authToken", res.data.authToken, {
        path: "/",
        expires: new Date(res.data.expiredAt),
      });
      setIsLogin(true);
    }
  };
  return (
    <div className="w-80">
      <form
        className="flex flex-col gap-14"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-2 w-fit">
            <label htmlFor="centerSelector" className="smallFont">
              센터명
            </label>
            <div className="py-2 bg-white w-fit rounded-lg">
              <select
                id="centerSelector"
                onChange={handleShelterChange}
                value={loginInfo.shelterId}
                required
              >
                <option value="" disabled selected>
                  센터를 선택해주세요.
                </option>
                {shelters?.map(({ shelterId, shelterName }) => {
                  return (
                    <option key={shelterId} value={shelterId}>
                      {shelterName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-fit">
            <InputWithLabel
              value={loginInfo.password}
              onChange={(e) => {
                return handlePasswordChange(e);
              }}
              id="centerPassword"
              placeholder="비밀번호"
              labelName="비밀번호"
              type="password"
              isRequired
            />
            <div className="flex gap-1">
              <AiOutlineInfoCircle
                width={16}
                height={16}
                className="h-fit my-auto"
              />

              <Link
                className="text-fontWeak underline underline-offset-2 smallFont"
                href="/auth/findpwd"
              >
                비밀번호를 잊어버리셨나요?
              </Link>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="primaryButtonDefault"
          onClick={handleLoginSubmit}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
