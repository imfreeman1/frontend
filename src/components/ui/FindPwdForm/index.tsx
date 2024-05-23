"use client";

import InputWithLabel from "@/components/InputWithLabel";
import Button from "@/components/base/Button";
import React from "react";

const FindPwdForm = () => {
  return (
    <div className="w-80">
      <form
        className="flex flex-col gap-14"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-5">
          <InputWithLabel
            id="adminName"
            placeholder="관리자 이름을 입력해주세요"
            labelName="이름"
            type="string"
          />
          <div className="flex">
            <InputWithLabel
              id="adminPhoneNumber"
              placeholder="관리자 전화번호를 입력해주세요"
              labelName="전화번호"
              type="tel"
            />
            <Button className=" bg-primary text-white w-14 h-9 my-auto ml-auto rounded-md">
              찾기
            </Button>
          </div>

          <InputWithLabel
            id="adminPassword"
            placeholder="새로운 비밀번호를 입력해주세요"
            labelName="비밀번호"
            type="password"
          />
          <InputWithLabel
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            labelName="비밀번호 확인"
            type="password"
          />
        </div>

        <Button type="submit" className="primaryButtonDefault">
          인증하기
        </Button>
      </form>
    </div>
  );
};

export default FindPwdForm;
