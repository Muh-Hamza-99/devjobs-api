import { Injectable, PipeTransform } from "@nestjs/common";
import { UploadLogoDto } from "./company.dtos";
import * as sharp from "sharp";

@Injectable()
export class ImageOptimisationPipe implements PipeTransform<UploadLogoDto, Promise<UploadLogoDto>> {

  async transform(body: UploadLogoDto): Promise<UploadLogoDto> {
    const { logo } = body;
    try {
        const optimisedLogoBuffer = await sharp(logo?.buffer).resize(500, 500, { fit: "outside" }).webp({ effort: 3 }).toBuffer();
        const filename = logo.originalName.split(".")
        filename.reverse()[0] = "webp";
        logo.originalName = filename.reverse().join(".");
        logo.buffer = optimisedLogoBuffer;
        return body;
    } catch (error) {}
  }
}