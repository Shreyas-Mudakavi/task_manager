"use client";

import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { useGlobalState } from "../../context/globalProvider";
import menu from "../../utils/menu";
import Button from "../Button/Button";
import { IoExitOutline } from "react-icons/io5";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { MdMenu } from "react-icons/md";
import { BiLeftArrowAlt } from "react-icons/bi";

const SidebarStyled = styled.nav<{ collapsedSidebar: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor};
  width: ${(props) => props.theme.sidebarWidth};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsedSidebar ? "translateX(-107%)" : "translateX(0%)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    position: absolute;
    right: -66px;
    top: 1.8rem;
    padding: 0.8rem;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: ${(props) => props.theme.colorBg2};
    border-right: 2px solid ${(props) => props.theme.borderColor2};
    border-top: 2px solid ${(props) => props.theme.borderColor2};
    border-bottom: 2px solid ${(props) => props.theme.borderColor2};
  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonTrigger {
        width: 100%;
        height: 100%;

        .cl-userButtonBox {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      background: ${(props) => props.theme.colorBg3};
      transition: all 0.55s linear;
      border-radius: 1rem;
      border: 2px solid ${(props) => props.theme.borderColor2};

      opacity: 0.2;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;

      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 70px;
      height: 70px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      /* font-size: clamp(1.2rem, 3vw, 1.4rem); */
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.borderColor2};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.7rem 1rem 0.7rem 2.1rem;
    margin: 0.3rem 0rem;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      width: 0;
      top: 0;
      left: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};
      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;
    }

    .icon {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};

    .icon,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }
`;

const Sidebar = () => {
  const { theme, collapsedSidebar, collapseSidebar } = useGlobalState();
  const { signOut } = useClerk();

  const { user } = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} collapsedSidebar={collapseSidebar}>
      <button className="toggle-nav" onClick={collapseSidebar}>
        {collapsedSidebar ? <MdMenu /> : <BiLeftArrowAlt />}
      </button>
      <div className={`profile`}>
        <div className={`profile-overlay`}></div>
        <div className={`image`}>
          <Image
            width={70}
            height={70}
            className={`rounded-full transition`}
            src={user?.imageUrl || ""}
            alt="profile-pic"
          />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className={`capitalize`}>
          <span className={``}>{user?.firstName}</span>
          <span className={``}>{user?.lastName}</span>
        </h1>
      </div>

      <ul className="nav-items">
        {menu?.map((item) => {
          return (
            <li
              key={item?.title}
              className={`nav-item ${pathname === item?.link ? `active` : ``}`}
              onClick={() => {
                handleNavClick(item?.link);
              }}
            >
              <span className="icon">{item?.icon}</span>
              <Link href={item?.link}>{item?.title}</Link>
            </li>
          );
        })}
      </ul>

      <div className="sign-out relative mb-6">
        <Button
          name="Sign Out"
          type="submit"
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
          icon={<IoExitOutline className="mr-4 text-[#b2becd] text-[1.5rem]" />}
        />
      </div>
    </SidebarStyled>
  );
};

export default Sidebar;
