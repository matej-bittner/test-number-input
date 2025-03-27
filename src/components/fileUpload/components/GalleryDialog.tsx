import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  Stack,
  useTheme,
} from "@mui/material";
import * as _ from "lodash";
import { useMemo, useState } from "react";

type Image = { id: number; url: string; file?: File };
interface GalleryDialogProps {
  open: boolean;
  value: Image | Image[];
  onClose: () => void;
}

const GalleryDialog = ({ open, value, onClose }: GalleryDialogProps) => {
  const { palette } = useTheme();
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [deletable, setDeletable] = useState(false);
  const handleDialog = () => {
    onClose();
    setFullScreenImage("");
    setDeletable(false);
  };

  const handleFullScreenImage = (url: string) => {
    if (url === fullScreenImage) {
      setFullScreenImage("");
    } else {
      setFullScreenImage(url);
    }
  };

  const handleChangeFullScreenImage = (direction: "next" | "prev") => {
    if (!_.isArray(value) || value.length < 1) {
      return;
    }
    if (!fullScreenImage) return;

    const currentImageIndex = _.findIndex(value, {
      url: fullScreenImage,
    });

    if (direction === "prev") {
      setFullScreenImage(
        currentImageIndex === 0
          ? value[value.length - 1].url
          : value[currentImageIndex - 1].url
      );
    } else {
      setFullScreenImage(
        currentImageIndex === value.length - 1
          ? value[0].url
          : value[currentImageIndex + 1].url
      );
    }
  };

  const handleDeleteImage = (id: number) => {
    // if (onDelete) {
    //   handleChangeFullScreenImage("next");
    //   onDelete(id);
    // }
    return;
  };

  const imageSize = useMemo(() => {
    return { count: 3, size: 130, dialogCount: 4 };
  }, []);

  const DirectionChangeButton = ({
    direction,
    image,
  }: {
    direction: "prev" | "next";
    image: string;
  }) => {
    return (
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          right: direction === "next" ? 0 : undefined,
          left: direction === "prev" ? 0 : undefined,
          top: 0,
          backgroundColor: palette.text.disabled,
          padding: 1,
          display: image === fullScreenImage ? "block" : "none",
        }}
        component={"button"}
        onClick={() => handleChangeFullScreenImage(direction)}
      >
        <ArrowForwardIosOutlinedIcon
          fontSize="large"
          sx={{ rotate: direction === "prev" ? "180deg" : "0" }}
        />
      </Box>
    );
  };

  return (
    <Dialog maxWidth={false} open={open} onClose={handleDialog}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        py={2}
        pb={0}
        alignItems={"center"}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <DialogTitle>gallery</DialogTitle>
          <Button
            size="small"
            type="button"
            color={deletable ? "success" : "error"}
            variant="outlined"
            onClick={() => setDeletable((prev) => !prev)}
          >
            vymazat
          </Button>
        </Stack>
        <IconButton type="button" aria-label="close" onClick={handleDialog}>
          <CloseOutlinedIcon />
        </IconButton>
      </Stack>

      <DialogContent sx={{ pt: 2 }}>
        {_.isArray(value) ? (
          <ImageList
            sx={{ width: "fit-content" }}
            cols={imageSize.dialogCount}
            rowHeight={"auto"}
          >
            {_.map(value, (item) => {
              return (
                <ImageListItem
                  key={item.id}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    aspectRatio: 1,
                    position: "relative",
                    display:
                      fullScreenImage && item.url != fullScreenImage
                        ? "none"
                        : "block",
                  }}
                  cols={
                    item.url === fullScreenImage ? imageSize.dialogCount : 1
                  }
                  rows={
                    item.url === fullScreenImage ? imageSize.dialogCount : 1
                  }
                >
                  {deletable && (
                    <IconButton
                      type="button"
                      color="error"
                      sx={{
                        position: "absolute",
                        right: 4,
                        top: 4,
                        zIndex: 999,
                      }}
                      onClick={() => handleDeleteImage(item.id)}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  )}
                  <DirectionChangeButton direction="prev" image={item.url} />

                  <img
                    onClick={() => handleFullScreenImage(item.url)}
                    srcSet={
                      item.file
                        ? undefined
                        : `${item.url}?w=600&h=600&fit=crop&auto=format&dpr=2 2x`
                    }
                    src={
                      item.file
                        ? item.url
                        : `${item.url}?w=600&h=600&fit=crop&auto=format`
                    }
                    loading="lazy"
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <DirectionChangeButton direction="next" image={item.url} />
                </ImageListItem>
              );
            })}
          </ImageList>
        ) : (
          <Stack
            sx={{
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {deletable && (
              <IconButton
                type="button"
                color="error"
                sx={{
                  position: "absolute",
                  right: 4,
                  top: 4,
                  zIndex: 999,
                }}
                // onClick={() => handleDeleteImage(item.id)}
              >
                <HighlightOffOutlinedIcon />
              </IconButton>
            )}
            {value && (
              <img
                srcSet={`${value.url}?w=600&h=600&fit=crop&auto=format&dpr=2 2x`}
                src={`${value.url}?w=600&h=600&fit=crop&auto=format`}
                loading="lazy"
              />
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
