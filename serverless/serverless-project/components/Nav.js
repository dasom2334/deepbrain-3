import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import { setModalOpen } from "@/modules";
import { setLoginModalOpen, setRegisterModalOpen, logout } from "@/modules";

// import { logoutRequest } from '@/modules/auth';
// const div = createSvgIcon(
//     <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>,
//     'Home',
// );

const basicSettings = {
  subTitles: ["멤버관리"],
  actions: ["/employee/list"],
};

export function Nav() {
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const [userUrls, setUserUrls] = useState({ subTitles: [], actions: [] });

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logoutRequest());
  };
  const navs = {
    subTitles: ["employee", "users", "mealCost"],
    urls: ["/", "/users", "/mealCosts"],
  }
  useEffect(() => {
		const loginedUser = JSON.parse(localStorage.getItem("loginedUser"));
    if (loginedUser === null) {
      setUserUrls({
        subTitles: ["회원가입", "로그인"],
        actions: [setRegisterModalOpen, setLoginModalOpen],
      });
    } else {
      setLoginCheck(true);
      setUserUrls({
        subTitles: ["로그아웃", "정보수정"],
        actions: [logout, setRegisterModalOpen],
      });
    }
  }, []);

  return (
    <nav>
    {navs.urls.map((url, i) => (
      <a
        className="btn btn__primary btn__icon"
        key={i}
        textAlign="center"
        href={url}
        
      >
        <span>{navs.subTitles[i]}</span>
      </a>
    ))}
    {userUrls.actions.map((action, i) => (
      <button
        className="btn btn__primary btn__icon"
        key={i}
        textAlign="center"
        onClick={() => {
          dispatch(action(true));
        }}
      >
        <span>{userUrls.subTitles[i]}</span>
      </button>
    ))}
    </nav>
  );
}
