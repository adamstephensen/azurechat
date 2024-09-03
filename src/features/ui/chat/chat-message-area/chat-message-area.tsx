"use client";
import { cn } from "@/ui/lib";
import {
  CheckIcon,
  ClipboardIcon,
  FileText,
  PocketKnife,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../../avatar";
import { Button } from "../../button";



export const ChatMessageArea = (props: {
  children?: React.ReactNode;
  profilePicture?: string | null;
  profileName?: string;
  role: "function" | "user" | "assistant" | "system" | "tool";
  onCopy: () => void;
  onExport: () => void;
}) => {
  const [isCopyIconChecked, setIsCopyIconChecked] = useState(false);
  const [isWordIconChecked, setIsWordIconChecked] = useState(false);

  const handleCopyButtonClick = () => {
    props.onCopy();
    setIsCopyIconChecked(true);
  };

  const handleWordButtonClick = () => {
    props.onExport();
    setIsWordIconChecked(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCopyIconChecked(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isCopyIconChecked]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWordIconChecked(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [isWordIconChecked]);

  let profile = null;

  switch (props.role) {
    case "assistant":
    case "user":
      if (props.profilePicture) {
        profile = (
          <Avatar>
            <AvatarImage src={props.profilePicture} />
          </Avatar>
        );
      } else {
        profile = (
          <UserCircle
            size={28}
            strokeWidth={1.4}
            className="text-muted-foreground"
          />
        );
      }
      break;
    case "tool":
    case "function":
      profile = (
        <PocketKnife
          size={28}
          strokeWidth={1.4}
          className="text-muted-foreground"
        />
      );
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col">
      <div className="h-7 flex items-center justify-between">
        <div className="flex gap-3">
          {profile}
          <div
            className={cn(
              "text-primary capitalize items-center flex",
              props.role === "function" || props.role === "tool"
                ? "text-muted-foreground text-sm"
                : ""
            )}
          >
            {props.profileName}
          </div>
        </div>
        <div className=" h-7 flex items-center justify-between">
          <div>
            <Button
              variant={"ghost"}
              size={"sm"}
              title="Copy text"
              className="justify-right flex"
              onClick={handleCopyButtonClick}
            >
              {isCopyIconChecked ? (
                <CheckIcon size={16} />
              ) : (
                <ClipboardIcon size={16} />
              )}
            </Button>
            </div><div>
            <Button
              variant={"ghost"}
              size={"sm"}
              title="Word Document"
              className="justify-right flex"
              onClick={handleWordButtonClick}
            >
              {isWordIconChecked ? (
                <CheckIcon size={16} />
              ) : (
                <FileText size={16} />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 px-10">
        <div className="prose prose-slate dark:prose-invert whitespace-break-spaces prose-p:leading-relaxed prose-pre:p-0 max-w-none">
          {props.children}
        </div>
      </div>
    </div>
  );
};
