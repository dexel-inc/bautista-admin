import { useState, useCallback } from "react";

export const useDropdown = (initialState: boolean = false) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(initialState);

  const openDropdown = useCallback(() => setIsOpenDropdown(true), []);
  const closeDropdown = useCallback(() => setIsOpenDropdown(false), []);
  const toggleDropdown = useCallback(() => setIsOpenDropdown((prev) => !prev), []);

  return { isOpenDropdown, openDropdown, closeDropdown, toggleDropdown };
};
