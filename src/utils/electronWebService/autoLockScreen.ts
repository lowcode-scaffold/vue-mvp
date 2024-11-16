import dayjs from "dayjs";
/** 更新有效时间，当前时间 + 10 分钟(默认) */
export const updateLockEffectiveTime = (minute = 30) => {
  localStorage.setItem(
    "lock_EffectiveTime",
    dayjs().add(minute, "minute").valueOf().toString(),
  );
};

export const validLock = () => {
  const effectiveTime = localStorage.getItem("lock_EffectiveTime");
  if (effectiveTime && Number(effectiveTime) < dayjs().valueOf()) {
    return false;
  }
  return true;
};
