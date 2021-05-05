import { ConvertAPI } from "convertapi";

export const CONVERTED_FILES_DESTINATION = "./public/converts";

const convertByFilePath = async (filePath: string) => {
  const convertApi = new ConvertAPI(process.env.CONVERT_API_SECRET as string, {
    conversionTimeout: 60,
  });
  const result = await convertApi.convert("jpg", { File: filePath });
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
