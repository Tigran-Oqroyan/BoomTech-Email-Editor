import React, { useEffect } from "react";

import { MonitorOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import {
  Box,
  Stack,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Button,
} from "@mui/material";
import { Reader, renderToStaticMarkup } from "@usewaypoint/email-builder";
import EditorBlock from "../../documents/editor/EditorBlock";
import {
  editorStateStore,
  setEventData,
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from "../../documents/editor/EditorContext";
import ToggleInspectorPanelButton from "../InspectorDrawer/ToggleInspectorPanelButton";

import DownloadJson from "./DownloadJson";
import HtmlPanel from "./HtmlPanel";
// import ImportJson from "./ImportJson";
import JsonPanel from "./JsonPanel";
import MainTabsGroup from "./MainTabsGroup";

// import ToggleSamplesPanelButton from "../SamplesDrawer/ToggleSamplesPanelButton";
// import ShareButton from "./ShareButton";

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();

  let mainBoxSx: SxProps = {
    height: "100%",
  };
  if (selectedScreenSize === "mobile") {
    mainBoxSx = {
      ...mainBoxSx,
      margin: "32px auto",
      width: 370,
      height: 800,
      boxShadow:
        "rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px",
    };
  }

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type?.startsWith("CUSTOM_NOTIFICATION")) {
        setEventData(event.data);
        editorStateStore.getState().updateDocument(event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case "mobile":
      case "desktop":
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize("desktop");
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case "editor":
        return (
          <Box sx={mainBoxSx}>
            <EditorBlock id="root" />
          </Box>
        );
      case "preview":
        return (
          <Box sx={mainBoxSx}>
            <Reader document={document} rootBlockId="root" />
          </Box>
        );
      case "html":
        return <HtmlPanel />;
      case "json":
        return <JsonPanel />;
    }
  };

  const handleSave = () => {
    const htmlCode = renderToStaticMarkup(document, { rootBlockId: "root" });
    const jsonCode = JSON.parse(JSON.stringify(document, null, "  "));
    window.parent.postMessage(
      { type: "CLOSE_AND_SAVE", html: htmlCode, json: jsonCode },
      "*"
    );
  };

  return (
    <>
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "white",
          position: "sticky",
          top: 0,
          zIndex: "appBar",
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <ToggleSamplesPanelButton /> */}
        <Button
          variant="contained"
          sx={{
            borderRadius: "15px",
            boxShadow: "none",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
        <Stack
          px={2}
          direction="row"
          gap={2}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
          </Stack>
          <Stack direction="row" spacing={2}>
            {/* <ImportJson /> */}
            <ToggleButtonGroup
              value={selectedScreenSize}
              exclusive
              size="small"
              onChange={handleScreenSizeChange}
            >
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <DownloadJson />
            {/* <ShareButton /> */}
          </Stack>
        </Stack>
        <ToggleInspectorPanelButton />
      </Stack>
      <Box
        sx={{
          height: "calc(100vh - 50px)",
          overflow: "auto",
          minWidth: 370,
          scrollbarWidth: "none",
        }}
      >
        {renderMainPanel()}
      </Box>
    </>
  );
}
