import React from "react";
import { Link } from "react-router-dom";
import { RxQuestionMark } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Button, Popover, User } from "@nextui-org/react";

function DashBoardTop() {
  return (
    <div className="flex px-4 py-2 shadow items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer">
        <GiHamburgerMenu />
        <Link
          className="font-titillium font-bold tracking-widest cursor-pointer text-black"
          to={"/"}
        >
          MATFLOW
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <RxQuestionMark
          color="black"
          size={"25px"}
          className="cursor-pointer"
        />

        <div>
          <Popover>
            <Popover.Trigger>
              <User as="button" text="A" color="success" />
            </Popover.Trigger>
            <Popover.Content css={{ px: "$4", py: "$2" }}>
              <UserCard />
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </div>
  );
}

function UserCard() {
  return (
    <div>
      <Button light className="mb-2">
        Profile
      </Button>
      <Button icon={<FiLogOut />} flat color={"error"}>
        Logout
      </Button>
    </div>
  );
}

export default DashBoardTop;
