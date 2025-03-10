import React from "react";
import { Box, Menu } from "@mui/material";
import { TEditorBlock } from "../../../../editor/core";
import { useEventData } from "../../../../editor/EditorContext";
import BlockButton from "./BlockButton";
import { BUTTONS, CUSTOMBUTTONS, FIELDBUTTONS } from "./buttons";

type BlocksMenuProps = {
  anchorEl: HTMLElement | null;
  setAnchorEl: (v: HTMLElement | null) => void;
  onSelect: (block: TEditorBlock) => void;
};

export default function BlocksMenu({
  anchorEl,
  setAnchorEl,
  onSelect,
}: BlocksMenuProps) {
  const eventData = useEventData();

  const onClose = () => {
    setAnchorEl(null);
  };

  const onClick = (block: TEditorBlock) => {
    onSelect(block);
    setAnchorEl(null);
  };

  if (anchorEl === null) {
    return null;
  }

  return (
    <Menu
      open
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
    >
      {eventData.fields?.length ? (
        <>
          <Box
            sx={{
              p: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            }}
          >
            {CUSTOMBUTTONS().map((k: any, i: number) => (
              <BlockButton
                key={i}
                label={k.label}
                icon={k.icon}
                onClick={() => onClick(k.block() as TEditorBlock)}
              />
            ))}
          </Box>
          <hr />
          <Box
            sx={{
              p: 1,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
            }}
          >
            {FIELDBUTTONS(eventData).map((k: any, i: number) => (
              <BlockButton
                key={i}
                label={k.label}
                icon={k.icon}
                onClick={() => onClick(k.block() as TEditorBlock)}
              />
            ))}
          </Box>
          <hr />
        </>
      ) : null}
      <Box
        sx={{ p: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}
      >
        {BUTTONS.map((k, i) => {
          return (
            <BlockButton
              key={i}
              label={k.label}
              icon={k.icon}
              onClick={() => onClick(k.block())}
            />
          );
        })}
      </Box>
    </Menu>
  );
}
