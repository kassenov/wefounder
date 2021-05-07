import { ConvertAPI } from "convertapi";

export const CONVERTED_FILES_DESTINATION = "./public/converts";

/**
 * Converts a file from given file path into images and returns paths to converted images.
 * @param filePath
 * @returns
 */
const convertByFilePath = async (filePath: string) => {
  const convertApi = new ConvertAPI(process.env.CONVERT_API_SECRET as string, {
    conversionTimeout: 60,
  });
  const result = await convertApi.convert("jpg", {
    File: filePath,
    ImageResolution: 100,
    ImageQuality: 30,
  });
  const paths = new Array<string>();

  await result.files.forEach((file) => {
    const path = `${CONVERTED_FILES_DESTINATION}/${file.fileName}`;
    paths.push(path);
    file.save(path);
  });

  return paths;
};

export const ConversionService = {
  convertByFilePath,
};
