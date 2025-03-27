import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { Box, ImageList, ImageListItem } from "@mui/material";
import _ from "lodash";
import { useCallback, useMemo, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import GalleryDialog from "./components/GalleryDialog";

type Image = { id: number; url: string; file?: File };

interface ImageUploadProps {
  mode?: "edit" | "view";
  // error?: boolean | string;
  // disabled?: boolean;
  multiple?: boolean;
  // customInputCompnent: React.ReactNode;
  // onUpload: (name: string, files: any[]) => void;
  // onReject?: (name: string, rejectedFiles: FileRejection[]) => void;
  // onDelete?: (id: number | string) => void;
  value: Image | Image[] | null;
}

const ImageUpload = ({
  mode = "edit",
  // error,
  // disabled,
  multiple,
  // customInputCompnent,
  // onUpload,
  // onReject,
  // onDelete,
  value,
}: ImageUploadProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);

  const imageSize = useMemo(() => {
    return { count: 3, size: 130, dialogCount: 4 };
  }, []);

  const handleOpenDialog = () => {
    setGalleryOpen((prev) => !prev);
  };

  // const sortedFiles: any = useMemo(() => {
  //   if (!_.isArray(value)) {
  //     return value;
  //   }
  //   const values = value;
  //   const valuesWithFile = _.filter(values, (item) => item.file) as any;
  //   const valuesWithoutFile = _.filter(values, (item) => !item.file) as any;

  //   const sortedValuesWithFile = _.sortBy(
  //     valuesWithFile,
  //     (item) => item.file!.lastModified
  //   ).reverse();

  //   return [...sortedValuesWithFile, ...valuesWithoutFile];
  // }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (!_.isEmpty(acceptedFiles)) {
        // acceptedFiles.forEach((file) => {
        //     field.pushValue({
        //         id: Math.floor(Math.random() * 1000000),
        //         url: URL.createObjectURL(file),
        //         file: file,
        //     })
        // })
      }
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  if ((multiple && !_.isArray(value)) || !value) {
    throw Error("Value must be of type array.");
  }

  if (multiple && _.isArray(value)) {
    return (
      <>
        <ImageList cols={imageSize.count} rowHeight={"auto"}>
          {_.map(value, (item) => {
            return (
              <ImageListItem
                component={"button"}
                type="button"
                key={item.id}
                onClick={handleOpenDialog}
                sx={{
                  aspectRatio: 1,
                  padding: 0,
                  margin: 0,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img
                  srcSet={
                    item.file
                      ? undefined
                      : `${item.url}?w=${imageSize.size}&h=${imageSize.size}&fit=crop&auto=format&dpr=2 2x`
                  }
                  src={
                    item.file
                      ? item.url
                      : `${item.url}?w=${imageSize.size}&h=${imageSize.size}&fit=crop&auto=format`
                  }
                  loading="lazy"
                  style={{
                    borderRadius: 8,
                  }}
                />
              </ImageListItem>
            );
          })}
          {mode === "edit" && (
            <Box
              component={"button"}
              type="button"
              sx={{
                borderRadius: 2,
                aspectRatio: 1,
                backgroundColor: "ButtonShadow",
                border: "none",
                cursor: "pointer",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <AddAPhotoOutlinedIcon />
            </Box>
          )}
        </ImageList>
        <GalleryDialog
          open={galleryOpen}
          onClose={handleOpenDialog}
          value={value}
        />
      </>
    );
  }

  //single
  return (
    <>
      <Box
        component={"button"}
        type="button"
        sx={{
          borderRadius: 2,
          aspectRatio: 1,
          backgroundColor: "ButtonShadow",
          border: "none",
          cursor: "pointer",
          p: 0,
        }}
        {...getRootProps()}
      >
        {!_.isArray(value) && value ? (
          <img
            onClick={handleOpenDialog}
            srcSet={
              value.file
                ? undefined
                : `${value.url}?w=${imageSize.size}&h=${imageSize.size}&fit=crop&auto=format&dpr=2 2x`
            }
            src={
              value.file
                ? value.url
                : `${value.url}?w=${imageSize.size}&h=${imageSize.size}&fit=crop&auto=format`
            }
            loading="lazy"
            style={{
              borderRadius: 8,
            }}
          />
        ) : (
          <>
            <input {...getInputProps()} />
            <AddAPhotoOutlinedIcon />
          </>
        )}
      </Box>

      <GalleryDialog
        open={galleryOpen}
        onClose={handleOpenDialog}
        value={value}
      />
    </>
  );
};

export default ImageUpload;

// import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
// import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   ImageList,
//   ImageListItem,
//   Stack,
// } from "@mui/material";
// import _ from "lodash";
// import { useCallback, useState } from "react";
// import { FileRejection, useDropzone } from "react-dropzone";
// const itemData: { img: string; title: string }[] = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ];
// const FIleUpload = () => {
//   const [galleryOpen, setGalleryOpen] = useState(false);
//   const [fullScreenImage, setFullScreenImage] = useState("");
//   const [files, setFiles] = useState<File[]>([]);
//   const [rejected, setRejected] = useState<FileRejection[]>([]);

//   const handleOpenDialog = () => {
//     setGalleryOpen((prev) => !prev);
//     setFullScreenImage("");
//   };

//   const handleFullScreenImage = (url: string) => {
//     if (url === fullScreenImage) {
//       setFullScreenImage("");
//     } else {
//       setFullScreenImage(url);
//     }
//   };
//   const handleChangeFullScreenImage = (direction: "next" | "prev") => {
//     if (!fullScreenImage) return;

//     const currentImageIndex = _.findIndex(itemData, { img: fullScreenImage });

//     if (direction === "prev") {
//       setFullScreenImage(
//         currentImageIndex === 0
//           ? itemData[itemData.length - 1].img
//           : itemData[currentImageIndex - 1].img
//       );
//     } else {
//       setFullScreenImage(
//         currentImageIndex === itemData.length - 1
//           ? itemData[0].img
//           : itemData[currentImageIndex + 1].img
//       );
//     }
//   };

//   const DirectionChangeButton = ({
//     direction,
//     image,
//   }: {
//     direction: "prev" | "next";
//     image: string;
//   }) => {
//     return (
//       <Box
//         sx={{
//           position: "absolute",
//           height: "100%",
//           right: direction === "next" ? 0 : undefined,
//           left: direction === "prev" ? 0 : undefined,
//           top: 0,
//           backgroundColor: "rgba(221, 221, 221, 0.15)",
//           padding: 1,

//           display: image === fullScreenImage ? "block" : "none",
//         }}
//         component={"button"}
//         onClick={() => handleChangeFullScreenImage(direction)}
//       >
//         <ArrowForwardIosOutlinedIcon
//           fontSize="large"
//           sx={{ rotate: direction === "prev" ? "180deg" : "0" }}
//         />
//       </Box>
//     );
//   };

//   const onDrop = useCallback(
//     (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
//       if (acceptedFiles?.length) {
//         setFiles((previousFiles) => [
//           ...previousFiles,
//           ...acceptedFiles.map((file) =>
//             Object.assign(file, { preview: URL.createObjectURL(file) })
//           ),
//         ]);
//       }

//       if (rejectedFiles?.length) {
//         setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
//       }
//     },
//     []
//   );
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <>
//       <ImageList
//         sx={{ bgcolor: "red", width: "fit-content" }}
//         cols={3}
//         rowHeight={164}
//       >
//         {_.map(itemData, (item, i) => {
//           if (i > 1) {
//             return;
//           }
//           return (
//             <ImageListItem
//               component={"button"}
//               key={item.img}
//               onClick={handleOpenDialog}
//               sx={{
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 aspectRatio: 1,
//                 padding: 0,
//                 margin: 0,
//               }}
//             >
//               <img
//                 srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                 src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
//                 alt={item.title}
//                 loading="lazy"
//               />
//             </ImageListItem>
//           );
//         })}
//         <Box
//           component={"button"}
//           type="button"
//           sx={{
//             borderRadius: 2,
//             overflow: "hidden",
//             aspectRatio: 1,
//             bgcolor: "blue",
//           }}
//           {...getRootProps()}
//         >
//           <input {...getInputProps()} />
//           <AddAPhotoOutlinedIcon fontSize="large" />
//         </Box>
//       </ImageList>
//       <Dialog maxWidth={false} open={galleryOpen} onClose={handleOpenDialog}>
//         <Stack
//           direction={"row"}
//           justifyContent={"space-between"}
//           gap={2}
//           py={2}
//         >
//           <Stack direction={"row"} gap={2}>
//             <DialogTitle>Galerie</DialogTitle>
//             <Button size="small" color="error" variant="outlined">
//               Odstranit obrázek
//             </Button>
//           </Stack>
//           <IconButton aria-label="close" onClick={handleOpenDialog}>
//             <CloseOutlinedIcon />
//           </IconButton>
//         </Stack>
//         <DialogContent>
//           <ImageList
//             sx={{ bgcolor: "red", width: "fit-content" }}
//             cols={3}
//             rowHeight={200}
//           >
//             {_.map(itemData, (item) => {
//               return (
//                 <ImageListItem
//                   key={item.img}
//                   sx={{
//                     borderRadius: 2,
//                     overflow: "hidden",
//                     aspectRatio: 1,
//                     position: "relative",
//                     display:
//                       fullScreenImage && item.img != fullScreenImage
//                         ? "none"
//                         : "block",
//                   }}
//                   cols={item.img === fullScreenImage ? 3 : 1}
//                   rows={item.img === fullScreenImage ? 3 : 1}
//                 >
//                   <DirectionChangeButton direction="prev" image={item.img} />
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       height: "100%",
//                       left: 0,
//                       top: 0,
//                       backgroundColor: "rgba(221, 221, 221, 0.15)",
//                       padding: 1,
//                       display: item.img === fullScreenImage ? "block" : "none",
//                     }}
//                     component={"button"}
//                     onClick={() => handleChangeFullScreenImage("prev")}
//                   >
//                     <ArrowForwardIosOutlinedIcon
//                       fontSize="large"
//                       sx={{ rotate: "180deg" }}
//                     />
//                   </Box>
//                   <img
//                     onClick={() => handleFullScreenImage(item.img)}
//                     srcSet={`${item.img}?w=600&h=600&fit=crop&auto=format&dpr=2 2x`}
//                     src={`${item.img}?w=600&h=600&fit=crop&auto=format`}
//                     alt={item.title}
//                     loading="lazy"
//                     style={{ cursor: "pointer" }}
//                   />
//                   <DirectionChangeButton direction="next" image={item.img} />
//                 </ImageListItem>
//               );
//             })}
//           </ImageList>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default FIleUpload;
