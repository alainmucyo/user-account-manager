import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { BaseEntity } from "typeorm";
import { ENTITIES } from "../constants/entities";

@Processor(process.env.QUEUE_NAME)
export class ImageUploadProcessor {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  @Process()
  async uploadImage(job: Job) {
    console.log(job.data.entity);

    console.log("Uploading images");
    const { entity, image, columnName, id } = job.data;
    const entityClass = ENTITIES[entity];
    const item = await entityClass.findOne({ where: { id } });
    const res = await this.cloudinaryService.uploadImage(image);
    console.log("Finished uploading", res);
    console.log("Updating image: ", entity);
    // console.log("Entity class: ", entityClass);
    try {
      item[columnName] = res.url;

      await item.save();
    } catch (e) {
      console.log(e);
    }
  }
}
