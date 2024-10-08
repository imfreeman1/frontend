import formatPhoneNumber from "@/utils/common";
import React from "react";

export type chiefOfficerType = {
  chiefOfficerId: number;
  name: string;
  phoneNumber: string;
};

export type dutyOfficerType = chiefOfficerType & { targetDate: string };

type ManagerInfoType = {
  chiefOfficer: chiefOfficerType;
  dutyOfficer: dutyOfficerType;
};

const ManagerInfo = ({ chiefOfficer, dutyOfficer }: ManagerInfoType) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-2 min-w-64 justify-start">
        <span className="font-semibold">책임자</span>
        {chiefOfficer ? (
          <>
            <span>{chiefOfficer.name}</span>
            <span className="text-fontWeak">
              {formatPhoneNumber(chiefOfficer.phoneNumber)}
            </span>
          </>
        ) : (
          <span className="text-fontWeak">책임자가 지정되어있지 않습니다.</span>
        )}
      </div>
      <div className="flex gap-2 min-w-64 justify-start">
        <span className="font-semibold">당직자</span>
        {dutyOfficer ? (
          <>
            <span>{dutyOfficer.name}</span>
            <span className="text-fontWeak">
              {formatPhoneNumber(dutyOfficer.phoneNumber)}
            </span>
          </>
        ) : (
          <span className="text-fontWeak">오늘은 당직자가 없습니다.</span>
        )}
      </div>
    </div>
  );
};

export default ManagerInfo;
